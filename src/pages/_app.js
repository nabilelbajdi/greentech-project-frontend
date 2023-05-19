import '@/styles/globals.css';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <Component {...pageProps} />
      </LocalizationProvider>
    </SessionProvider>
  );
}
