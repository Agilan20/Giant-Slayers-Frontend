import { useEffect, useState } from 'react'
import Sidebar from './components/sidebar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RandomEvents from './pages/random_events';
import Vehicles from './pages/vehicles';
import Details from './pages/vehicles/Details';
import AddVehicle from './pages/add_vehicles';
import { ChakraProvider } from '@chakra-ui/react'
import 'mapbox-gl/dist/mapbox-gl.css';



function App() {



  return (
    <ChakraProvider >
      <div style={{ display: "flex", gap: "3rem", padding: "2rem" }}>

        <BrowserRouter>
          <Sidebar></Sidebar>
          <Routes>
            <Route path='/random_events' element={<RandomEvents />}></Route>
            <Route path='/vehicles' element={<Vehicles />}></Route>
            <Route path='/vehicles/:id' element={<Details />}></Route>
            <Route path="/add_vehicles" element={<AddVehicle />} ></Route>
            <Route path="*" element={<Navigate to="/random_events" replace />} />
          </Routes>
        </BrowserRouter>
      </div>

    </ChakraProvider>


  );
}

export default App
