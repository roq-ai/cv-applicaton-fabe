import * as yup from 'yup';

export const cvTemplateValidationSchema = yup.object().shape({
  name: yup.string().required(),
  content: yup.string().required(),
  admin_id: yup.string().nullable(),
});
