import { ReactNode } from 'react';

import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { MantineEmotionProvider } from '@mantine/emotion';

export const WithMantine = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider>
      <MantineEmotionProvider>{children}</MantineEmotionProvider>
    </MantineProvider>
  );
};
