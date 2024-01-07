import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { IUserId } from "../../types/user.typing";

const Profile = ({ userId }: { userId: IUserId }) => {
  const profile = useAppSelector((state) => state.profile.data);
  return (
    <>
      <div className="w-3/5 flex shadow-lg border h-60 items-center justify-center m-auto mt-10">
        <div className="flex">
          <div className="flex w-40 h-40">
            <img src={profile?.avatarURL} alt="avatar" />
          </div>
          <div className="text-lg ml-10 border-l-2 p-5">
            <p>Username: {profile?.userName}</p>
            <p>Email: {profile?.email}</p>
            <p>Rating: {profile?.rating}</p>
          </div>
        </div>
      </div>
      {userId.id !== undefined ? true : <Navigate to="/login" />}
    </>
  );
};

export default Profile;
