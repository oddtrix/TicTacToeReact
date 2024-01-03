import Navbar from "./Navbar";
import GamePlay from "./GamePlay";

export const GameScreen = () => {
  return (
    <div className="flex h-full ">
      <Navbar />
      <GamePlay />
    </div>
  );
};
