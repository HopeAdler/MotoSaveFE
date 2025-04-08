import ReactMapGL, { GeolocateControl, Marker } from '@goongmaps/goong-map-react';
import { useEffect, useState } from 'react';
import { goongMaptiles } from '../constraints/envConstraint';
import { Stations } from '../models/Stations';
import { getAllStations } from '../services/beAPIs';
import { PushpinOutlined } from "@ant-design/icons";
const geolocateControlStyle = {
  right: 10,
  top: 10
};

export default function MapView() {
  const [stations, setStations] = useState<Stations[]>([]);
  const [viewport, setViewport] = useState({
    longitude: 106.725418, // Default center in Ho Chi Minh City
    latitude: 10.752522,
    zoom: 12,
  });

  // State to control map interactivity
  const [isInteractive, setIsInteractive] = useState(false);

  const handleMapClick = () => {
    setIsInteractive(true);
  };

  // Fetch station data
  useEffect(() => {
    const fetchAllStation = async () => {
      try {
        const results = await getAllStations();
        setStations(results);
        console.log(results);
      } catch (error) {
        console.error("Failed to fetch stations", error);
      }
    };

    fetchAllStation();
  }, []);

  return (
    <div onClick={handleMapClick} className="h-full cursor-pointer relative">
      <ReactMapGL
        {...viewport}
        height={'80vh'}
        width={'100vw'}
        className="border border-yellow-500"
        onViewportChange={setViewport}
        goongApiAccessToken={goongMaptiles}
        dragPan={isInteractive}
        scrollZoom={isInteractive}
        doubleClickZoom={isInteractive}
        touchZoom={isInteractive}
      >
        {/* User's current location */}
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />

        {/* Add Markers for stations */}
        {stations.length > 0 && stations.map((station) => (
          <Marker
            key={station.id}
            longitude={parseFloat(station.long.toString())} // Ensure it's a number
            latitude={parseFloat(station.lat.toString())}  // Ensure it's a number
            offsetLeft={-20}
            offsetTop={-40}
          >
            <div className="relative">
              <PushpinOutlined />
              <span className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow">
                {station.name}
              </span>
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}
