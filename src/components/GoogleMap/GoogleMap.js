import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMap() {
  const defaultProps = {
    center: {
      lat: 43.3715,
      lng: -8.39597,
    },
    zoom: 13,
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCDc2MrK0NHh3Sm9xakYDaa7VUpvCzl3UM",
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={43.3715} lng={-8.39597} text="Aquí" />
      </GoogleMapReact>
    </div>
  );
}
