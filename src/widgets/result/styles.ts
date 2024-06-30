import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  mobile: {
    justifyContent: 'center',
    height: 'calc(100% - 134px)',
  },
  header: {
    height: 'auto',
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  footer: {
    position: 'fixed',
    zIndex: 100,
    bottom: '16px',
    height: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  mobileFooter: {
    bottom: '70px !important',
  },
}));
