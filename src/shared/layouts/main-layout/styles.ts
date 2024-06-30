import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles(() => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 0,
  },
  adminButton: {
    position: 'fixed',
    top: '16px',
    left: '16px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
