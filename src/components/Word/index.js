// import React, { useState, useEffect, useContext } from "react";
// import { Container, Box, Text, Input, Button } from "@chakra-ui/react";
// import { SocketContext } from "../../SocketContext";

// const Word = () => {
//   const [
//     socket,
//     room,
//     setRoom,
//     userName,
//     setUserName,
//     userID,
//     setUserID,
//     availablePlayers,
//     setAvailablePlayers,
//     wordToGuess,
//     setWordToGuess,
//     activePlayer,
//     setActivePlayer,
//   ] = useContext(SocketContext);

//   useEffect(() => {
//     socket.on("received_word_to_guess", (word) => {
//       setWordToGuess(word);
//     });
//   }, [socket]);
//   console.log(wordToGuess);
//   return (
//     <Container bg="teal">
//       {activePlayer ? (
//         <Text as="h4" fontSize="xl" textAlign="start" order="1">
//           Word to draw: {wordToGuess}
//         </Text>
//       ) : (
//         <Text>Length of word: {wordToGuess.length}</Text>
//       )}
//     </Container>
//   );
// };

// export default Word;

import React, { useState, useEffect, useContext } from "react";
import { Container, Box, Text, Input, Button } from "@chakra-ui/react";
import { SocketContext } from "../../SocketContext";
const Word = () => {
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
  ] = useContext(SocketContext);
  const [wToGuess, setWToGuess] = useState("");
  useEffect(() => {
    socket.on("received_word_to_guess", (word) => {
      console.log("hiiiii", word);
      setWordToGuess(word);
    });
  }, [socket]);

  // const [guess, setGuess] = useState("");
  // const haha = "florencia";
  // let lettersReplaced = [];
  // const hangman = () => {
  //   for (const letter of haha) {
  //     lettersReplaced.push(letter.replace(/^[a-zA-Z]+$/g, "_"));
  //   }
  // };
  // console.log(lettersReplaced);
  // console.log(haha);
  // console.log("yay");
  // hangman();
  // // console.log(guess);
  return (
    <Container bg="teal">
      {/* <Text as="h4" fontSize="xl" textAlign="start" order="1">
        Word to draw: {wordToGuess}
      </Text> */}
      {activePlayer ? (
        <Text as="h4" fontSize="xl" textAlign="start" order="1">
          Word to draw: {wordToGuess}
        </Text>
      ) : (
        <Text>Length of word: {wordToGuess.length}</Text>
      )}
    </Container>
  );
};
export default Word;