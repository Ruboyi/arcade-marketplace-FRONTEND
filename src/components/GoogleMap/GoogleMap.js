import axios from "axios";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

const { REACT_APP_GOOGLE_MAP_KEY } = process.env;
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMap({ location }) {
  const [coords, setCoords] = useState(false);

  useEffect(() => {
    async function getGeolocatationProduct() {
      try {
        console.log(location);
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?key=${REACT_APP_GOOGLE_MAP_KEY}&address=${location}spain`
        );
        setCoords(response.data.results[0].geometry.location);
        console.log(response.data.results[0].geometry.location);
      } catch (error) {
        console.log(error);
      }
    }
    getGeolocatationProduct();
  }, [location]);
  const { lat, lng } = coords;

  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: 13,
  };

  return (
    <>
      {coords && (
        <div style={{ height: "300px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyCDc2MrK0NHh3Sm9xakYDaa7VUpvCzl3UM",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent lat={lat} lng={lng} text="Aquí" />
          </GoogleMapReact>
        </div>
      )}
    </>
  );
}
