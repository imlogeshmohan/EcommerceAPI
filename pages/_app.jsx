/* eslint-disable react/jsx-filename-extension */
import '../styles/globals.sass';
import '../styles/nprogress.sass';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import ThemeToggle from '../components/ThemeToggle';

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  return (
    <ThemeProvider attribute="class">
      <div className="fixed z-50 right-5 bottom-5 rounded-full dark:bg-white bg-[#1B1C1E] drop-shadow-2xl">
        <ThemeToggle />
      </div>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
