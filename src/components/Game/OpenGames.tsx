import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { GetOpenGames, JoinToGame } from "../../redux/slices/game";
import { IGame } from "../../types/game.typing";
import { useNavigate } from "react-router-dom";
import { joinGameGroup, startConnection, updatedGameState } from "../../helpers/singnalrGameService";

const OpenGames = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const games = useAppSelector((state) => state.game.Data);
  const game : IGame = useAppSelector((state) => state.game.Data);
  const userName = useAppSelector((state) => state.profile.Data?.UserName);

  const play = async () => {
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
  const joinToGame = (game: IGame) => {
    const Id = game?.Id;
    dispatch(JoinToGame({ Id }));
  };

  React.useEffect(() => {
    dispatch(GetOpenGames());
  }, []);
  React.useEffect(() => {
    play();
  }, [joinToGame]);
  return (
    <>
      {games?.GameStatus == "2" ? navigate("/starting") : <></>}
      <div className="flex flex-col w-full items-center max-h-10 ">
        <table className="w-2/5 text-sm text-left text-gray-500 table-auto">
          <caption className="p-2 text-lg font-semibold text-left text-gray-900"></caption>
          <thead className="text-xs text-white uppercase bg-green-500 block">
            <tr>
              <th scope="col" className="text-center pl-[180px] py-3">
                Id
              </th>
              <th scope="col" className="text-center pl-[202px] py-3">
                Action
              </th>
              <th scope="col" className="text-center px-6 py-3">
                <button
                        onClick={() => dispatch(GetOpenGames())}
                        className="hover:bg-white hover:text-black  border border-green-400 hover:rounded-lg leading-10 text-white bg-inherit rounded-lg px-3 "
                      >
                        Refresh
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll block h-[600px] h">
            {Array.isArray(games) &&
              games.map((game: IGame) => (
                <tr key={game.Id} className="">
                  <td className="text-center px-6 py-3">{game.Id}</td>
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
