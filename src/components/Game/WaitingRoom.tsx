import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { json, useNavigate } from "react-router-dom";
import React from "react";
import { hubConnection, joinGameGroup, startConnection, updatedGameState } from "../../helpers/singnalrService";
import { updateGameState } from "../../redux/slices/game";

const WaitingRoom = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game.Data);
  const gameStatus = useAppSelector((state) => state.game.Status);
  const userName = useAppSelector((state) => state.profile.Data?.UserName);

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

  React.useEffect(() => {
    waitingForOpponent();
  }, [userName]);

  React.useEffect(() => {
    hubConnection.on("JoinedPlayer", (message) => {
      console.log(`${message} has joined the game`);
    });

    hubConnection.on("ReceiveGameState", (gameState) => {
      // console.log("Received game state:", gameState);
      dispatch(updateGameState(JSON.parse(gameState)))
    });

  }, [dispatch]);
  
  React.useEffect(() => {
    if (gameStatus === 2) {
      navigate("/starting");
    }
  }, [gameStatus , navigate]);

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
