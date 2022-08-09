import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Wrap,
  WrapItem,
  Avatar,
  AvatarBadge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { SocketContext } from "../../SocketContext";

const PlayersBoard = () => {
  const [
    socket,
    room,
    setRoom,
    userName,
    setUserName,
    userID,
    setUserID,
    availablePlayers,
    setAvailablePlayers,
  ] = useContext(SocketContext);
  const [sortedAvailablePlayers, setSortedAvailablePlayers] = useState([]);

  const sortByPosition = (players) => {
    return players.sort((a, b) => b.points - a.points);
  };



  useEffect(() => {

    socket.on("players_in_room", (data) => {
      setAvailablePlayers((list) => [...list, data]);
    });

  }, [socket]);

  return (
    <>
      <Text as="h3" textAlign="start" m="3">
        Connected Players
      </Text>
      <TableContainer w="100%">
        <Table variant="simple" colorScheme="gray">
          <Thead bg="gray" color="white">
            <Tr>
              <Th>Position</Th>
              <Th>Name</Th>
              <Th>Points</Th>
            </Tr>
          </Thead>
          <Tbody>
            {availablePlayers.map((user, i) => (
              <Tr key={i}>
                <Td>#{i + 1}</Td>
                <Td>
                  <Wrap p="1">
                    <WrapItem>
                      <Avatar name={user} src="https://bit.ly/broken-link">
                        <AvatarBadge bg="green.500" boxSize="1em" />
                      </Avatar>
                    </WrapItem>
                  </Wrap>
                  <span>{user}</span>
                </Td>
                {/* <Td>{user.points}</Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PlayersBoard;
