import MapGL, { Popup, NavigationControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Map = ({ longitude, latitude, markerImg, makerTitle }) => {
  const mapApiKey = process.env.REACT_APP_MAP_API_KEY;
  return (
    <div className="map">
      <MapGL
        mapboxAccessToken={mapApiKey}
        initialViewState={{
          longitude,
          latitude,
          zoom: 15,
          pitch: 50,
        }}
        style={{ width: "100%", height: 400, borderRadius: "2rem" }}
        mapStyle={"mapbox://styles/mapbox/streets-v9"}
      >
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <svg
            height={30}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
          >
            <path
              fill="rgba(0, 0, 0, 0.316)"
              d="M54.01 58.74C54.01 61.65 44.15 64 32 64c-12.15 0-22.01-2.35-22.01-5.26 0-2.6 7.9-4.74 18.26-5.18h7.5c10.37.44 18.26 2.58 18.26 5.18z"
            />
            <path
              fill="#fc6b43"
              d="M32 0C20.7 0 11.54 9.15 11.54 20.45 11.54 31.75 32 58.74 32 58.74s20.45-26.99 20.45-38.29S43.3 0 32 0zm0 33.99c-7.48 0-13.54-6.06-13.54-13.54S24.52 6.91 32 6.91c7.48 0 13.54 6.06 13.54 13.54S39.48 33.99 32 33.99z"
            />
          </svg>
        </Marker>
        <Popup
          style={{ width: "13rem", minHeight: "8rem" }}
          anchor="top"
          longitude={longitude}
          latitude={latitude}
        >
          <LazyLoadImage
            className="map__maker__img"
            src={markerImg?.small}
            width={"100%"}
            height={"10rem"}
            alt=""
            placeholderSrc={markerImg?.thumbnail}
          />
          {/* <img className="map__maker__img" src={markerImg.small} alt="" /> */}
          <span className="map__maker__title">{makerTitle}</span>
        </Popup>
        <NavigationControl position="top-left" />
      </MapGL>
    </div>
  );
};

export default Map;
