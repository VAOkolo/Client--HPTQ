import React, { useContext, useState } from "react"
import { SocketContext } from "../../SocketContext"
import { NavLink, useNavigate } from "react-router-dom"
import {
  Container,
  Input,
  Button,
  Box,
  Heading,
  Flex,
  Stack,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { io } from "socket.io-client"

const Home = () => {
  const [
    socket,
    room,
    setRoom,
    availablePlayers,
    setAvailablePlayers,
    activePlayer,
    setActivePlayer,
    wordToGuess,
    setWordToGuess,
    player,
    setPlayer,
    host,
    setHost,
    wordToGuessArray,
    setWordToGuessArray,
    correctPlayer,
    setCorrectPlayer,
    isActivePlayer,
    setIsActivePlayer,
    gameTime,
    setGameTime,
    gameRounds,
    setGameRounds,
    currentRound,
    setCurrentRound,
    refuseConnection,
    setRefuseConnection,
  ] = useContext(SocketContext)

  const navigate = useNavigate()

  socket.on("accept_connection", () => {})

  socket.on("refuse_connection", () => {
    socket.emit("remove_from_room", socket.id, room)
    navigate("/", { replace: true })
  })

  socket.on("refuse_incomming_connections", () => {
    setRefuseConnection(true)
  })

  const handleRoomSelect = (e) => {
    if (refuseConnection == false) {
      if (player.username && room) {
        setAvailablePlayers((list) => [...list, player.username])
        socket.emit("join_room", player, room)
      }
    }
  }

  return (
    <Center height={"85vh"}>
      <VStack
        bg='whiteAlpha.800'
        backdropFilter='auto'
        backdropBlur='xl'
        rounded={"lg"}
        boxShadow={"lg"}
        minW={"xs"}
        p={8}
        gap={4}
      >
        <Heading
          align={"center"}
          fontFamily='Amatic SC'
          fontSize='3xl'
          fontWeight={"bold"}
        >
          Join Room
        </Heading>
        <Input
          type='text'
          placeholder='Room'
          onChange={(e) => setRoom(e.target.value)}
          focusBorderColor='#FFC75F'
          fontSize='xl'
          fontWeight='bold'
        />
        <Input
          type='text'
          placeholder='Username'
          onChange={(e) =>
            setPlayer({
              id: "",
              username: e.target.value,
              points: 0,
              room: room,
              host: true,
              active: false,
            })
          }
          focusBorderColor='#FFC75F'
          fontSize='xl'
          fontWeight='bold'
        />
        <NavLink to='/lobby'>
          <Button
            as={motion.button}
            rounded={"lg"}
            cursor='pointer'
            onClick={handleRoomSelect}
            letterSpacing='0.1em'
            bg='#845ec2'
            w={"xs"}
            color='white'
            fontWeight='bold'
            fontSize='xl'
            whileHover={{
              color: "#845ec2",
              background: "white",
              border: "#C0C0C0",
            }}
          >
            CONNECT
          </Button>
        </NavLink>
      </VStack>
    </Center>
  )
}

export default Home

/* 

<Container
      as={motion.div}
      className='home'
      size='md'
      justifyContent='center'
      alignItems='center'
      minW='83vw'
      h='80vh'
      w='100%'
      transition='0.5s linear'
      initial={{ opacity: 0.55, x: 390 }}
      animate={{ opacity: 2, x: 0 }}
    >
      <Box
        className='joinGameContainer'
        bg='whiteAlpha.800'
        backdropFilter='auto'
        backdropBlur='20px'
        boxShadow='dark-lg'
        w='25vw'
        h='35vh'
        minW='19em'
        maxW='40vw'
        minH='20em'
        rounded='lg'
        justifyContent='space-evenly'
        fontFamily='Amatic SC'
      >
        <Heading fontFamily='Amatic SC'>Join Room</Heading>
        <Box
          display='flex'
          flexDirection='column'
          h='8em'
          justifyContent='space-between'
          alignItems='center'
          opacity={2}
          bg='white.200'
        >
          <Input
            type='text'
            onChange={(e) => setRoom(e.target.value)}
            placeholder='Room'
            focusBorderColor='#FFC75F'
            width='210px'
            height='40px'
            mt='2'
            bg='white'
            fontSize='1.5em'
            fontWeight='bold'
          />
          <Input
            type='text'
            placeholder='Username'
            onChange={(e) =>
              setPlayer({
                id: "",
                username: e.target.value,
                points: 0,
                room: room,
                host: true,
                active: false,
              })
            }
            width='210px'
            height='40px'
            mb='2'
            focusBorderColor='#FFC75F'
            bg='white'
            fontSize='1.5em'
            fontWeight='bold'
          />
        </Box>
        <NavLink to='/lobby'>
          <Button
            as={motion.button}
            borderRadius='50px'
            cursor='pointer'
            onClick={handleRoomSelect}
            letterSpacing='0.1em'
            w='8em'
            boxShadow='10px 10px 14px 1px rgb(0, 0, 0 / 20%)'
            bg='#845ec2'
            // w="12em"
            color='white'
            fontWeight='bold'
            fontSize='1.6em'
            whileHover={{
              color: "#845ec2",
              background: "white",
              border: "#845ec2",
            }}
          >
            CONNECT
          </Button>
        </NavLink>
      </Box>
    </Container>

*/
