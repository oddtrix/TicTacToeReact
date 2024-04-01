import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { IId } from "../types/global.typing";
import { IGame } from "../types/game.typing";

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
        console.log("Connection to the GameHub is stopped");
    } catch (err) {
        console.error("Error stopping SignalR connection:", err);
    }
};

const leaveGameGroup = async (gameId: IId, userName: string) => {
    try {
        await hubConnection.send("LeaveGameGroup", gameId, userName);
    } catch (err) {
        console.error("Error leaving SignalR group:", err);
    }
};

const joinGameGroup = async (gameId: IId, userName: string) => {
    try {
        await hubConnection.send("JoinGameGroup", gameId, userName);
        console.log(`Joined game group for game ID ${gameId}`);
    } catch (err) {
        console.error("Error joining game group:", err);
    }
};

const updatedGameState = async (gameId: IId, game: IGame) => {
    try {
        await hubConnection.send("UpdateGameState", gameId, game)
        // console.log('Game state to update', game);
    } catch (err) {
        console.error("Error updating game state:", err);
    }
}

export { hubConnection, startConnection, stopConnection, joinGameGroup, updatedGameState, leaveGameGroup };
