import React from "react";
import { hubConnection, leaveGameGroup, stopConnection } from "../../helpers/singnalrGameService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MakeMove, SetDraw, SetWinner, updateGameState } from "../../redux/slices/game";
import { IGame } from "../../types/game.typing";
import { circle, cross } from "../../constants/string.constants";
import { Link } from "react-router-dom";
import { IId } from "../../types/global.typing";
import Chat from "../Chat/Chat";

const GamePlay = () => {
  const dispatch = useAppDispatch();
  const game : IGame | null = useAppSelector((state) => state.game.Data);
  const userName = useAppSelector((state) => state.profile.Data?.UserName);
  const userId = useAppSelector((state) => state.profile.Data?.Id);
  const cells = useAppSelector((state) => state.game.Data?.Field.FieldMoves.Cells);
  let [gameResult, setGameResult] = React.useState<string>()
  let [bgColorClass, setBgColorClass] = React.useState<string>()
  let [winnerExist, setWinnerExist] = React.useState<boolean>(false)

  const gameFieldState = [[0,0,0],[0,0,0],[0,0,0]]

  const drawResultWindow = (winnerId : IId, draw : boolean) => {
    if (draw) {
      setBgColorClass('bg-yellow-400');
      setGameResult("Draw")
    }
    else if (winnerId !== userId){
      setBgColorClass('bg-red-400');
      setGameResult("You lost")
    }
    else if (winnerId === userId){
      setBgColorClass('bg-green-400');
      setGameResult("You win")
    }
    else {
      setBgColorClass('bg-gray-400');
    }
  }

  const makeMove = async (num : number) => {
    let gameId = game?.Id;
    let fieldId = game?.Field.Id;
    let fieldMovesId = game?.Field.FieldMoves.Id;
    let playerId = userId;
    let index = num;
    dispatch(MakeMove({gameId, fieldId, fieldMovesId, playerId, index}));
  }

  const tryToMakeMove = (num : number) => {
    let tip = document.getElementById("moveTip");
    if (!game?.Winner){
      if (userId === game.PlayerQueueId){
        tip!.style.display = "none"
        makeMove(num)
      } else {
        tip!.style.display = "block"
        setTimeout(() => {
          tip!.style.display = "none";
        }, 2000);
      }
    }
  }

  const checkWinner = () => {
    let loser = game?.GamesPlayers.find(player => player.Player.Id != userId)?.Player.Id;;
    for (let i = 0; i < gameFieldState.length; i++){
      if (gameFieldState[i][0] == 1 && gameFieldState[i][1] == 1 && gameFieldState[i][2] == 1){
        sendWinnerRequest(userId, loser);
      }
      if (gameFieldState[i][0] == 2 && gameFieldState[i][1] == 2 && gameFieldState[i][2] == 2){
        sendWinnerRequest(loser, userId);
      }
    }

    for (let i = 0; i < gameFieldState.length; i++){
      if (gameFieldState[0][i] == 1 && gameFieldState[1][i] == 1 && gameFieldState[2][i] == 1){
        sendWinnerRequest(userId, loser);
      }
      if (gameFieldState[0][i] == 2 && gameFieldState[1][i] == 2 && gameFieldState[2][i] == 2){
        sendWinnerRequest(loser, userId);
      }
    }

    if (gameFieldState[0][0] == 1 &&  gameFieldState[1][1] == 1 && gameFieldState[2][2] == 1) {
      sendWinnerRequest(userId, loser);
    }
    if (gameFieldState[0][0] == 2 &&  gameFieldState[1][1] == 2 && gameFieldState[2][2] == 2) {
      sendWinnerRequest(loser, userId);
    }

    if (gameFieldState[0][2] == 1 &&  gameFieldState[1][1] == 1 && gameFieldState[2][0] == 1) {
      sendWinnerRequest(userId, loser);
    }

    if (gameFieldState[0][2] == 2 &&  gameFieldState[1][1] == 2 && gameFieldState[2][0] == 2) {
      sendWinnerRequest(loser, userId);
    }
  }

  const sendWinnerRequest = (winnerId : IId, loserId: IId) => {
    let gameId = game?.Id;  
  const sendWinnerRequest = (winnerIndex : number, loserIndex: number) => {
    setWinnerExist(true);
    let gameId = game?.Id;
    let winnerId = game?.GamesPlayers[winnerIndex]?.PlayerId;
    let loserId = game?.GamesPlayers[loserIndex]?.PlayerId;
    drawResultWindow(winnerId, false);
    dispatch(SetWinner({winnerId, loserId, gameId}));
  }

  React.useEffect(() => {
    const leaveGroup = async () => await leaveGameGroup(game.Id, userName);
    
    return () => {
      leaveGroup();
      stopConnection();
    };
  }, []);

  React.useEffect(() => {
    hubConnection.on("ReceiveGameState", (gameState) => {
      dispatch(updateGameState(JSON.parse(gameState)))
    });

    hubConnection.on("LeaveGroup", (userName) => {
      let chat = document.getElementById("chatBox");
      chat.innerHTML += `<div class="flex justify-between w-full"><p class="w-3/4 break-words text-yellow-400">${userName} left</p></div>`;
    });
  }, [dispatch]);

  React.useEffect(() => {
    for(let i = 0; i < cells?.length; i++){
      let x = cells[i].X
      let y = cells[i].Y
      let value = cells[i].Value
      gameFieldState[x][y] = value;
    }

    for(let i = 0; i < gameFieldState.length; i++){
      for(let j = 0; j < gameFieldState.length; j++){
        let id = i.toString() + j.toString()
        let div = document.getElementById(id)

        switch (gameFieldState[i][j]){
          case 1:
            div.innerHTML = circle;
            break;
          case 2:
            div.innerHTML = cross;
            break;
          default: 
            div.innerHTML = ""
        }
      }
    }

    if (game?.Winner === null){
      checkWinner()
      if (!winnerExist && game?.StrokeNumber == 9 && game.GameStatus !== 3){
        const Id = game.Id;
        dispatch(SetDraw({ Id }))
        drawResultWindow(Id, true);
      }
    }
    definePlayersTurn()
  }, [cells]);

  const definePlayersTurn = () => {
    if (game?.PlayerQueueId == userId){
      let playerName = game?.GamesPlayers.find(player => player.Player.Id == userId)?.Player.UserName;;
      setPlayersTurn(playerName)
    } else{
      let playerName = game?.GamesPlayers.find(player => player.Player.Id != userId)?.Player.UserName;
      setPlayersTurn(playerName)
    }
  }
  return (
    <>
        <div
          id="moveTip"
          className="absolute w-[360px] m-auto bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 shadow-md hidden"
          role="alert"
        >
          <div className="flex items-center">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-red-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">
                Wait for your opponent's move
              </p>
            </div>
          </div>
        </div>
        {gameResult ? 
        <>
        <div className={`absolute ${bgColorClass} mt-52 p-10 rounded-xl text-white flex flex-col items-center`}>
          <span className="text-lg">{gameResult}</span>
          <Link
          to="/profile"
          className="bg-white px-4 text-s mt-4 text-black py-2 rounded text-center border hover:border-white"
        >
          Exit
        </Link>
        </div>
        </> 
        : "" }
      <div className="m-auto flex flex-col w-full">
      <div className="flex m-auto items-center justify-between mt-14 mb-10">
        <div className="mr-10">
          <p>{game?.GamesPlayers[0].Player.UserName}{circle}</p>
        </div>
        <div className="flex">
          <div>
            <div id="00"
              onClick={() => tryToMakeMove(1)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2"
            ></div>
            <div id="10"
              onClick={() => tryToMakeMove(4)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div id="20"
              onClick={() => tryToMakeMove(7)}
              className="text-8xl  w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
          </div>
          <div>
            <div id="01"
              onClick={() => tryToMakeMove(2)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div id="11"
              onClick={() => tryToMakeMove(5)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div id="21"
              onClick={() => tryToMakeMove(8)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
          </div>
          <div>
            <div id="02"
              onClick={() => tryToMakeMove(3)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div id="12"
              onClick={() => tryToMakeMove(6)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div id="22"
              onClick={() => tryToMakeMove(9)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
          </div>
        </div>
        <div className="ml-10">
          <p>{game?.GamesPlayers[1].Player.UserName}{cross}</p>
        </div>
        <Chat/>
      </div>
      <div className="mt-10 text-center">
        <p>{playersTurn}`s turn</p>
      </div>
    </div>
    </>
  );
};

export default GamePlay;