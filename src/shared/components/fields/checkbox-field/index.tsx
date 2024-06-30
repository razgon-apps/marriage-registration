import { FC, ReactNode } from 'react';

import { Checkbox } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface ICheckboxFieldProps {
  fieldName: string;
  form: UseFormReturnType<any>;
  className?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
  rightSection?: ReactNode;
  placeholder?: string;
}

export const CheckboxField: FC<ICheckboxFieldProps> = ({
  form,
  fieldName,
  className,
  disabled,
  label,
  placeholder,
}) => {
  return (
    <Checkbox
      className={className}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      {...form.getInputProps(fieldName)}
    />
  );
};
