import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center w-full h-full text-4xl font-bold">
        Hello logesh its working
      </div>
    </div>
  );
};

export default Home;
