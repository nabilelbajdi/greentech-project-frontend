import '@/styles/globals.css';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();
import { createContext, useState } from 'react';
import Context from '@/context';
import HeaderMobile from '@/components/HeaderMobile';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Context>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Header />
            <HeaderMobile/>
            <Component {...pageProps} />
          </LocalizationProvider>
        </QueryClientProvider>
      </SessionProvider>
    </Context>
  );
}
