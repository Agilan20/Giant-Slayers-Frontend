import { useEffect, useRef, useState } from "react"
import MapGL, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl';
import { Link } from "react-router-dom";



function Vehicles() {

  const [socket, setSocket] = useState()

  const [markers, setMarkers] = useState({})

  const [carsAvailable, setCarsAvailable] = useState(null)

  const mapRef = useRef()

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
      console.log(temp)
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
    <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>

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
          Object.keys(markers).map(item => {
            return (
              <>
                {
                  markers[item]["location"] && <Marker onClick={(e) => {
                    console.log(e)
                  }} latitude={parseFloat(markers[item]["location"][1])} longitude={parseFloat(markers[item]["location"][0])} >

                    <div style={{ width: "15px" }}>
                      <strong>{markers[item]["accident"] ? "🔴" : "🛞"}</strong>
                    </div>
                  </Marker>
                }
              </>

            )
          })
        }

      </MapGL>

      <div>

        {
          carsAvailable ? carsAvailable.map(item => {
            return (
              <div style={{display:"flex",gap:"2rem",textTransform:"capitalize"}}>
                <Link style={{"color":"blue" , "textDecoration":"underline"}} to={"/vehicles/" + item}>{item}</Link>
                <span>{markers[item]["accident"]&&markers[item]["accident"]}</span>
              </div>
            )
          }) : ""
        }

      </div>




    </div>
  )
}

export default Vehicles