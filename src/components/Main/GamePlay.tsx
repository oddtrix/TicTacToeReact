import { useEffect } from "react";
import { circle, cross } from "../../constants/string.constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { io } from "socket.io-client";
const GamePlay = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game.data);
  const draw = (div: HTMLDivElement) => {
    div.innerText = circle;
  };
  useEffect(() => {
    // Подключение к серверу через веб-сокет
    const socket = io("https://localhost:44338/gamehub");

    // Логика для обработки событий веб-сокетов
    socket.on("gameUpdate", (gameId) => {
      // Выполняйте запрос на сервер для получения обновленного состояния игры
      const token = window.localStorage.getItem("token");
      fetch(`https://localhost:44338/api/Game/GetGameById?gameId=${gameId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Добавьте ваш токен авторизации
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Обработка полученных данных
          console.log("Обновленное состояние игры:", data);
        })
        .catch((error) => {
          console.error(
            "Ошибка при получении обновленного состояния игры:",
            error
          );
        });
    });

    // Отключение от сервера при размонтировании компонента
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className="m-auto flex flex-col w-full">
      <div className="flex m-auto items-center justify-between mt-14 mb-10">
        <div className="mr-10">
          <p>{game?.gamesPlayers[0]?.player?.userName}</p>
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
          <p>{game?.gamesPlayers[1]?.player?.userName}</p>
        </div>
      </div>
      <div className="mt-10 text-center">
        <p>{game?.gamesPlayers[0]?.player?.userName}`s turn</p>
      </div>
    </div>
  );
};

export default GamePlay;
