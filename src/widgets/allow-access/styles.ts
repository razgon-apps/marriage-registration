import { createStyles } from '@mantine/emotion';

export const useStyles = createStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection: 'column',
    gap: 30,
  },
  mobile: {
    justifyContent: 'space-evenly',
    height: 'calc(100% - 134px)',
  },
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
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
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: '30px',
    padding: '26px 17px',
    width: '80%',
  },
}));
