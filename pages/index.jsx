/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import HeadBG from '../public/background.png';
import { getCategoriesRecentPosts, getTrendingFooter } from '../services';
import RecentPost from '../components/Home/RecentSection/RecentPost';
import useSWR from 'swr';

const Searchbar = dynamic(() => import('../components/Searchbar'), {
  suspense: true,
});
const UpComing = dynamic(() => import('../components/Home/UpComing'), {
  suspense: true,
});
const Footer = dynamic(() => import('../components/Home/Footer/Footer'), {
  suspense: true,
});
const Categories = dynamic(
  () => import('../components/Home/CategorySection/Categories'),
  {
    suspense: true,
  }
);

const headSubTitle =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus ultrices sit urna diam donec nisi. Scelerisque parturient mi sed pellentesque. Quam tellus semper dolor in pellentesque quisque vitae, dolor';

// eslint-disable-next-line @next/next/no-typos, no-unused-vars
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  const posts = (await getCategoriesRecentPosts()) || [];
  return {
    props: { posts },
  };
}

function index({ posts }) {
  const [windowSize, setWindowSize] = useState({ width: 0 });
  const [Slides, setSlides] = useState(0);
  const [SlidesSpace, setSlidesSpace] = useState(0);
  const [trending, setTrending] = useState([]);

  const feacher = async () => {
    getTrendingFooter().then((newUpComing) => {
      setTrending(newUpComing);
    });
  };

  const Trending = () => {
    // eslint-disable-next-line no-unused-vars
    const { data, error } = useSWR('trending', feacher);
    if (error) return <div>failed to load</div>;
    if (trending.length === 0) return <div>loading...</div>;
  };

  function handleResize() {
    if (windowSize.width !== window.innerWidth) {
      setWindowSize({ width: window.innerWidth });
    }

    if (windowSize.width > 800 && windowSize.width < 1280) {
      setSlides(2);
      setSlidesSpace(20);
    }
    if (windowSize.width > 1280) {
      setSlides(3);
      setSlidesSpace(50);
    }
    if (windowSize.width < 800) {
      setSlides(1);
      setSlidesSpace(10);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);
  return (
    <div className="relative w-full">
      <Head>
        <title>Jusqu-Blog</title>
        <meta
          name="description"
          content="Jusqu has worldclass blogs for you "
        />
      </Head>

      <div className=" lg:w-[1000px] w-full absolute top-0 left-0 h-[350px] -z-10 dark:hidden">
        <Image
          src={HeadBG}
          layout="fill"
          alt="background"
          priority="false"
          placeholder="blur"
        />
      </div>
      <div className="lg:w-[70%] lg:mx-auto text-center  relative ">
        <h1 className="text-[#FF007A] text-4xl sm:text-6xl lg:text-8xl py-20 ">
          <span className="text-white">Thoughts</span>,
          <span className="lg:text-gray-800 text-white dark:text-gray-500">
            Stories
          </span>{' '}
          and ideas by the Jusqu{' '}
          <span className="text-gray-800 dark:text-gray-500">Team</span>
        </h1>
        <h2 className="sm:text-xl ">{headSubTitle}</h2>
        <div className="flex justify-center px-2 mt-5 h-14 -mb-5 text-left">
          <div className="relative w-[500px]">
            <Suspense
              fallback={
                <div className=" w-[500px] h-14 rounded-lg animate-pulse bg-slate-400"></div>
              }
            >
              <Searchbar />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="lg:w-[90%] w-full h-14 items-center bg-[#FF007A] shadow-[#FF007A] my-10 sm:px-12 rounded-xl mx-auto shadow-2xl text-white lg:text-xl drop-shadow-2xl flex justify-evenly sm:justify-between gap-2 sm:gap-5">
        {posts.categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="cursor-pointer text-xs sm:text-sm md:text-lg lg:hover:text-2xl font-bold">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
      {/* Recent Post */}
      <RecentPost
        slider={Slides}
        sliderspace={SlidesSpace}
        posts={posts.posts}
      />

      {/* Category Section */}
      <div>
        <Suspense fallback={<div>Loading..</div>}>
          {posts.categories.map((post) => (
            <Categories
              key={post.id}
              details={post}
              slider={Slides}
              sliderspace={SlidesSpace}
            />
          ))}
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <UpComing />
        {Trending()}
        <Footer trending={trending?.map((i) => i)} />
      </Suspense>
    </div>
  );
}

export default index;
