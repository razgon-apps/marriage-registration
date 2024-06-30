import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { MantineEmotionProvider } from '@mantine/emotion';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

export const WithMantine = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider>
      <Notifications />
      <MantineEmotionProvider>{children}</MantineEmotionProvider>
    </MantineProvider>
  );
};
