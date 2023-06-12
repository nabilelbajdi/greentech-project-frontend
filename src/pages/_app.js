import '@/styles/globals.css';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

const queryClient = new QueryClient();
import { createContext, useEffect, useState } from 'react';
import Context from '@/context';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  let pathname = 'GreenCirle';
  if (usePathname() !== '/') {
    pathname += ` - ${usePathname().split('/')[1]}`;
  }

  return (
    <Context>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header />
            <Head>
              <title>{pathname}</title>
            </Head>
            <Component {...pageProps} />
          </LocalizationProvider>
        </QueryClientProvider>
      </SessionProvider>
    </Context>
  );
}
