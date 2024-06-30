import { FC } from 'react';

import { Button, ButtonProps, PolymorphicComponentProps } from '@mantine/core';

type DefaultButtonProps<C> = PolymorphicComponentProps<C, ButtonProps>;

export const DefaultButton: FC<DefaultButtonProps<'button'>> = (props) => {
  return (
    <Button
      variant="gradient"
      gradient={props.gradient || { from: '#7DB8A4', to: '#41AE8D', deg: 90 }}
      sx={{ fontWeight: 600 }}
      radius={93}
      h={64}
      w={299}
      fz={18}
      {...props}
    >
      {props.children}
    </Button>
  );
};
