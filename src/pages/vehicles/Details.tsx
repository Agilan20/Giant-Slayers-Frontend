import { Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select } from "@chakra-ui/react";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import MapGL, { FullscreenControl, Marker, NavigationControl } from 'react-map-gl';
import { useParams } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js'
import "ol/ol.css"
import ReactApexChart from 'react-apexcharts';


function Details() {
  const toast = useToast()
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

  const [state, setState] = useState(null)

  const [data, setData] = useState([])

  const [results, setResults] = useState([])

  const dataGetter = async (value: any) => {
    const resp = await axios.post("http://localhost:8000/api/controls/get_data/", { "vehicle_id": params.id, "parameter": value }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    setResults(resp.data["data"])

    console.log(resp.data["data"])

    let values = [], timeLine = []

    resp.data["data"].map(item => {
      values.push(Math.round(parseFloat(item["value"]), 2))
      timeLine.push(new Date(item["time"]).toLocaleTimeString())
    })


    setState({

      series: [{
        name: value,
        data: values
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: value,
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: timeLine,
        }
      },


    })

  }

  const handler = async (parameter: string, frequency: any) => {


    const resp = await axios.post("http://localhost:8000/api/controls/update_parameters/", { "vehicle_id": params.id, "parameter": parameter, "frequency": frequency }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })



    if (resp.status == 200) {



      toast({
        title: 'Success',
        description: "Updated successfully",
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
    }

  }

  useEffect(() => {


    if (socket) return;

    const newSocket = new WebSocket("ws://localhost:8000/location/" + params.id);

    (
      async () => {
        const resp = await axios.post("http://localhost:8000/api/controls/get_parameters/", { "vehicle_id": params.id }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        const temp = JSON.parse(resp.data["data"])
        setData(temp)

        await dataGetter("Speed")

      }
    )()

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
      <div style={{ display: "flex", width: "100%", gap: "10rem" }}>

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

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Select id="temp" onChange={async (e) => {
            await dataGetter(e.target.value)

          }}>

            {
              ["Speed",

                "Orientation",
                "Acceleration",
                "Odometer",
                "Fuel_Consumption",
                "Electricity_Consumption",
                "Pressure",
                "Oil_life",
                "Impatience",
                "Imperfection"].map(item => {
                  return (
                    <option value={item}>{item}</option>
                  )
                })
            }
          </Select>

          <div id="chart">
            {
              state && <ReactApexChart options={state.options} series={state.series} type="line" height={350} />

            }
          </div>

        </div>




      </div>


      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ padding: "1rem", fontWeight: "bold", fontSize: "larger" }}> Parameters</h2>

        <table>
          <tr>
            <td style={{ "padding": "1rem", fontWeight: "bold" }}>
              Name
            </td>
            <td style={{ "padding": "1rem", fontWeight: "bold" }}>

              Frequency

            </td>
            <td style={{ "padding": "1rem", fontWeight: "bold" }}>
              Last Updated at
            </td>


          </tr>
          {
            data && Object.keys(data).map(item => {
              return (
                <tr>
                  <td style={{ "padding": "1rem" }}>
                    {item}
                  </td>
                  <td style={{ "padding": "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                    {
                      <NumberInput id={item} defaultValue={data[item]["frequency"]}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    }
                    <span>Sec</span>
                  </td>
                  <td style={{ "padding": "1rem" }}>
                    {
                      data[item]["updated_at"]
                    }
                  </td>
                  <td style={{ padding: "2rem" }}>
                    <Button id={item + "_button"} colorScheme="green" onClick={async () => await handler(item, document.getElementById(item).value)}>Update</Button>
                  </td>

                </tr>
              )
            })
          }
        </table>
      </div>

    </div >
  );
}

export default Details;
