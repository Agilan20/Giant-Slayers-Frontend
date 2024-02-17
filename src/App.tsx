import { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl';
import Sidebar from './components/sidebar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Vehicles from './pages/vehicles';
import Details from './pages/vehicles/Details';
import AddVehicle from './pages/add_vehicles';
import { ChakraProvider } from '@chakra-ui/react'
import 'mapbox-gl/dist/mapbox-gl.css';


// <Map
//   mapboxAccessToken="pk.eyJ1Ijoia3VtYXJhbi0tcnIiLCJhIjoiY2xzbjM2bHJyMHhjajJqcGU2dG4wbHgxNyJ9.M74FXUesVn69DGQeITmPPQ"
//   zoom={15}
//   initialViewState={{
//     longitude: 80.20075822655443,
//     latitude: 13.018388397746806
//   }}
//   style={{ width: 600, height: 400 }}
//   mapStyle="mapbox://styles/mapbox/streets-v9"
//   onClick={(e:any)=>{
//     console.log(e)
//   }}

// >
//   {/* <Marker latitude={markerPosition.longitude} longitude={markerPosition.latitude}>
//     <div style={{ fontSize: '24px', color: 'red' }}>📍</div>
//   </Marker> */}
// </Map>

function App() {

  // const [socket, setSocket] = useState<WebSocket>()

  // const [markerPosition, setMarkerPosition] = useState({
  //   latitude: 0, // Initial marker latitude
  //   longitude: 0, // Initial marker longitude
  // });


  // useEffect(() => {

  //   if (!socket) {
  //     setSocket(new WebSocket('ws://localhost:8000/location/kumaran/'))
  //     return
  //   }

  //   socket.addEventListener('open', (event) => {
  //     console.log('WebSocket connection opened:');

  //     // Send a message to the server
  //     socket.send('Hello, WebSocket Server!');
  //   });

  //   // Listen for messages from the server
  //   socket.addEventListener('message', (event) => {
  //     console.log('Received message from server:', event.data);
  //     const temp = JSON.parse(event.data)
  //     setMarkerPosition({ latitude: temp[0], longitude: temp[1] })
  //   });

  //   // Connection closed
  //   socket.addEventListener('close', (event) => {
  //     console.log('WebSocket connection closed:', event);
  //   });

  //   // Connection error
  //   socket.addEventListener('error', (event) => {
  //     console.error('WebSocket connection error:', event);
  //   });

  // }, [socket])


  return (
    <ChakraProvider >
      <div style={{ display: "flex", gap: "3rem", padding: "2rem" }}>

        <BrowserRouter>
          <Sidebar></Sidebar>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/vehicles' element={<Vehicles />}></Route>
            <Route path='/vehicles/:id' element={<Details />}></Route>
            <Route path="/add_vehicles" element={<AddVehicle />} ></Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </div>

    </ChakraProvider>


  );
}

export default App
