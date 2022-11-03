/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getPostDetails, getTrendingPost } from '../../services';
import ErrorComp from '../../components/404';
import Blog from '../../components/PostPage/Blog';
import Likes from '../../components/SidebarComp/Likes';
import Footer from '../../components/Home/Footer/Footer';

function PostPage({ post }) {
  if (post === null) {
    return <ErrorComp />;
  }
  const [Trendingblog, setTrendingblog] = useState([]);

  useEffect(() => {
    getTrendingPost(post.categories[0].name).then((newTrendingblog, i) => {
      setTrendingblog(newTrendingblog);
    });
  }, []);

  console.log(Trendingblog);

  const TopBar = dynamic(() => import('../../components/PostPage/TopBar'), {
    suspense: true,
  });
  const SideBar = dynamic(() => import('../../components/PostPage/SideBar'), {
    suspense: true,
  });
  const ShareButton = dynamic(
    () => import('../../components/PostPage/ShareButton'),
    {
      suspense: true,
    }
  );
  const SimilarPost = dynamic(
    () => import('../../components/PostPage/SimilarPost'),
    {
      ssr: true,
      suspense: true,
    }
  );

  return (
    <div className="flex flex-col lg:flex-row  ">
      <div className="w-1/5 lg:sticky xl:w-[5%] lg:w-[3%] hidden h-screen lg:top-0 lg:flex items-center justify-center px-5 ml-5 ">
        <Suspense
          fallback={
            <div className="lg:sticky xl:w-[5%] lg:w-[3%] hidden h-screen lg:top-0 border-4 lg:flex flex-col justify-center items-center gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-md bg-gray-500 mt-10"></div>
              <div className="w-10 h-10 rounded-md bg-gray-500"></div>
              <div className="w-10 h-10 rounded-md bg-gray-500"></div>
              <div className="w-10 h-10 rounded-md bg-gray-500"></div>
              <div className="w-10 h-10 rounded-md bg-gray-500"></div>
              <div className="w-10 h-10 rounded-md bg-gray-500 mt-10"></div>
            </div>
          }
        >
          <ShareButton post={post}>
            <Likes post={post} />
          </ShareButton>
        </Suspense>
      </div>
      <div className="lg:w-[80%] xl:max-w-[1200px] px-3">
        <Blog post={post} />

        <Suspense fallback={<div>loading....</div>}>
          <SimilarPost slug={post.slug} categories={post.categories[0].name} />
        </Suspense>
      </div>
      <div className="lg:sticky xl:w-[25%] lg:w-[30%] lg:block hidden h-screen top-0 border-l px-6 py-10 overflow-y-scroll no-scrollbar ">
        <Suspense
          fallback={
            <div className="lg:sticky xl:w-[25%] lg:w-[30%] lg:block hidden h-screen top-0 border px-6 py-10 overflow-y-scroll no-scrollbar animate-pulse">
              <div className="w-full bg-gray-500 h-14 mt-16 rounded-xl" />
              <div className="w-28 bg-gray-500 h-28 mt-11 rounded-full" />
              <div className="w-44 bg-gray-500 h-7 mt-6" />
              <div className="w-60 bg-gray-500 h-5 mt-6" />
              <div className="w-64 bg-gray-500 h-6 mt-8" />
              <div className="w-64 bg-gray-500 h-6 mt-2" />
              <div className="flex flex-wrap gap-5 mt-12 w-72 border-b-2 pb-12">
                <div className="w-28 h-10 bg-gray-500" />
                <div className="w-28 h-10 bg-gray-500 flex-grow" />
                <div className="w-28 h-10 bg-gray-500 flex-grow" />
                <div className="w-28 h-10 bg-gray-500" />
              </div>
            </div>
          }
        >
          <SideBar post={post} />
        </Suspense>
      </div>
      <div className="lg:hidden w-full">
        <Footer trending={Trendingblog} />
      </div>
      <div className="fixed bottom-3 right-[70px] lg:hidden">
        <Likes post={post} />
      </div>
    </div>
  );
}

export default PostPage;

export async function getServerSideProps(context) {
  const post = await getPostDetails(context.query.slug);

  return { props: { post } };
}
