import { FC } from 'react';

import { Checkbox } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { useStyles } from './styles';

interface ICheckboxFieldProps {
  fieldName: string;
  form: UseFormReturnType<any>;
  label?: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
}

export const CheckboxField: FC<ICheckboxFieldProps> = ({
  form,
  fieldName,
  disabled,
  label,
  className,
  checked,
  ...props
}) => {
  const { classes, cx } = useStyles();

  return (
    <Checkbox
      label={label}
      disabled={disabled}
      className={cx(classes.checkbox, className)}
      checked={checked}
      {...props}
      {...form.getInputProps(fieldName)}
    />
  );
};
