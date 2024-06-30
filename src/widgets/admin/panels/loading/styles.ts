import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles(() => ({
  container: {
    height: `100vh`,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  scroll: {
    height: `calc(100vh - 280px)`,
    marginBottom: '24px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
}));
