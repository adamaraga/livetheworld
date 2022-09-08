import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Pagination } from "swiper";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../slices/activities";
import { toast } from "react-toastify";

const Activities = ({ activitiesId, setDetailName }) => {
  const [loading, setLoading] = useState(false);
  const activitiesData = useSelector((state) => state.activities.activities);
  const { message } = useSelector((state) => state.message);

  console.log("activities", activitiesData);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getActivities({ activitiesId }))
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }, [dispatch, activitiesId, message]);

  return (
    <div className="activities">
      <h2 className="activities__title">Nearby Activities</h2>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          1000: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          280: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          100: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
        loop={true}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {activitiesData?.map((activity) => {
          return (
            <SwiperSlide key={activity?.id}>
              <div className="activities__main">
                <LazyLoadImage
                  src={activity?.images[0].url}
                  className="activities__main__img"
                  width={"100%"}
                  alt=""
                  placeholderSrc={activity?.images[0].thumbnail}
                />

                <button className="btn">save</button>

                <h3 className="activities__main__title">{activity?.name}</h3>
                <p className="activities__main__disc">
                  {activity?.description_short.substring(0, 100) + "..."}{" "}
                  <span onClick={() => setDetailName(activity?.slug)}>
                    Read more
                  </span>
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Activities;
