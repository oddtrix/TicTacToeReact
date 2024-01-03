import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Login from "./components/Registration/Login.tsx";
import Signup from "./components/Registration/Signup.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import MainScreen from "./components/Main/MainScreen.tsx";
import { ProfileScreen } from "./components/Main/ProfileScreen.tsx";
import FindGameScreen from "./components/Main/FindGameScreen.tsx";
import GamePlay from "./components/Main/GamePlay.tsx";
import { GameScreen } from "./components/Main/GameScreen.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/menu",
    element: <MainScreen />,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
  },
  {
    path: "/find-game",
    element: <FindGameScreen />,
  },
  {
    path: "/game",
    element: <GameScreen />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
