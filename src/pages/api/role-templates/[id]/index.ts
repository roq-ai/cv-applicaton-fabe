import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { roleTemplateValidationSchema } from 'validationSchema/role-templates';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.role_template
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRoleTemplateById();
    case 'PUT':
      return updateRoleTemplateById();
    case 'DELETE':
      return deleteRoleTemplateById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRoleTemplateById() {
    const data = await prisma.role_template.findFirst(convertQueryToPrismaUtil(req.query, 'role_template'));
    return res.status(200).json(data);
  }

  async function updateRoleTemplateById() {
    await roleTemplateValidationSchema.validate(req.body);
    const data = await prisma.role_template.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRoleTemplateById() {
    const data = await prisma.role_template.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
