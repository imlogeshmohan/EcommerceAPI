import { Navigation, Pagination, Lazy } from 'swiper';
import PostCard from './PostCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';

const Categories = ({ details, sliderspace, slider }) => {
  return (
    <div className="sm:p-8 p-4 lg:py-10 lg:px-20">
      <div className="flex justify-between items-center font-semibold">
        <h1 className="sm:text-4xl text-2xl lg:text-6xl">
          {details.name || ''}
        </h1>
        <Link href={`/category/${details.slug}`} className="text-blue-600">
          view all
        </Link>
      </div>
      <p className="py-5 lg:py-10 sm:text-lg text-sm">
        {details.description || ''}
      </p>
      <div className="w-full flex">
        <Swiper
          spaceBetween={sliderspace}
          slidesPerView={slider}
          modules={[Navigation, Pagination, Lazy]}
          lazy={true}
          loadprevnext="false"
          preloadImages={false}
          loop="true"
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          className="h-[580px]"
        >
          {details.post.map((eachpost, i) => {
            return (
              <SwiperSlide className="flex justify-evenly" key={i}>
                <PostCard post={eachpost} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
