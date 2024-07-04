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
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  groups: {
    width: '90%',
    margin: '16px 0px 32px 0px',
  },
  groupItem: {
    marginBottom: '20px',
  },
  containerTimer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '-60px',
  },
  footer: {
    position: 'fixed',
    bottom: '16px',
    height: '64px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileFooter: {
    bottom: '20px !important',
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
