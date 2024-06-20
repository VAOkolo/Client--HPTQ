import React, { useContext, useEffect } from "react"
import Settings from "../../components/Settings"
import { SocketContext } from "../../SocketContext"
import {
  Container,
  Wrap,
  WrapItem,
  Avatar,
  AvatarBadge,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  VStack,
  HStack,
  StackDivider,
  Box,
} from "@chakra-ui/react"

export default function Lobby() {
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
  ] = useContext(SocketContext)

  useEffect(() => {
    socket.on("room_data", (users) => {
      setAvailablePlayers([...users])
    })
  }, [socket])

  useEffect(() => {
    socket.on("set_host", (host) => {
      setHost(host)
    })
    socket.on("initial_room_data", (player) => {
      setPlayer(player)
    })
  }, [])

  return (
    <>
      <div className='lobby'>
        <Box
          bg={"rgba(132, 94, 194,0.5)"}
          backdropFilter='auto'
          backdropBlur='xl'
          transition='0.5s linear'
          initial={{ opacity: 0.55, x: 390 }}
          animate={{ opacity: 1, x: 0 }}
          justifyContent='center'
          alignItems='center'
        >
          <div className='lobbyPlayersContainer'>
            <div>
              <Text
                fontSize='4xl'
                fontWeight='bold'
                textAlign='center'
                marginTop='.5em'
              >
                {" "}
                PLAYERS IN LOBBY
              </Text>
              <Text
                fontSize='2xl'
                fontWeight='bold'
                textAlign='center'
                marginBottom='2em'
              >
                {" "}
                Room Number: <span className='roomNum'>{room}</span>
              </Text>
              {availablePlayers.map((user, index) => (
                <>
                  <VStack
                    divider={<StackDivider borderColor='gray.200' />}
                    spacing={4}
                    align='stretch'
                    justifyContent='center'
                    my={5}
                  >
                    <HStack spacing={5}>
                      <Avatar
                        name={user.username}
                        src='https://bit.ly/broken-link'
                      >
                        <AvatarBadge bg='green.500' boxSize='1em' />
                      </Avatar>
                      {user.host ? (
                        <Text fontSize='2xl' fontWeight='bold'>
                          {" "}
                          HOST:{" "}
                          <span className='uppercase'> {user.username}</span>
                        </Text>
                      ) : (
                        <Text
                          className='uppercase'
                          fontSize='2xl'
                          fontWeight='bold'
                        >
                          {user.username}
                        </Text>
                      )}
                    </HStack>
                  </VStack>
                </>
              ))}
            </div>
          </div>
        </Box>

        <Settings />
      </div>
    </>
  )
}
