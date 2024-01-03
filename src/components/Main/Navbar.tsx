import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/auth";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const onClickLogOut = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
  };
  return (
    <nav className="flex flex-col items-center justify-between bg-green-500 w-1/6 h-screen pt-10">
      <div className="flex flex-col items-center space-y-5">
        <Link
          to="/profile"
          className="hover:bg-white hover:text-black hover:rounded-lg hover:px-10 leading-10 text-white"
        >
          Profile
        </Link>
        <Link
          to="/menu"
          className="hover:bg-white hover:text-black hover:rounded-lg hover:px-10 leading-10 text-white"
        >
          Game
        </Link>
        <Link
          to="/history"
          className="hover:bg-white hover:text-black hover:rounded-lg hover:px-10 leading-10 text-white"
        >
          History
        </Link>
      </div>
      <Link
        to="/"
        onClick={onClickLogOut}
        className="hover:bg-white hover:text-black border hover:rounded-lg hover:px-10 leading-10 text-white bg-inherit rounded-lg px-10 mb-10"
      >
        Sign out
      </Link>
    </nav>
  );
};

export default Navbar;
