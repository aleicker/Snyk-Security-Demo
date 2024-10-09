import { Dispatch, SetStateAction, useState } from 'react';
import { useContext, createContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Maybe } from 'graphql-yoga';

interface AppAlert {
  type: 'error' | 'success' | 'info' | 'warning';
  message: string;
}

interface AppContext {
  showOverlay: boolean;
  setShowOverlay: Dispatch<SetStateAction<boolean>>;
  appAlert: Maybe<AppAlert>;
  setAppAlert: Dispatch<SetStateAction<AppAlert | undefined>>;
}

const AppContext = createContext<AppContext>({} as AppContext);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [appAlert, setAppAlert] = useState<AppAlert>();
  const { pathname, ...router } = useRouter();

  useEffect(() => {
    setShowOverlay(false);
  }, []);

  useEffect(() => {
    let alertTimer: ReturnType<typeof setTimeout>;

    if (appAlert) {
      alertTimer = setTimeout(() => {
        setAppAlert(undefined);
      }, 10000);
    }

    return () => {
      if (alertTimer) {
        clearTimeout(alertTimer);
      }
    };
  }, [appAlert]);

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setShowOverlay(true);
    });

    router.events.on('routeChangeComplete', () => {
      setShowOverlay(false);
    });
  }, [router]);

  return (
    <AppContext.Provider
      value={{ showOverlay, setShowOverlay, appAlert, setAppAlert }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
