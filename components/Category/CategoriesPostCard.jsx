/* eslint-disable jsx-a11y/alt-text */
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import blankImage from '../../public/blankImag.png';
import defaultAuthor from '../../public/defaultAuthor.png';

function CategoriesPostCard({ post }) {
  const [domain, setDomain] = useState('');
  useEffect(() => {
    setDomain(window.location.hostname);
  }, []);

  return (
    <Link
      href={`http://${
        domain === 'localhost' ? 'localhost:3000' : domain
      }/post/${post.slug}`}
    >
      <div className="flex sm:max-h-52 overflow-hidden items-center justify-between max-w-[800px] cursor-pointer">
        <div className="sm:w-[80%] w-full">
          {/* first author and Image Section  */}
          <div className="relative flex items-center gap-3">
            <Image
              src={
                post.author.photo
                  ? post.author.photo.url || defaultAuthor
                  : defaultAuthor
              }
              width={30}
              height={30}
              objectFit="cover"
              objectPosition="top center"
              className="rounded-full"
            />
            <h1 className="text-xs font-bold text-gray-900 dark:text-white">
              {post.author.name || ''}
            </h1>
          </div>
          {/* Title section */}
          <h1 className="sm:text-2xl text-lg font-bold">{post.title || ''}</h1>
          {post.excerpt && (
            <h1 className="text-base text-gray-600 dark:text-gray-400 hidden xl:block">
              {post.excerpt.substr(0, 180)}
              <span>{post.excerpt.length > 180 ? '...' : ''}</span>
            </h1>
          )}
          {post.excerpt && (
            <h1 className="text-base text-gray-600 dark:text-gray-400 xl:hidden">
              {post.excerpt.substr(0, 50)}
              <span>{post.excerpt.length > 50 ? '...' : ''}</span>
            </h1>
          )}
          {/* Last row */}
          <div className="py-3 text-gray-600 flex gap-8 items-center">
            <h1 className="font-semibold text-xs dark:text-gray-400">
              {moment(post.createdAt).format('MMM DD')}
            </h1>
            <div></div>
          </div>
        </div>

        {/* left Image */}
        <div className='relative w-[40%] h-full sm:"w-full'>
          <Image
            src={
              post.featuredImage
                ? post.featuredImage.url || blankImage
                : blankImage
            }
            blurDataURL={
              post.featuredImage
                ? post.featuredImage.url || blankImage
                : blankImage
            }
            placeholder="blur"
            width={300}
            height={300}
            objectFit="cover"
          />
        </div>
      </div>
    </Link>
  );
}

export default CategoriesPostCard;
