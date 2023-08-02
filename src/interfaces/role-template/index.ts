import { CvTemplateInterface } from 'interfaces/cv-template';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RoleTemplateInterface {
  id?: string;
  role_name: string;
  template_id?: string;
  admin_id?: string;
  created_at?: any;
  updated_at?: any;

  cv_template?: CvTemplateInterface;
  user?: UserInterface;
  _count?: {};
}

export interface RoleTemplateGetQueryInterface extends GetQueryInterface {
  id?: string;
  role_name?: string;
  template_id?: string;
  admin_id?: string;
}
