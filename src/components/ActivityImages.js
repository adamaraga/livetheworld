import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { FreeMode, Pagination } from "swiper";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ActivityImages = ({ images }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={10}
      centeredSlides={true}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 3.5,
          spaceBetween: 10,
        },
        484: {
          slidesPerView: 2.5,
          spaceBetween: 10,
        },
        280: {
          slidesPerView: 1.5,
          spaceBetween: 5,
        },
        100: {
          slidesPerView: 1.2,
          spaceBetween: 5,
        },
      }}
      loop={true}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
    >
      {images?.map((image) => {
        return (
          <SwiperSlide key={image?.id}>
            <LazyLoadImage
              src={image?.url}
              width={"100%"}
              height={"100%"}
              alt=""
              placeholderSrc={image?.thumbnail}
            />
            {/* <img src={image?.url} alt="" /> */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ActivityImages;
