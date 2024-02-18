import { Button } from '@chakra-ui/button'
import { Card, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'


function Accident() {

  const toast = useToast()

  const handler = async () => {
    
    const resp = await axios.post("http://localhost:8000/api/controls/accident/")

    if (resp.status == 200) {
      toast({
        title: 'Success',
        description: "yuuuy! Some lanes are busy now!!",
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
    }

  }

  return (
    <Card display={"flex"} flexDirection={"column"} gap={"2rem"} alignItems={"flex-start"} padding="1rem">
      <span style={{ fontWeight: "bold" }}>Accident Simulation
      </span>
      <span>It Helps in simlating random blocking anf traffic of roads</span>
      <Slider aria-label='slider-ex-1' defaultValue={10}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Button colorScheme='blue'>Update Probability</Button>
    </Card>
  )
}

function WearAndTear() {


  return (
    <Card display={"flex"} flexDirection={"column"} gap={"2rem"} alignItems={"flex-start"} padding="1rem">
      <span style={{ fontWeight: "bold" }}>Wear and Tears
      </span>
      <span>It Helps in simlating random blocking anf traffic of roads</span>
      <Button colorScheme='blue'>Submit</Button>
    </Card>
  )
}

function LaneToBlock() {

  const toast = useToast()

  const handler = async () => {
    const resp = await axios.post("http://localhost:8000/api/controls/lane_to_block/")

    if (resp.status == 200) {
      toast({
        title: 'Success',
        description: "yuuuy! Some lanes are busy now!!",
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
    }

  }

  return (
    <Card display={"flex"} flexDirection={"column"} gap={"2rem"} alignItems={"flex-start"} padding="1rem">
      <span style={{ fontWeight: "bold" }}>Lane Block triggers
      </span>
      <span>It Helps in simlating random blocking anf traffic of roads</span>
      <Button colorScheme='blue'>Click to Simulate</Button>
    </Card>
  )
}


function RandomEvents() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <span style={{ fontSize: "larger", fontWeight: "bolder" }}>Random Events </span>

      <Accident></Accident>

      <WearAndTear></WearAndTear>

      <LaneToBlock></LaneToBlock>

    </div>
  )
}

export default RandomEvents 