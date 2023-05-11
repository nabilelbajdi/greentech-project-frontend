import '@/styles/globals.css';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import Head from 'next/head';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>TreeHouse</title>
      </Head>
      <Header />
      <Sidebar />
      <div className='flex justify-center'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
