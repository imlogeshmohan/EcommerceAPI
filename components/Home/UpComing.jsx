import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { getUpComingPost } from '../../services';

function UpComing() {
  const [upComing, setupComing] = useState([]);

  useEffect(() => {
    getUpComingPost().then((newUpComing) => {
      setupComing(newUpComing);
    });
  }, []);
  // console.log("Upcoming Loaded")
  return (
    <div className="sm:p-5 p-3">
      <h1 className="lg:text-6xl font-semibold text-4xl">Upcoming Post</h1>
      <div className="md:flex md:flex-wrap justify-center py-10 lg:px-10 gap-5">
        {upComing.map((post, i) => {
          return (
            <div
              className="flex md:w-2/5 gap-5 my-3 lg:items-start items-center"
              key={i}
            >
              {post.image.url && (
                <div className="sm:w-32 w-[40%] rounded-2xl">
                  <div className="w-full h-24 relative">
                    <Image
                      alt={post.title}
                      className="rounded-xl"
                      blurDataURL={post.image.url}
                      placeholder="blur"
                      layout="fill"
                      src={post.image.url}
                      objectFit="cover"
                    />
                  </div>
                </div>
              )}
              <div className="lg:text-2xl text-xl font-semibold pt-5">
                {post.title || ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpComing;
