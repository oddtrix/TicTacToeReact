import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Main/Layout";
import WelcomeScreen from "../components/Game/WelcomeScreen";
import { ProfileScreen } from "../components/Profile/ProfileScreen";
import Game from "../components/Game/Lobby";
import Signup from "../components/Registration/Signup";
import Login from "../components/Registration/Login";
import WaitingRoom from "../components/Game/WaitingRoom";
import OpenGames from "../components/Game/OpenGames";
import GamePlay from "../components/Game/GamePlay";
import Starting from "../components/Game/Starting";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/main",
    element: <Layout />,
    children: [
      {
        element: <WelcomeScreen />,
        index: true,
      },
    ],
  },
  {
    path: "/profile",
    element: <Layout />,
    children: [
      {
        element: <ProfileScreen />,
        index: true,
      },
    ],
  },
  {
    path: "/waiting-room",
    element: <Layout />,
    children: [
      {
        element: <WaitingRoom />,
        index: true,
      },
    ],
  },
  {
    path: "/starting",
    element: <Layout />,
    children: [
      {
        element: <Starting />,
        index: true,
      },
    ],
  },
  {
    path: "/menu",
    element: <Layout />,
    children: [
      {
        element: <Game />,
        index: true,
      },
    ],
  },
  {
    path: "/find-game",
    element: <Layout />,
    children: [
      {
        element: <OpenGames />,
        index: true,
      },
    ],
  },
  {
    path: "/game",
    element: <Layout />,
    children: [
      {
        element: <GamePlay />,
        index: true,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
