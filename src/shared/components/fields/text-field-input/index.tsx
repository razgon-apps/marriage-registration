import { FC, ReactNode } from 'react';

import { ActionIcon, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { IconX } from '@tabler/icons';

import { useStyles } from './styles';

interface ITextFieldProps {
  fieldName: string;
  form: UseFormReturnType<any>;
  className?: string;
  label?: string;
  disabled?: boolean;
  clearable?: boolean;
  rightSection?: ReactNode;
  placeholder?: string;
}

export const TextFieldInput: FC<ITextFieldProps> = ({
  form,
  fieldName,
  className,
  disabled,
  label,
  clearable,
  rightSection,
  placeholder,
}) => {
  const { classes, cx } = useStyles();

  const clearValue = () => {
    form.setFieldValue(fieldName, '');
  };

  const rightSectionRender = () => {
    if (rightSection) {
      return rightSection;
    } else if (clearable) {
      return (
        <ActionIcon variant="transparent" onClick={clearValue}>
          <IconX color="#667085" />
        </ActionIcon>
      );
    }
  };

  return (
    <TextInput
      className={cx(classes.textFieldInput, className)}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      rightSection={rightSectionRender()}
      {...form.getInputProps(fieldName)}
    />
  );
};
