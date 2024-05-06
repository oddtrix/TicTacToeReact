import { TailSpin } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Loading } from "../../types/global.typing";
import Profile from "./Profile";
import React from "react";
import { GetProfile } from "../../redux/slices/profile";
import { IId } from "../../types/global.typing";
import { getUserId } from "../../helpers/additionFunction";
import GameHistory from "./GameHistory";

export const ProfileScreen = () => {
  const profileStatus = useAppSelector((state) => state.profile.Status);
  const dispatch = useAppDispatch();
  const userId: IId = getUserId();

  React.useEffect(() => {
    dispatch(GetProfile({ userId }));
  }, []);
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
      {userId !== null ? 
          <GameHistory/>
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
