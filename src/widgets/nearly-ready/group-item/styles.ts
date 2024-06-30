import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
}));
