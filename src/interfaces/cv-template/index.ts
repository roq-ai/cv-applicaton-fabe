import { RoleTemplateInterface } from 'interfaces/role-template';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CvTemplateInterface {
  id?: string;
  name: string;
  content: string;
  admin_id?: string;
  created_at?: any;
  updated_at?: any;
  role_template?: RoleTemplateInterface[];
  user?: UserInterface;
  _count?: {
    role_template?: number;
  };
}

export interface CvTemplateGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  content?: string;
  admin_id?: string;
}
