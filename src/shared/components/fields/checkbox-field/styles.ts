import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme) => ({
  checkbox: {
    '& .mantine-Checkbox-label': {
      color: theme.white,
      fontSize: '12px',
    },
  },
}));
