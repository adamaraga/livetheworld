import { Swiper, SwiperSlide } from "swiper/react";
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
          spaceBetween: 5,
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
              className="activityImages__img"
              src={image?.url}
              width={"100%"}
              alt=""
              placeholderSrc={image?.thumbnail}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ActivityImages;
