import { Button } from "@chakra-ui/react";
import { SetStateAction, useEffect, useState } from "react";
import MapGL, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl';
import { useParams } from "react-router-dom";

function Details() {
  const [markers, setMarkers] = useState(null);
  const [socket, setSocket] = useState(null);
  const [viewport, setViewport] = useState({
    width: 600,
    height: 400,
    latitude: 0,  // Set the initial latitude to 0
    longitude: 0, // Set the initial longitude to 0
    zoom: 18,
  });
  const params = useParams();

  useEffect(() => {
    if (socket) return;

    const newSocket = new WebSocket("ws://localhost:8000/location/" + params.id);

    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    newSocket.onmessage = (data) => {
      const location = JSON.parse(data.data).location;
      setMarkers(location);

      // Update the viewport based on the received location
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: parseFloat(location[1]),
        longitude: parseFloat(location[0]),
      }));
    };

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div>
      <MapGL
        mapboxAccessToken="pk.eyJ1Ijoia3VtYXJhbi0tcnIiLCJhIjoiY2xzbjM2bHJyMHhjajJqcGU2dG4wbHgxNyJ9.M74FXUesVn69DGQeITmPPQ"
        {...viewport}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={(e: any) => {
          console.log(e);
        }}
        onViewportChange={(newViewport: SetStateAction<{
            width: number; height: number; latitude: number; // Set the initial latitude to 0
            longitude: number; // Set the initial longitude to 0
            zoom: number;
          }>) => setViewport(newViewport)} // Update the viewport
      >
        <FullscreenControl />
        <NavigationControl />
        {markers && (
          <Marker
            onClick={(e) => {
              console.log(e);
            }}
            latitude={parseFloat(markers[1])}
            longitude={parseFloat(markers[0])}
          >
            <div style={{ width: "15px" }}>
              <strong> 🛞</strong>
            </div>
          </Marker>
        )}
      </MapGL>

      
    </div>
  );
}

export default Details;
