import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import MapGL, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl';
import { Link } from "react-router-dom";


function Vehicles() {

  const [socket, setSocket] = useState()

  const [viewport, setViewport] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });

  const [markers, setMarkers] = useState({})

  const [carsAvailable, setCarsAvailable] = useState(null)

  useEffect(() => {

    if (socket) return;

    const newSocket = new WebSocket("ws://localhost:8000/location/all");

    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    newSocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    newSocket.onmessage = (data) => {
      const temp = JSON.parse(data['data'])
      setMarkers(temp)

      if (carsAvailable === null) {
        let curr = []
        Object.keys(temp).map(item => {
          curr.push(item)
        })
        setCarsAvailable(curr)
      }

    }

    newSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close()
    }

  }, [])

  return (
    <div>

      <MapGL
        mapboxAccessToken="pk.eyJ1Ijoia3VtYXJhbi0tcnIiLCJhIjoiY2xzbjM2bHJyMHhjajJqcGU2dG4wbHgxNyJ9.M74FXUesVn69DGQeITmPPQ"
        zoom={15}
        initialViewState={{
          longitude: 80.20075822655443,
          latitude: 13.018388397746806
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={(e: any) => {
          console.log(e)
        }} >
        <FullscreenControl />
        <NavigationControl />
        {
          JSON.stringify(markers)
        }
        {
          Object.keys(markers).map(item => {
            return (
              <Marker onClick={(e) => {
                console.log(e)
              }} latitude={parseFloat(markers[item]["location"][1])} longitude={parseFloat(markers[item]["location"][0])} >

                <div style={{ width: "15px" }}>
                  <strong>{markers[item]["accident"] ? "🔴" : "🛞"}</strong>
                </div>
              </Marker>
            )
          })
        }

      </MapGL>

      {
        carsAvailable ? carsAvailable.map(item => {
          return (
            <div>
              <Link to={"/vehicles/" + item}>{item}</Link>
            </div>
          )
        }) : ""
      }

      <div>
        <Button>Add New Vehicle</Button>
      </div>

    </div>
  )
}

export default Vehicles