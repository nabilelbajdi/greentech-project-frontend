import '@/styles/globals.css';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from 'next/head';

const queryClient = new QueryClient();
import { createContext, useEffect, useState } from 'react';
import Context from '@/context';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Context>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Head>
              <title>GreenCircle</title>
            </Head>
            <Header />
            <Component {...pageProps} />
          </LocalizationProvider>
        </QueryClientProvider>
      </SessionProvider>
    </Context>
  );
}
