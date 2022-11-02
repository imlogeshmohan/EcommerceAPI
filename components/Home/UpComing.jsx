import Image from 'next/image';
import React, { useState } from 'react';
import useSWR from 'swr';
import { getUpComingPost } from '../../services';

function UpComing() {
  const [upComing, setupComing] = useState([]);

  const feacher = async () => {
    getUpComingPost().then((newUpComing) => {
      setupComing(newUpComing);
    });
  };

  const UpComingDataFeach = () => {
    // eslint-disable-next-line no-unused-vars
    const { _data, error } = useSWR('upcoming', feacher);
    if (error) return <div>failed to load</div>;
    if (upComing === []) return <div>loading...</div>;
  };

  return (
    <div className="sm:p-5 p-3">
      <h1 className="lg:text-6xl font-semibold text-4xl">Upcoming Post</h1>
      <div className="md:flex md:flex-wrap justify-center py-10 lg:px-10 gap-5">
        {UpComingDataFeach()}
        {upComing?.map((post, i) => {
          return (
            <div
              className="flex md:w-2/5 gap-5 my-3 lg:items-start items-center"
              key={i}
            >
              {post.image.url && (
                <div className="w-[100px] h-[100px] rounded-2xl relative">
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
                // <div className="h-48 w-[40%] rounded-2xl bg-white"></div>
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
