import { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import classes from "./styles.module.scss";
import MapControls from "./components/MapControls";

const TabMaps = () => {
  const [coords, setCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const { latitude, longitude } = coords;

  function MapView() {
    const map = useMap();

    map.setView([latitude, longitude], map.getZoom());

    // Sets geographical center and zoom for the view of the map
    return null;
  }

  return (
    <>
      <MapControls coords={coords} setCoords={setCoords} />

      <MapContainer
        className={classes.map_container}
        center={[latitude, longitude]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='Map data and geocoding results &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapView />
      </MapContainer>
    </>
  );
};

export default TabMaps;
