import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useAppSelector } from "../../redux/hooks";
import React from "react";

const WaitingRoom = () => {
  const [players, setPlayers] = React.useState<number>(0);
  const game = useAppSelector((state) => state.game.data);
  const userName = useAppSelector((state) => state.profile.data?.userName);
  const waitingForOpponent = async () => {
    try {
      const gameId = game?.id;
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44338/game")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("JoinedPlayer", (message) => {
        console.log(`${message} has joined to the game`);
        updPlayer();
        // setPlayers(players + 1);
        // console.log(players);
      });
      await connection
        .start()
        .then(() => {
          console.log("Connection to the hub is established");
        })
        .then(() => {
          if (gameId !== undefined) {
            connection
              .invoke("JoinGameGroup", gameId, userName)
              .catch((err) => console.error(err));
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  waitingForOpponent();
  const updPlayer = () => {
    setPlayers(players + 1);
  };
  React.useEffect(() => updPlayer, [players]);
  return (
    <>
      <div className="bg-green-400 mt-52 p-10 rounded-xl text-white flex flex-col items-center">
        <h1 className="text-2xl ">Waiting for the opponent...</h1>
        <span className="mt-4">Your game id:</span>
        <span> {game?.id}</span>
      </div>
    </>
  );
};

export default WaitingRoom;
