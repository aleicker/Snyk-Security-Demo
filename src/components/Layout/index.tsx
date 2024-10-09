import classnames from 'classnames';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Alert from '@/components/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppContext } from '@/providers/AppProvider';
import { COLORS } from '@/constants';
import styles from './Layout.module.scss';

export interface LayoutProps {
  header: JSX.Element;
  children: JSX.Element;
  showHeader?: boolean;
}

export default function Layout({
  header,
  children,
  showHeader = false,
}: LayoutProps) {
  const { showOverlay, appAlert, setAppAlert } = useAppContext();
  const hasHeader = showHeader && header;

  return (
    <>
      <Backdrop
        sx={{ color: COLORS.white, zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showOverlay}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box className={styles.container}>
        {hasHeader && header}
        <Box
          component="main"
          className={classnames(styles.main, {
            [styles.hasHeader]: hasHeader,
          })}
        >
          {appAlert && (
            <Box margin={2}>
              <Alert
                variant="filled"
                color={appAlert.type}
                onDismiss={() => setAppAlert(undefined)}
              >
                {appAlert.message}
              </Alert>
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </>
  );
}
