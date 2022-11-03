import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getSimilarPost } from '../../services';
import blankImage from '../../public/blankImag.png';

function SimilarPost({ slug, categories }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    getSimilarPost(categories, slug).then((newTrendingblog) => {
      setRelatedPosts(newTrendingblog);
    });
  }, []);

  return (
    <div className="sm:px-10 px-3">
      <h1 className="text-4xl pb-4 font-semibold">Similar Post</h1>
      {relatedPosts.map((post) => {
        return (
          <Link href={post.node.slug} key={post.node.slug}>
            <div className="flex gap-4 py-5 cursor-pointer hover:border-l-4 hover:pl-4 hover:border-black dark:hover:border-white">
              <div className="relative w-[100px] h-[100px]">
                <Image
                  src={
                    post.node.featuredImage
                      ? post.node.featuredImage.url || blankImage
                      : blankImage
                  }
                  blurDataURL={
                    post.featuredImage
                      ? post.featuredImage.url || blankImage
                      : blankImage
                  }
                  placeholder="blur"
                  layout="fill"
                  objectFit="cover"
                  alt={post.node.title}
                />
              </div>
              <div className="w-[80%]">
                <h1 className="text-lg font-bold">{post.node.title}</h1>
                <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {post.node.excerpt.substring(0, 200)}...
                </h2>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SimilarPost;
