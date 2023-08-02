import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createRoleTemplate } from 'apiSdk/role-templates';
import { roleTemplateValidationSchema } from 'validationSchema/role-templates';
import { CvTemplateInterface } from 'interfaces/cv-template';
import { UserInterface } from 'interfaces/user';
import { getCvTemplates } from 'apiSdk/cv-templates';
import { getUsers } from 'apiSdk/users';
import { RoleTemplateInterface } from 'interfaces/role-template';

function RoleTemplateCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RoleTemplateInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRoleTemplate(values);
      resetForm();
      router.push('/role-templates');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RoleTemplateInterface>({
    initialValues: {
      role_name: '',
      template_id: (router.query.template_id as string) ?? null,
      admin_id: (router.query.admin_id as string) ?? null,
    },
    validationSchema: roleTemplateValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Role Templates',
              link: '/role-templates',
            },
            {
              label: 'Create Role Template',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Role Template
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.role_name}
            label={'Role Name'}
            props={{
              name: 'role_name',
              placeholder: 'Role Name',
              value: formik.values?.role_name,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CvTemplateInterface>
            formik={formik}
            name={'template_id'}
            label={'Select Cv Template'}
            placeholder={'Select Cv Template'}
            fetcher={getCvTemplates}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'admin_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/role-templates')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'role_template',
    operation: AccessOperationEnum.CREATE,
  }),
)(RoleTemplateCreatePage);
