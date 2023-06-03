import '@/styles/globals.css';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createContext, useState } from 'react';
import Context from '@/context';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    <Context>
      <SessionProvider session={session}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Header />
          <Component {...pageProps} />
        </LocalizationProvider>
      </SessionProvider>
    </Context>


  );
}
