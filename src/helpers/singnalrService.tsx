import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { updateGameState } from "../redux/slices/game";
import { useAppDispatch } from "../redux/hooks";

const hubConnection = new HubConnectionBuilder()
    .withUrl("https://localhost:44338/game")
    .configureLogging(LogLevel.Information)
    .build();

const startConnection = async () => {
    try {
        await hubConnection.start();
        console.log("Connection to the hub is established");
    } catch (err) {
        console.error("Error starting SignalR connection:", err);
    }
};

const stopConnection = async () => {
    try {
        await hubConnection.stop();
        console.log("Connection to the hub is stopped");
    } catch (err) {
        console.error("Error stopping SignalR connection:", err);
    }
};

const joinGameGroup = async (gameId, userName) => {
    try {
        await hubConnection.invoke("JoinGameGroup", gameId, userName);
        console.log(`Joined game group for game ID ${gameId}`);
    } catch (err) {
        console.error("Error joining game group:", err);
    }
};

const updatedGameState = async (gameId, game) => {
    try {
        await hubConnection.invoke("UpdateGameState", gameId, game)
        console.log('Game state to update', game);
    } catch (err) {
        console.error("Error updating game state:", err);
    }
}

// hubConnection.on("JoinedPlayer", (message) => {
//     console.log(`${message} has joined the game`);
//     // Add logic to handle joined player event
// });

// hubConnection.on("ReceiveGameState", (gameState) => {
//     // const dispatch = useAppDispatch();
//     // dispatch(updateGameState(gameState));
//     console.log("Received game state:", gameState);
// });

export { hubConnection, startConnection, stopConnection, joinGameGroup, updatedGameState };
