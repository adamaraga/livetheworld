import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActivityImages from "../components/ActivityImages";
import { getDetails } from "../slices/details";
import ReactMarkdown from "react-markdown";
import Map from "../components/Map";
import Modal from "../components/Modal";
import Login from "../components/Login";
import Loader from "../components/Loader";
import { colorTheme } from "../components/styledComponent/color";
import { addTrips, getTrips, removeTrips } from "../slices/trips";
import { toast } from "react-toastify";
import Activities from "../components/Activities";

function Details() {
  const [loading, setLoading] = useState(false);
  const [detailName, setDetailName] = useState("castle-of-gerald-the-devil");
  const [buttonText, setButtonText] = useState("");
  const [fetchTrips, setFetchTrips] = useState(false);
  const [tripsData, setTripsData] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const detailsData = useSelector((state) => state.details.details);
  const tripsMain = useSelector((state) => state.trips.trips);
  const { message } = useSelector((state) => state.message);

  const tripMainActivitiesLength = tripsMain?.[0]?.activities?.length;
  const tripMainActivities = tripsMain?.[0]?.activities;

  useEffect(() => {
    if (tripsMain) {
      setTripsData(tripsMain?.[0]?.activities);
      localStorage.setItem("trips", JSON.stringify(tripsMain?.[0]?.activities));
    }
  }, [tripMainActivitiesLength, tripMainActivities, tripsMain, setTripsData]);

  useEffect(() => {
    const onStorageUpdate = (e) => {
      const { key, newValue } = e;
      if (key === "trips" && typeof newValue === "string") {
        setTripsData(JSON.parse(newValue));
      }
    };
    if (localStorage.getItem("trips") !== undefined) {
      setTripsData(JSON.parse(localStorage.getItem("trips")) || []);
    }
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };
  }, []);

  useEffect(() => {
    const chechSave = (array, id) => {
      if (id && typeof array?.[0]?.id === "number") {
        let check = array?.find((o) => o.id === id);
        if (!check) {
          return "Save";
        } else {
          return "Saved";
        }
      } else {
        return "Save";
      }
    };
    setButtonText(chechSave(tripsData, detailsData?.id));
  }, [tripsData, tripsData?.length, detailsData?.id]);

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

  useEffect(() => {
    if (user) {
      dispatch(getTrips());
    }
  }, [dispatch, user, fetchTrips]);

  const handleAddAndRemoveTrip = (activityId, text) => {
    if (text === "Save") {
      dispatch(addTrips({ activityId }))
        .unwrap()
        .then(() => {
          setFetchTrips((curr) => !curr);
          toast.success("Trip Added Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch(() => {
          toast.error("Add Trip Failed", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      dispatch(removeTrips({ activityId }))
        .unwrap()
        .then(() => {
          setFetchTrips((curr) => !curr);
          toast.success("Trip Removed Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch(() => {
          toast.error("Remove Trip Failed", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  return (
    <div className="details">
      <Modal>
        <Login />
      </Modal>

      {loading ? (
        <div style={{ marginTop: "5rem" }}>
          <Loader color={colorTheme.secondary} size="2rem" />
        </div>
      ) : detailsData ? (
        <div className="details__wrapper">
          <div className="details__header">
            <ActivityImages images={detailsData?.images} />
            <button
              onClick={() =>
                handleAddAndRemoveTrip(detailsData?.id, buttonText)
              }
              className="btn"
            >
              {buttonText}
            </button>
          </div>

          <div className="details__body">
            <h1
              className="details__body__title"
              onClick={() => localStorage.removeItem("user")}
            >
              {detailsData?.name}
            </h1>

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

            <div className="details__body__disc">
              <p className="details__body__disc__short">
                {detailsData?.description_short}
              </p>

              <ReactMarkdown>{detailsData?.description_long}</ReactMarkdown>
            </div>

            <Map
              makerTitle={detailsData?.name}
              markerImg={detailsData?.images[0]}
              longitude={detailsData?.longitude}
              latitude={detailsData?.latitude}
            />

            <Activities
              handleAddAndRemoveTrip={handleAddAndRemoveTrip}
              tripActivities={tripsData}
              tripActivitiesLength={tripsData?.length}
              setDetailName={setDetailName}
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
