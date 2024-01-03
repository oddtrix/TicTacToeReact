import Game from "./Game";
import Navbar from "./Navbar";

const MainScreen = () => {
  return (
    <div className="flex h-full ">
      <Navbar />
      <Game />
    </div>
  );
};

export default MainScreen;
