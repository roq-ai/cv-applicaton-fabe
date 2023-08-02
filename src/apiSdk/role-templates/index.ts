import axios from 'axios';
import queryString from 'query-string';
import { RoleTemplateInterface, RoleTemplateGetQueryInterface } from 'interfaces/role-template';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRoleTemplates = async (
  query?: RoleTemplateGetQueryInterface,
): Promise<PaginatedInterface<RoleTemplateInterface>> => {
  const response = await axios.get('/api/role-templates', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createRoleTemplate = async (roleTemplate: RoleTemplateInterface) => {
  const response = await axios.post('/api/role-templates', roleTemplate);
  return response.data;
};

export const updateRoleTemplateById = async (id: string, roleTemplate: RoleTemplateInterface) => {
  const response = await axios.put(`/api/role-templates/${id}`, roleTemplate);
  return response.data;
};

export const getRoleTemplateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/role-templates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRoleTemplateById = async (id: string) => {
  const response = await axios.delete(`/api/role-templates/${id}`);
  return response.data;
};
