import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../SocketContext";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat() {
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
    correctPlayer,
    setCorrectPlayer
  ] = useContext(SocketContext);

  const [currentMessage, setCurrentMessage] = useState({
    guess: "",
  });

  const [correctAnswer, setcorrectAnswer] = useState("carrot");

  const [messageList, setMessageList] = useState([]);

  let _turn = 0;
  let current_turn = 0;

  function nextTurn() {
    _turn = current_turn++ % availablePlayers.length;
    setActivePlayer(availablePlayers[_turn].id);
  }

  const sendMessage = async () => {
    if (currentMessage.guess !== "") {
      await socket.emit("send_message", currentMessage, room);

      if (currentMessage.guess === correctAnswer) {
        let userWithCorrectAns = socket.id;
        nextTurn();
        console.log(availablePlayers)

        // if(availablePlayers.length > 0){
        let correctPlayerArray = availablePlayers.filter((player) => player.id == userWithCorrectAns)
        // setCorrectPlayer(correctPlayerArray[0].username)
        socket.emit("send_correct_player", correctPlayerArray[0].username, room)
        // }
        // console.log(correctPlayer)

        alert("Activate Fireworks You Are The Winner ! ---- " + correctPlayerArray[0].username );
        socket.emit("set_user_points", room, userWithCorrectAns);
      }
      setMessageList((list) => [...list, currentMessage]);
      setCurrentMessage({ guess: "" });
    }
  };

  useEffect(() => {
    socket.on("recieved_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    console.log("gameRoom Useeffect running")
    socket.on('receive_correct_player', (player) => {
      setCorrectPlayer(player)
    })
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((message, index) => {
            return (
              <div className="message" key={index}>
                <div>
                  <div className="message-content">
                    <p>{message.guess}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage.guess}
          placeholder="Enter Guess"
          onChange={(e) => {
            setCurrentMessage({ guess: e.target.value });
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        ></input>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
