import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { IId } from "../../types/global.typing";

const Profile = ({ userId }: { userId: IId }) => {
  const profile = useAppSelector((state) => state.profile.Data);
  return (
    <>
      <div className="w-3/5 flex shadow-lg border h-60 items-center justify-center mt-10">
        <div className="flex">
          <div className="flex w-40 h-40">
            <img src={profile?.AvatarURL} alt="avatar" />
          </div>
          <div className="text-lg ml-10 border-l-2 p-5">
            <p>Username: {profile?.UserName}</p>
            <p>Email: {profile?.Email}</p>
            <p>Rating: {profile?.Rating}</p>
          </div>
        </div>
      </div>
      {userId.Id !== undefined ? true : <Navigate to="/login" />}
    </>
  );
};

export default Profile;
