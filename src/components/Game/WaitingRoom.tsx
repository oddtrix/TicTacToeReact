import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import React from "react";
import { hubConnection, joinGameGroup, startConnection, stopConnection, updatedGameState } from "../../helpers/singnalrService";
import { updateGameState } from "../../redux/slices/game";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [playersCount, setPlayersCount] = React.useState(0);
  const game = useAppSelector((state) => state.game.Data);
  const userName = useAppSelector((state) => state.profile.Data?.UserName);
  React.useEffect(() => {
    const waitingForOpponent = async () => {
      try {
        await startConnection();
        const gameId = game?.Id;

        if (gameId !== undefined) {
          await joinGameGroup(gameId, userName);
          await updatedGameState(gameId, game);
        }
      } catch (e) {
        console.log(e);
      }
    };

    waitingForOpponent();

    return () => {
      stopConnection();
    };
  }, [game, userName]);


  React.useEffect(() => {
    hubConnection.on("JoinedPlayer", (message) => {
      console.log(`${message} has joined the game`);
      // Add logic to handle joined player event
    });

    hubConnection.on("ReceiveGameState", (gameState) => {
      dispatch(updateGameState(gameState));
      console.log("Received game state:", gameState);
    });
  }, [dispatch]);

  // React.useEffect(() => {
  //   if (playersCount === 2) {
  //     navigate(`/starting`);
  //   }
  // }, [playersCount, navigate]);
  return (
    <>
      <div className="bg-green-400 mt-52 p-10 rounded-xl text-white flex flex-col items-center">
        <h1 className="text-2xl ">Waiting for the opponent...</h1>
        <span className="mt-4">Your game id:</span>
        <span> {game?.Id}</span>
      </div>
    </>
  );
};

export default WaitingRoom;
