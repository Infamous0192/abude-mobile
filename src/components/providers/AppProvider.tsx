import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import { AuthProvider } from '@/features/auth';
import { queryClient } from '@/lib/react-query';

import { DateProvider } from './DateProvider';
import { ErrorProvider } from './ErrorProvider';

import '@/styles/globals.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.getElementById('root');
    root?.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

type Props = {
  children: React.ReactNode;
};

const theme: MantineThemeOverride = {
  fontFamily: 'Nunito, sans-serif',
  headings: {
    fontFamily: 'Nunito, sans-serif',
  },
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <Notifications autoClose={5000} />
          <ModalsProvider
            modalProps={{
              styles: {
                title: {
                  fontWeight: 700,
                  fontSize: 16,
                },
              },
            }}
            labels={{ confirm: 'Konfirmasi', cancel: 'Batal' }}
          >
            <AuthProvider>
              <Router>
                <HelmetProvider>
                  <DateProvider>{children}</DateProvider>
                  <ScrollToTop />
                </HelmetProvider>
              </Router>
            </AuthProvider>
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </ErrorProvider>
  );
};
