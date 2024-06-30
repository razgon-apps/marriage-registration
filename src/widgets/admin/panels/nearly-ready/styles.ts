import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles(() => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  scroll: {
    height: `100vh`,
    marginBottom: '24px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
}));
