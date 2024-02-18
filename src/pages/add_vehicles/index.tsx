
import { Button, Card, CardBody, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import MapGL, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl';
import axios from "axios"

function AddVehicle() {

  const [isOpen, setOpen] = useState(-1)

  const [startPoint, setStartPoint] = useState([])
  const [endPoint, setEndPoint] = useState([])
  const [name, setName] = useState("")
  const toast = useToast()

  const handler = async () => {

    const vehicle_id = document.getElementById("vehicle")?.value

    const resp = await axios.post("http://localhost:8000/api/controls/create_vehicle/", { "vehicle_id": vehicle_id, "start_point_lng": startPoint.lng, "start_point_lat": startPoint.lat, "end_point_lat": endPoint.lat, "end_point_lng": endPoint.lng, "fuel_consumption": document.getElementById("fuel_consumption").value, "odometer": document.getElementById("odometer").value }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (resp.status == 200) {
      toast({
        title: 'Success',
        description: "Created successfully",
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
    }

  }

  const onClose = () => {
    setOpen(-1)
  }

  return (
    <div>

      <Card>
        <CardBody display={"flex"} flexDirection={"column"} gap={"2rem"}>
          <Input id="vehicle" placeholder='Enter vehicle name'></Input>
          <Input id="odometer" placeholder='Enter Initial Odometer'></Input>
          <Input id="fuel_consumption" placeholder='Enter Initial Fuel level'></Input>

          <Select placeholder='Type of vehicle'>
            <option>Electric</option>
            <option>Petrol/Diesel</option>
          </Select>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>


            {
              startPoint && <div>
                <div>Latitude : {startPoint.lat}</div>
                <div>Longitude : {startPoint.lng}</div>
              </div>
            }

            <Button colorScheme='blue' onClick={() => setOpen(1)}  >Choose Starting point</Button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {
              endPoint && <div>
                <div>Latitude : {endPoint.lat}</div>
                <div>Longitude : {endPoint.lng}</div>
              </div>
            }
            <Button colorScheme='blue' onClick={() => setOpen(2)} >Choose Ending point</Button>

          </div>
          <Button colorScheme='green' onClick={async () => await handler()}>Create Vehicle</Button>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen != -1} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isOpen == 1 ? "Choose Starting Point" : "Choose Ending Point"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MapGL
              mapboxAccessToken="pk.eyJ1Ijoia3VtYXJhbi0tcnIiLCJhIjoiY2xzbjM2bHJyMHhjajJqcGU2dG4wbHgxNyJ9.M74FXUesVn69DGQeITmPPQ"
              zoom={15}
              initialViewState={{
                longitude: 80.20075822655443,
                latitude: 13.018388397746806
              }}

              style={{ width: "300px", height: "300px" }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              onClick={(e: any) => {
                if (isOpen == 1) {
                  setStartPoint(e.lngLat)
                }
                else {
                  setEndPoint(e.lngLat)
                }
              }} >
              <FullscreenControl />
              <NavigationControl />



            </MapGL>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default AddVehicle