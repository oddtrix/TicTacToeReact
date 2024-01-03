import io from "socket.io-client";

const socket = io("<wss://localhost:8080>");

export const CONNECT_SOCKET = "CONNECT_SOCKET";
export const DISCONNECT_SOCKET = "DISCONNECT_SOCKET";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const connectSocket = () => ({
  type: CONNECT_SOCKET,
});

export const disconnectSocket = () => ({
  type: DISCONNECT_SOCKET,
});

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
});

export const sendMessage = (message) => (useAppDispatch) => {
  socket.emit("message", message);
};

export const startListening = () => (useAppDispatch) => {
  useAppDispatch(connectSocket());

  socket.on("connect", () => {
    console.log("Соединение установлено");
  });

  socket.on("message", (data) => {
    useAppDispatch(receiveMessage(data));
  });

  socket.on("disconnect", () => {
    useAppDispatch(disconnectSocket());
    console.log("Соединение закрыто");
  });
};
