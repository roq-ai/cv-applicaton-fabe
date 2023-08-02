import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { cvTemplateValidationSchema } from 'validationSchema/cv-templates';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cv_template
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCvTemplateById();
    case 'PUT':
      return updateCvTemplateById();
    case 'DELETE':
      return deleteCvTemplateById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCvTemplateById() {
    const data = await prisma.cv_template.findFirst(convertQueryToPrismaUtil(req.query, 'cv_template'));
    return res.status(200).json(data);
  }

  async function updateCvTemplateById() {
    await cvTemplateValidationSchema.validate(req.body);
    const data = await prisma.cv_template.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCvTemplateById() {
    const data = await prisma.cv_template.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
