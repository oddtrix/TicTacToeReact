import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { GetPlayerHistory } from "../../redux/slices/profile";
import { IGamesPlayer, IHistory } from "../../types/game.typing";
import { TailSpin } from "react-loader-spinner";
import Pagination from "./Pagination";

const GameHistory = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.profile.Data);
    const history: IHistory = useAppSelector((state) => state.profile.History);

    const defineGameResult = (currentPlayerId, winnerId, strokeNumber) => {
        if (winnerId !== undefined) {
          if (winnerId === currentPlayerId){
            return <span className="text-green-500 pl-2">Win</span>
          } else {
            return <span className="text-red-500 pl-2">Lose</span>
          }
        } 
        else if (winnerId == null && strokeNumber == 9) {
          return <span className="text-orange-500">Draw</span>
        }
        else {
          return <span className="text-gray-500">Abandoned</span>
        }
    }
    
    React.useEffect(() => {
        dispatch(GetPlayerHistory({
            userId,
            page: 1
        }));
    }, []);
    return (
        <>
        {history !== null ? 
            <div className="flex flex-col items-center">
              <br />
              <table className="text-sm text-center text-gray-500">
                  <thead className="text-xs text-white uppercase bg-green-500">
                  <tr className="">
                      <th scope="col" className="text-center px-8 py-3">
                      Game Id
                      </th>
                      <th scope="col" className="text-center px-8 py-3">
                      Opponent
                      </th>
                      <th scope="col" className="text-center px-8 py-3">
                      Stroke number
                      </th>
                      <th scope="col" className="text-center px-8 py-3">
                      Result
                      </th>
                  </tr>
                  </thead>
                  <tbody className="h-80">
                  {Array.isArray(history.Items) &&
                      history.Items.map((game : IGamesPlayer) => (
                      <tr key={game.Game.Id} className="">
                          <td title={`${game.Game.Id}`} className="py-3">{game.Game.Id?.slice(0, 2)}...{game.Game.Id?.slice(game.Game.Id.length - 2, game.Game.Id.length)}</td>
                          <td className="py-3">{game.Game.GamesPlayers.length !== 0 ? game.Game.GamesPlayers[0].Player.UserName : "ERROR"}</td>
                          <td className="py-3">{game.Game.StrokeNumber}</td>
                          <td className="text-center py-3">{defineGameResult(game.PlayerId, game.Game.Winner?.Id, game.Game.StrokeNumber)}</td>
                      </tr>
                      ))}
                  </tbody>
              </table> 
              <Pagination/>
            </div>
        : (
            <div className="flex justify-center mt-28">
                    <TailSpin
                        height="60"
                        width="60"
                        color="#22C55E"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        visible={true}
                    />
            </div>
        )}
        </>
    );
};

export default GameHistory;