import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Lazy } from 'swiper';
import RecentPostCard from './RecentPostCard';

function RecentPost({ slider, sliderspace, posts }) {
  return (
    <div className="px-3 sm:px-5">
      <div className=" lg:text-6xl font-semibold text-4xl ">Recent Post</div>
      <div>
        <Swiper
          modules={[Navigation, Pagination, Lazy]}
          lazy={true}
          loadprevnext="false"
          preloadImages={false}
          spaceBetween={sliderspace}
          slidesPerView={slider}
          navigation
          loop="true"
          className="h-[450px] "
        >
          {posts.map((post, i) => {
            return (
              <SwiperSlide key={i} className="flex justify-evenly">
                <RecentPostCard post={post} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default RecentPost;
