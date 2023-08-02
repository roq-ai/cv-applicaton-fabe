import * as yup from 'yup';

export const roleTemplateValidationSchema = yup.object().shape({
  role_name: yup.string().required(),
  template_id: yup.string().nullable(),
  admin_id: yup.string().nullable(),
});
