import { TailSpin } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loading } from "../../types/global.typing";
import Profile from "./Profile";
import React from "react";
import { GetPlayerHistory, GetProfile } from "../../redux/slices/profile";
import { IId } from "../../types/global.typing";
import { getUserId } from "../../helpers/additionFunction";
import { GamesPlayer } from "../../types/game.typing";

export const ProfileScreen = () => {
  const profileStatus = useAppSelector((state) => state.profile.Status);
  const history = useAppSelector((state) => state.profile.History);
  const dispatch = useAppDispatch();
  const userId: IId = getUserId();
  React.useEffect(() => {
    dispatch(GetProfile({ userId }));
    dispatch(GetPlayerHistory({ userId }));
  }, []);
  const defineGameResult = (currentPlayerId, winnerId, strokeNumber) => {
    if (winnerId !== undefined) {
      if (winnerId === currentPlayerId){
        return <span className="text-green-500">Win</span>
      } else {
        return <span className="text-red-500">Lose</span>
      }
    } 
    else if (winnerId == null && strokeNumber == 9) {
      return <span className="text-orange-500">Draw</span>
    }
    else {
      return <span className="text-gray-500">Abandoned</span>
    }
  }
  return (
    <>
      {profileStatus === Loading.Loaded ? (
        <Profile userId={userId} />
      ) : profileStatus === Loading.Loading ? (
        <div className="flex justify-center mt-28 m-auto w-full">
          <TailSpin
            height="60"
            width="60"
            color="#7fffd4"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
        </div>
      ) : profileStatus === Loading.Error ? (
        <div className="m-auto mt-20 w-full flex justify-center">
          <p className="bg-red-500 text-white rounded-lg px-5 text-lg w-1/3 text-center">
            Something went wrong. Please, try later or login again.
          </p>
        </div>
      ) : (
        ""
      )}
      {history !== null ? 
        <div className="">
          <br />
          <table className="text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-green-500 block">
              <tr className="">
                <th scope="col" className="text-center px-6 py-3">
                  Game Id
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Opponent
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Stroke number
                </th>
                <th scope="col" className="text-center px-10 py-3">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto h-80 block w-auto">
              {Array.isArray(history) &&
                history.map((game : GamesPlayer) => (
                  <tr key={game.Game.Id} className="">
                    <td title={`${game.Game.Id}`} className="px-6 py-3">{game.Game.Id?.slice(0, 2)}...{game.Game.Id?.slice(game.Game.Id.length - 2, game.Game.Id.length)}</td>
                    <td className="pl-9 py-3">{game.Game.GamesPlayers.length !== 0 ? game.Game.GamesPlayers[0].Player.UserName : "ERROR"}</td>
                    <td className="pl-28 py-3">{game.Game.StrokeNumber}</td>
                    <td className="text-center pl-24 py-3">{defineGameResult(game.PlayerId, game.Game.Winner?.Id, game.Game.StrokeNumber)}</td>
                  </tr>
                ))}
            </tbody>
          </table> 
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
