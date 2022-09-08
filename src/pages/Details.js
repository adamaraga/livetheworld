import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActivityImages from "../components/ActivityImages";
import { getDetails } from "../slices/details";
import ReactMarkdown from "react-markdown";
import Map from "../components/Map";
import Loader from "../components/Loader";
import { colorTheme } from "../components/styledComponent/color";
import { toast } from "react-toastify";

function Details() {
  const [loading, setLoading] = useState(false);
  const [detailName, setDetailName] = useState("castle-of-gerald-the-devil");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const detailsData = useSelector((state) => state.details.details);
  const { message } = useSelector((state) => state.message);

  console.log("detailsData", detailsData);

  useEffect(() => {
    setLoading(true);
    dispatch(getDetails({ detailName }))
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
  }, [dispatch, detailName, message]);

  return (
    <div className="details">
      {loading ? (
        <div style={{ marginTop: "50px" }}>
          <Loader color={colorTheme.secondary} size="20px" />
        </div>
      ) : detailsData ? (
        <div className="details__wrapper">
          <div className="details__header">
            <ActivityImages images={detailsData?.images} />
            <button
              onClick={() => localStorage.removeItem("user")}
              className="btn"
            >
              save
            </button>
          </div>

          <div className="details__body">
            <h1 className="details__body__title">{detailsData?.name}</h1>

            <div className="details__body__label">
              {detailsData?.labels?.length > 0 &&
                detailsData?.labels?.map((label) => {
                  return (
                    <span className="details__body__label__item" key={label.id}>
                      {label.name}
                    </span>
                  );
                })}
            </div>

            <p className="details__body__disc__short">
              {detailsData?.description_short}
            </p>
            <ReactMarkdown>{detailsData?.description_long}</ReactMarkdown>
            <Map
              makerTitle={detailsData?.name}
              markerImg={detailsData?.images[0]}
              longitude={detailsData?.longitude}
              latitude={detailsData?.latitude}
            />
          </div>
        </div>
      ) : (
        <div className="noData">
          <p>NO DATA</p>
        </div>
      )}
    </div>
  );
}

export default Details;
