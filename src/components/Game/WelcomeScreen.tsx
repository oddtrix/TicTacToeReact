import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  return (
    <>
      <h1 className="text-4xl mt-52">Welcome to TicTacToe</h1>
      <span className="text-lg mt-4">
        You can create a new game or join an existing one
      </span>
      <Link
        to="/menu"
        className="hover:bg-white hover:text-black hover:border-green-400 hover:border leading-10 text-white bg-green-400 px-10 rounded-lg mt-4"
      >
        Game
      </Link>
    </>
  );
};

export default WelcomeScreen;
