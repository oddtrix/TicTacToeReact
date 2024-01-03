import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CreateGame } from "../../redux/slices/game";

const Game = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game.data);
  const createGame = () => {
    dispatch(CreateGame());
    console.log("game createdd)))");
  };
  return (
    <>
      {game?.gameStatus == "1" ? navigate(`/game`) : <></>}
      <div className="flex flex-col w-full">
        <div className="text-center m-auto">
          <button
            onClick={() => createGame()}
            className="bg-blue-500 px-8 text-2xl text-white py-2 rounded text-center hover:bg-blue-600 hover:cursor-pointer"
          >
            Create game
          </button>
          <div className="relative my-4">
            <span className="relative z-10 px-3 bg-gray-50 text-gray-700">
              or
            </span>
            <div
              className="absolute inset-0 flex items-center "
              aria-hidden="true"
            >
              <div className="w-full bg-gray-300 h-[1px]"></div>
            </div>
          </div>
          <Link
            to="/find-game"
            className="bg-green-500 px-8 text-2xl text-white py-2 rounded text-center hover:bg-green-600"
          >
            Find game
          </Link>
        </div>
      </div>
    </>
  );
};

export default Game;
