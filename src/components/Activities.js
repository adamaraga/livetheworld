import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { FreeMode, Pagination } from "swiper";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../slices/activities";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { colorTheme } from "./styledComponent/color";

const Activities = ({
  setDetailName,
  tripActivitiesLength,
  tripActivities,
  handleAddAndRemoveTrip,
}) => {
  const [buttonTexts, setButtonTexts] = useState({});
  const [loading, setLoading] = useState(false);
  const activitiesData = useSelector((state) => state.activities.activities);
  const { message } = useSelector((state) => state.message);
  const detailsData = useSelector((state) => state.details.details);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (detailsData?.id && user) {
      setLoading(true);
      dispatch(getActivities({ activitiesId: detailsData?.id }))
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
    }
  }, [dispatch, detailsData?.id, message, user]);

  useEffect(() => {
    const activityIds = activitiesData?.map((activity) => {
      return activity.id;
    });

    const activityIdsObj = {};

    if (activityIds) {
      for (const key of activityIds) {
        activityIdsObj[key] = "Save";
      }
      setButtonTexts(activityIdsObj);
    }
  }, [activitiesData, tripActivities]);

  useEffect(() => {
    const chechSave = (array, id) => {
      if (id && array?.length > 0) {
        let check = array.find((o) => o.id === id);

        if (!check) {
          return "Save";
        } else {
          return "Saved";
        }
      } else {
        return "Save";
      }
    };

    for (let i = 0; i < activitiesData?.length; i++) {
      let text = chechSave(tripActivities, activitiesData[i].id);
      if (text === "Saved") {
        setButtonTexts((curr) => {
          return { ...curr, [activitiesData[i]?.id]: "Saved" };
        });
      }
    }
  }, [activitiesData, tripActivities, tripActivitiesLength]);

  return (
    <div className="activities">
      <h2 className="activities__title">Nearby Activities</h2>

      {loading ? (
        <div style={{ marginTop: "5rem" }}>
          <Loader color={colorTheme.secondary} size="2rem" />
        </div>
      ) : activitiesData ? (
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
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            100: {
              slidesPerView: 1,
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
                    src={activity?.images[0].small}
                    className="activities__main__img"
                    width={"100%"}
                    alt=""
                    placeholderSrc={activity?.images[0].thumbnail}
                  />

                  <button
                    onClick={() =>
                      handleAddAndRemoveTrip(
                        activity?.id,
                        buttonTexts?.[activity?.id]
                      )
                    }
                    className="btn"
                  >
                    {buttonTexts?.[activity?.id]}
                  </button>

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
      ) : (
        <div className="noData">
          <p>NO DATA</p>
        </div>
      )}
    </div>
  );
};

export default Activities;
