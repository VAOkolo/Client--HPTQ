import React, { useState, useEffect, useContext } from "react"
import {
  Container,
  FormControl,
  FormLabel,
  Button,
  Select,
  Text,
  Center,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { SocketContext } from "../../SocketContext"
import axios from "axios"

export default function Settings() {
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
  ] = useContext(SocketContext)

  const [categories, setCategories] = useState([])
  const [gameDifficulty, setGameDifficulty] = useState("easy")
  const [gameCategory, setGameCategory] = useState("General Knowledge")
  const [categoryID, setCategoryID] = useState(9)
  const [quiz, setQuiz] = useState([])

  const navigate = useNavigate()

  let isHost = false

  const checkIsHost = () => {
    if (host == socket.id) {
      isHost = true
    }
  }

  const fetchCategories = async () => {
    const response = await fetch("https://opentdb.com/api_category.php")
    const data = await response.json()
    const categories = data.trivia_categories
    setCategories(categories)
  }
  const fetchQuiz = async () => {
    const url = `https://opentdb.com/api.php?amount=${
      gameRounds * availablePlayers.length
    }&category=${categoryID}&difficulty=${gameDifficulty}&type=multiple`
    const { data } = await axios.get(url)
    return data
  }

  useEffect(() => {
    if (availablePlayers[0].id == socket.id) {
      socket.emit("set_game_rounds", gameRounds, room)
    }
    socket.on("recieve_game_rounds", (data) => {
      setGameRounds(data)
    })
  }, [gameRounds])

  useEffect(() => {
    if (availablePlayers[0].id == socket.id) {
      socket.emit("set_game_seconds", gameTime, room)
    }
    socket.on("recieve_game_seconds", (data) => {
      setGameTime(data)
    })
  }, [gameTime])

  useEffect(() => {
    checkIsHost()
    fetchCategories()
    setActivePlayer(availablePlayers[0].id)
  }, [])

  useEffect(() => {})

  socket.on("redirect_start_game", () => {
    navigate("/game-room", { replace: true })
  })

  const createWordArray = (arr) => {
    const arrMap = arr.map((cat) => cat.correct_answer)
    setWordToGuessArray([...arrMap])
  }

  const startGame = () => {
    socket.emit("start_game", room)
    navigate("/game-room", { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await fetchQuiz()
    createWordArray(data.results)
    startGame()
  }

  const createOptions = (minNum, maxNum, increase) => {
    const optionsToLoop = []
    while (minNum <= maxNum) {
      optionsToLoop.push(minNum)
      minNum = minNum + increase
    }
    return optionsToLoop
  }

  const handleCategory = (e) => {
    setGameCategory(e.target.value)
    const categoryId = categories.filter((c) => c.name === e.target.value)[0].id
    setCategoryID(categoryId)
  }

  return (
    <>
      {player.id == availablePlayers[0].id ? (
        <Center display='flex' h='85vh' minH='100%'>
          {/* <h1>Room Number: {room}</h1> */}
          <FormControl
            as={motion.form}
            p='5'
            bg='whiteAlpha.800'
            backdropFilter='auto'
            backdropBlur='xl'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            alignItems='center'
            h='90%'
            w='xs'
            minW='400px'
            boxShadow='rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition='1.2s ease'
            borderRadius='1em'
            className='settingsForm'
          >
            <FormLabel
              fontSize='4xl'
              className='Title'
              p='2'
              fontWeight='bold'
              color='#A25DBB'
            >
              {`Choose Your Settings`}
            </FormLabel>
            <Text
              alignSelf='start'
              as='label'
              htmlFor='rounds'
              fontSize='xl'
              fontWeight='bold'
              color='#A25DBB'
            >
              Rounds
            </Text>
            <Select
              onChange={(e) => {
                setGameRounds(e.target.value)
              }}
              className='rounds-control'
              id='rounds'
              cursor='pointer'
              value={gameRounds}
              bg='white'
              fontSize='xl'
              color='black'
              fontWeight='bold'
            >
              {createOptions(1, 5, 1).map((option) => (
                <option className='options'>{option}</option>
              ))}
              fontWeight="bold"
            </Select>
            <Text
              alignSelf='start'
              as='label'
              htmlFor='seconds'
              fontSize='xl'
              fontWeight='bold'
              color='#A25DBB'
            >
              Seconds
            </Text>
            <Select
              onChange={(e) => setGameTime(e.target.value)}
              className='seconds-control'
              id='seconds'
              value={gameTime}
              bg='white'
              fontSize='2xl'
              fontWeight='bold'
              letterSpacing='2px'
            >
              {createOptions(30, 70, 10).map((option) => (
                <option className='options'>{option}</option>
              ))}
              fontWeight="bold"
            </Select>
            <Text
              alignSelf='start'
              as='label'
              htmlFor='difficulty'
              fontSize='2xl'
              fontWeight='bold'
              color='#A25DBB'
            >
              Difficulty
            </Text>
            <Select
              onChange={(e) => setGameDifficulty(e.target.value)}
              className='difficulty-control'
              id='difficulty'
              cursor='pointer'
              value={gameDifficulty}
              bg='white'
              fontSize='2xl'
              fontWeight='bold'
              letterSpacing='2px'
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </Select>
            <Text
              alignSelf='start'
              as='label'
              htmlFor='difficulty'
              fontSize='2xl'
              fontWeight='bold'
              color='#A25DBB'
            >
              Category
            </Text>
            <Select
              onChange={handleCategory}
              class='category-control'
              id='category'
              cursor='pointer'
              value={gameCategory}
              bg='white'
              fontSize='2xl'
              fontWeight='bold'
              letterSpacing='2px'
            >
              {categories && categories.map((c) => <option>{c.name}</option>)}
            </Select>
            <Button
              mt={4}
              onClick={handleSubmit}
              letterSpacing='0.094em'
              boxShadow='10px 10px 14px 1px rgb(0, 0, 0 / 20%)'
              bg='#845ec2'
              w='100%'
              color='white'
              fontSize='2xl'
              fontWeight='bold'
              whileHover={{
                color: "#845ec2",
                background: "red",
                border: "#845ec2",
                fontWeight: "bold",
              }}
              className='startGameButton'
            >
              Start Game
            </Button>
          </FormControl>
        </Center>
      ) : (
        <>
          <div className='loadContainer'>
            <p>WAIT FOR HOST TO START</p>
            <div className='load'></div>
          </div>
        </>
      )}
    </>
  )
}
