import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  mobile: {
    justifyContent: 'center',
    height: 'calc(100% - 134px)',
  },
  footer: {
    position: 'fixed',
    bottom: '16px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileFooter: {
    bottom: '70px',
  },
}));
