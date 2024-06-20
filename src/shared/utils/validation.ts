import { FormErrors } from '@mantine/form';

import { ZodError, ZodObject } from 'zod';

export const getValidateErrors = (
  validateScheme: ZodObject<any, any>,
  values: object,
) => {
  const res = validateScheme.safeParse(values);
  if (!res.success) {
    const error = res.error as ZodError;
    const formErrors: FormErrors = {};
    error.errors.forEach((err: any) => {
      formErrors[err.path[0]] = err.message;
    });
    return formErrors;
  }
  return {};
};
