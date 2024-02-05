import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { GetOpenGames, JoinToGame } from "../../redux/slices/game";
import { IGame } from "../../types/game.typing";
import { useNavigate } from "react-router-dom";

const OpenGames = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const games = useAppSelector((state) => state.game.Data);
  const joinToGame = (game: IGame) => {
    dispatch(JoinToGame({ game }));
  };
  React.useEffect(() => {
    dispatch(GetOpenGames());
  }, []);
  return (
    <>
      {games?.GameStatus == "2" ? navigate("/starting") : <></>}
      <div className="flex flex-col w-full items-center max-h-10 ">
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
          <tbody className="overflow-y-auto">
            {Array.isArray(games) &&
              games.map((game: IGame) => (
                <tr key={game.Id} className="">
                  <td className="text-center px-6 py-3">{game.Id}</td>
                  <td className="text-center px-6 py-3">
                    {game.IsPrivate.toString()}
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

export default OpenGames;
