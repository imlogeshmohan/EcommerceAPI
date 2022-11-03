import React, { useEffect, useState } from 'react';
import { getTrendingPost } from '../../services';
import Image from 'next/image';
import blankImage from '../../public/blankImag.png';
import Link from 'next/link';

function TrendingBlog({ category }) {
  const [Trendingblog, setTrendingblog] = useState([]);

  useEffect(() => {
    getTrendingPost(category).then((newTrendingblog, i) => {
      setTrendingblog(newTrendingblog);
    });
  }, []);

  return (
    <div className="pt-5">
      {Trendingblog.length !== 0 && (
        <h1 className="font-semibold text-lg">Trending Posts</h1>
      )}

      {Trendingblog.length !== 0 &&
        Trendingblog.map((post, i) => {
          return (
            <Link href={post.node.slug} key={post.node.slug}>
              <div className="flex gap-4 py-5 cursor-pointer ">
                <div className="w-[80%]">
                  <h1 className="text-lg font-bold">{post.node.title || ''}</h1>
                  <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {post.node.excerpt.substring(0, 70)}...
                  </h2>
                </div>
                <div className="w-[20%]">
                  <Image
                    src={
                      post.node.featuredImage
                        ? post.node.featuredImage.url || blankImage
                        : blankImage
                    }
                    width={100}
                    height={100}
                    objectFit="cover"
                  />
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default TrendingBlog;
