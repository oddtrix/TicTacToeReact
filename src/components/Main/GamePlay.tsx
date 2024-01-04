import { circle, cross } from "../../constants/string.constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { updateGameState } from "../../redux/slices/game";

const GamePlay = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game.data);
  const userName = useAppSelector((state) => state.profile.data?.userName);
  const draw = (div: HTMLDivElement) => {
    div.innerText = circle;
  };
  console.log(game)

  const joinGame = async () => {
    const gameId = game?.id;
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:44338/game')
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("JoinedPlayer", (message) => {
        console.log(`${message} has joined to the game`);

        connection.invoke("UpdateGameState", gameId, game)
          .catch(err => console.error(err));
      });

      connection.on("ReceiveGameState", (serializedGameState) => {
        const receivedGameState = JSON.parse(serializedGameState);
        dispatch(updateGameState(receivedGameState));
        console.log("Received game state:", receivedGameState);
      });

      await connection.start().then(() => {
        console.log("Connection to the hub is established");
      }).then(() => {
        console.log(gameId)
        if (gameId !== undefined) {
          connection.invoke("JoinGameGroup", gameId, userName)
            .catch(err => console.error(err));
        }
      })


    } catch (e) {
      console.log(e);
    }
  }
  joinGame();
  return (
    <div className="m-auto flex flex-col w-full">
      <div className="flex m-auto items-center justify-between mt-14 mb-10">
        <div className="mr-10">
          <p>{1}</p>
        </div>
        <div className="flex">
          <div>
            <div
              onClick={(event) => draw(event.currentTarget)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2"
            ></div>
            <div
              onClick={(event) => draw(event.currentTarget)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div
              onClick={(event) => draw(event.currentTarget)}
              className="text-8xl  w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
          </div>
          <div>
            <div
              onClick={(event) => draw(event.currentTarget)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div
              onClick={(event) => draw(event.currentTarget)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div
              onClick={(event) => draw(event.currentTarget)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
          </div>
          <div>
            <div
              onClick={(event) => draw(event.currentTarget)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div
              onClick={(event) => draw(event.currentTarget)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
            <div
              onClick={(event) => draw(event.currentTarget)}
              className="text-8xl w-40 h-40 flex justify-center items-center hover:bg-gray-200 rounded-xl cursor-pointer border-2 "
            ></div>
          </div>
        </div>
        <div className="ml-10">
          <p>{2}</p>
        </div>
      </div>
      <div className="mt-10 text-center">
        <p>{1}`s turn</p>
      </div>
    </div>
  );
};

export default GamePlay;
