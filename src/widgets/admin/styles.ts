import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: `16px`,
  },

  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: `0 0 16px 0`,
  },
}));
