import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { GetOpenGames, JoinToGame } from "../../redux/slices/game";
import { IGame, IGameId } from "../../types/game.typing";
import { useNavigate } from "react-router-dom";

const FindGame = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const games = useAppSelector((state) => state.game.data);
  const joinToGame = (game: IGame) => {
    dispatch(JoinToGame({ game }));
  };
  React.useEffect(() => {
    dispatch(GetOpenGames());
  }, []);
  return (
    <>
      {games?.gameStatus == "2" ? navigate("/game") : ""}
      <div className="flex flex-col w-full items-center">
        <table className="w-4/5 text-sm text-left text-gray-500 table-auto">
          <caption className="p-2 text-lg font-semibold text-left text-gray-900"></caption>
          <thead className="text-xs text-white uppercase bg-green-500">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                Id
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Is Private
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(games) &&
              games.map((game: IGame) => (
                <tr key={game.id} className="">
                  <td className="text-center px-6 py-3">{game.id}</td>
                  <td className="text-center px-6 py-3">
                    {game.isPrivate.toString()}
                  </td>
                  <td className="text-center px-6 py-3">
                    <button
                      onClick={() => joinToGame(game)}
                      className="hover:bg-green-500 hover:text-white border border-green-400 hover:rounded-lg hover:px-10 leading-10 text-black bg-inherit rounded-lg px-10 "
                    >
                      Join
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FindGame;
