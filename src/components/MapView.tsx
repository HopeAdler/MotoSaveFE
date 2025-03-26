import MapGL from "@goongmaps/goong-map-react";
import React, { useState } from "react";
import { goongMaptiles } from "../constraints/envConstraint";

const GOONG_MAP_STYLE = "https://tiles.goong.io/assets/goong_map_dark.json"; // Better clarity

const MapView: React.FC = () => {
  const [viewport, setViewport] = useState<any>({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14, // Adjusted zoom for better display
    bearing: 0,
    pitch: 30,
  });

  console.log("Goong API Key:", goongMaptiles); // Debugging API key

  if (!goongMaptiles) {
    return <div className="text-red-500 text-center">API Key is missing!</div>;
  }

  return (
    <div className="w-[80vw]] h-[80vh]">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={GOONG_MAP_STYLE}
        onViewportChange={(vp: any) => setViewport(vp)}
        goongApiAccessToken={goongMaptiles}
      />
    </div>
  );
};

export default MapView;
