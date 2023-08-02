import axios from 'axios';
import queryString from 'query-string';
import { CvTemplateInterface, CvTemplateGetQueryInterface } from 'interfaces/cv-template';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCvTemplates = async (
  query?: CvTemplateGetQueryInterface,
): Promise<PaginatedInterface<CvTemplateInterface>> => {
  const response = await axios.get('/api/cv-templates', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCvTemplate = async (cvTemplate: CvTemplateInterface) => {
  const response = await axios.post('/api/cv-templates', cvTemplate);
  return response.data;
};

export const updateCvTemplateById = async (id: string, cvTemplate: CvTemplateInterface) => {
  const response = await axios.put(`/api/cv-templates/${id}`, cvTemplate);
  return response.data;
};

export const getCvTemplateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cv-templates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCvTemplateById = async (id: string) => {
  const response = await axios.delete(`/api/cv-templates/${id}`);
  return response.data;
};
