import Image from 'next/image';
import React from 'react';
import blankImage from '../../../public/blankImag.png';

function RecentPostCard({ post }) {
  return (
    <a className="" href={`/blog/post/${post.slug}`}>
      <div className="sm:m-6 h-[400px] sm:w-96 w-screen cursor-pointer relative  shadow-xl  overflow-hidden rounded-xl">
        {post.featuredImage && (
          <div className="relative full h-64">
            <Image
              className="rounded-t-xl h-60"
              src={
                post.featuredImage
                  ? post.featuredImage.url || blankImage
                  : blankImage
              }
              alt={post.title}
              placeholder="blur"
              blurDataURL={
                post.featuredImage
                  ? post.featuredImage.url || blankImage
                  : blankImage
              }
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        )}
        <div className="text-3xl font-bold py-4 px-5">{post.title || ''}</div>
      </div>
    </a>
  );
}

export default RecentPostCard;
