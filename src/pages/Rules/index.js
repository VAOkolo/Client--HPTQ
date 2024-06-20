import React from "react"
import { Stack, Text, Container } from "@chakra-ui/react"

export default function Rules() {
  return (
    <Container
      display='flex'
      justifyContent='center'
      alignItems='center'
      minW='80%'
      minH='85vh'
    >
      <Stack
        display='flex'
        justifyContent='center'
        alignItems='center'
        boxShadow='dark-lg'
        minW='20em'
        minH='20em'
        rounded='lg'
        bg='white'
        padding='5rem'
        role='rules'
      >
        <Text fontSize='6xl' color='orange' fontWeight='bold'>
          🎨✏️
        </Text>
        <Text fontSize='3xl' color='orange' fontWeight='bold' margin='5rem'>
          1. Join A Room To Play With Others!
        </Text>
        <Text fontSize='3xl' color='orange' fontWeight='bold' margin='5rem'>
          2. Choose Your Settings, Or Wait For The Host To Choose Settings
        </Text>
        <Text fontSize='3xl' color='orange' fontWeight='bold' margin='5rem'>
          3. Draw The Word You Are Given
        </Text>
        <Text fontSize='3xl' color='orange' fontWeight='bold' margin='5rem'>
          4. If You Are Not Drawing Guess What The Other User Is Drawing To Gain
          Points!
        </Text>
        <Text fontSize='3xl' color='orange' fontWeight='bold' margin='5rem'>
          5. Most Importantly Have Fun! 😆
        </Text>
      </Stack>
    </Container>
  )
}
