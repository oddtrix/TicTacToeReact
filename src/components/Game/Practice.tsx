import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { circle, cross } from "../../constants/string.constants";
import { Link } from "react-router-dom";

const Practice = () => {
  const profile = useAppSelector((state) => state.profile.Data);
  const userName = profile?.UserName
  const bot = "BOT";
  let [gameFieldState, setGameFieldState] = React.useState<number[][]>([[0,0,0],[0,0,0],[0,0,0]])
  let [strokeNumber, setStrokeNumber] = React.useState<number>(0)
  let [finishedGame, setFinishedGame] = React.useState<boolean>(false)
  let [gameResult, setGameResult] = React.useState<string>()
  let [bgColorClass, setBgColorClass] = React.useState<string>()
  let queue = userName; 

  const MAX_DEPTH = 2;
  const BOT_PLAYER = 2;
  const HUMAN_PLAYER = 1; 


  const tryToMakeMove = (num : number) => {
    let tip = document.getElementById("moveTip");
    if (!finishedGame){
      if (userName === queue){
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

  const makeMove = (num: number) => {
    let x = Math.floor((num - 1) / 3);
    let y = (num - 1) % 3;
    if (gameFieldState[x][y] == 0){
      updateGameFieldState(x, y, strokeNumber)
      setStrokeNumber(strokeNumber + 1)
    }
  }

  const drawResultWindow = (winner : string) => {
    if (winner === userName){
      setBgColorClass('bg-green-400');
      setGameResult("You win")
    }
    else if (winner === bot){
      setBgColorClass('bg-red-400');
      setGameResult("You lost")
    }
    else if (winner === 'draw') {
      setBgColorClass('bg-yellow-400');
      setGameResult("Draw")
    }
    else {
      setBgColorClass('bg-gray-400');
    }
    console.log(bgColorClass)
  }
  
  const finishGame = (name : string) => {
    setGameResult(name);
    drawResultWindow(name);
    setFinishedGame(true);
  }

  const checkPossibleWinner = (board: number[][], player: number) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
        return true;
      }
    }
  
    for (let i = 0; i < board.length; i++) {
      if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
        return true;
      }
    }
  
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
      return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
      return true;
    }
  
    return false;
  };

  const checkWinner = () => {
    for (let i = 0; i < gameFieldState.length; i++){
      if (gameFieldState[i][0] == 1 && gameFieldState[i][1] == 1 && gameFieldState[i][2] == 1){
        finishGame(userName)
      }
      if (gameFieldState[i][0] == 2 && gameFieldState[i][1] == 2 && gameFieldState[i][2] == 2){
        finishGame(bot)
      }
    }

    for (let i = 0; i < gameFieldState.length; i++){
      if (gameFieldState[0][i] == 1 && gameFieldState[1][i] == 1 && gameFieldState[2][i] == 1){
        finishGame(userName)
      }
      if (gameFieldState[0][i] == 2 && gameFieldState[1][i] == 2 && gameFieldState[2][i] == 2){
        finishGame(bot)
      }
    }

    if (gameFieldState[0][0] == 1 && gameFieldState[1][1] == 1 && gameFieldState[2][2] == 1) {
      finishGame(userName)
      return null;
    }

    if (gameFieldState[0][0] == 2 && gameFieldState[1][1] == 2 && gameFieldState[2][2] == 2) {
      finishGame(bot)
      return null;
    }

    if (gameFieldState[0][2] == 1 && gameFieldState[1][1] == 1 && gameFieldState[2][0] == 1) {
      finishGame(userName)
      return null;
    }

    if (gameFieldState[0][2] == 2 && gameFieldState[1][1] == 2 && gameFieldState[2][0] == 2) {
      finishGame(bot)
      return null;
    }

    if (strokeNumber == 9) { 
      finishGame("draw")
    }
  }

  const updateGameFieldState = (x: number, y: number, strokeNumber: number) => {
    const newGameFieldState = gameFieldState.map((row, rowIndex) => {
      if (rowIndex === x) {
        return row.map((cell, cellIndex) => {
          if (cellIndex === y) {
            return strokeNumber % 2 === 0 ? 1 : 2;
          }
          return cell;
        });
      }
      return row;
    });
    setGameFieldState(newGameFieldState);
  };

  const botMove = () => {
    if (finishedGame) return;
  
    const bestMove = minimax(gameFieldState, 0, true);
    if (bestMove) {
      const [x, y] = bestMove.move;
      updateGameFieldState(x, y, strokeNumber);
      setStrokeNumber(strokeNumber + 1);
    }
  };

  const minimax = (board: number[][], depth: number, isMaximizing: boolean) => {
    if (finishedGame || depth >= MAX_DEPTH) {
      const score = evaluate(board);
      return { score };
    }
  
    let bestScore = isMaximizing ? -Infinity : Infinity;
    let bestMove = null;
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 0) {
          board[i][j] = isMaximizing ? BOT_PLAYER : HUMAN_PLAYER;
          const result = minimax(board, depth + 1, !isMaximizing);
          board[i][j] = 0;
  
          if (isMaximizing) {
            if (result.score > bestScore) {
              bestScore = result.score;
              bestMove = { move: [i, j], score: result.score };
            }
          } else {
            if (result.score < bestScore) {
              bestScore = result.score;
              bestMove = { move: [i, j], score: result.score };
            }
          }
        }
      }
    }
  
    return bestMove;
  };

  const evaluate = (board: number[][]) => {
    if (checkPossibleWinner(board, BOT_PLAYER)) {
      return 1;
    } else if (checkPossibleWinner(board, HUMAN_PLAYER)) {
      return -1; 
    } else {
      return 0;
    }
  };

  React.useEffect(() => {
    for(let i = 0; i < gameFieldState.length; i++){
      for(let j = 0; j < gameFieldState.length; j++){
        let id = i.toString() + j.toString()
        let div = document.getElementById(id)
        switch (gameFieldState[i][j]){
          case 1:
            if (div.innerText.trim().length == 0){
              div.innerHTML = circle;
            }
            break;
          case 2:
            if (div.innerText.trim().length == 0){
              div.innerHTML = cross;
            }
            break;
          default: 
            div.innerHTML = ""
        }
      }
    }

    if (!finishedGame){
      checkWinner()
    }
         
    if (strokeNumber % 2 !== 0){
      botMove()
    }
  }, [gameFieldState]);
  return (
    <>
        <div
          id="moveTip"
          className="w-[360px] m-auto bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 shadow-md hidden"
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
        { finishedGame ? 
        <>
        <div className={`absolute ${bgColorClass} mt-52 p-10 rounded-xl text-white flex flex-col items-center`}>
          <span className="text-lg">{gameResult}</span>
          <Link
          to="/main"
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
          <p>{userName}{circle}</p>
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
        <p>{bot}{cross}</p>
        </div>
      </div>
      <div className="mt-10 text-center">
        <p>{strokeNumber % 2 === 0 ? userName : bot}`s turn</p>
      </div>
    </div>
    </>
  );
};

export default Practice;
