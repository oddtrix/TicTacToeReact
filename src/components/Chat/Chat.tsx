import { BiSolidSend } from "react-icons/bi";
import MessageBox from "./MessageBox";
import { IGame } from "../../types/game.typing";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SendMessage } from "../../redux/slices/game";
import React from "react";

const Chat = () => {
    const dispatch = useAppDispatch();
    const game : IGame | null = useAppSelector((state) => state.game.Data);
    const playerId = useAppSelector((state) => state.profile.Data?.Id);
    const gameId = game?.Id;
    const chatId = game?.Chat.Id;
    
    const sendMessage = () => {
        const messageInput : HTMLInputElement= document.getElementById("messageInput") as HTMLInputElement;
        let messageBody = messageInput?.value;
        if (messageBody !== undefined){
          dispatch(SendMessage({gameId, messageBody, chatId, playerId}))
          messageInput.value = ""
        }
    }

    React.useEffect(() => {
      const messageInput : HTMLInputElement= document.getElementById("messageInput") as HTMLInputElement;
      messageInput.addEventListener( 'keyup', event => {
        if( event.code === 'Enter' ) sendMessage();
      });
    },[])

    return (
      <div className="border border-black rounded-lg px-2 py-2 bg-zinc-50 flex flex-col h-60 absolute right-10 bottom-5 w-[300px]">
        <h1 className="text-black text-center">Chat</h1>
        <MessageBox />
        <div className="flex justify-between items-center align-middle w-full">
            <input id="messageInput" type="text" autoComplete="off" className="text-black rounded w-4/5 p-2 border border-gray-400 focus:outline-none"/>
            <button id="sendBtn" onClick={sendMessage} className="text-black rounded text-center text-3xl w-1/5 flex justify-center align-middle"><BiSolidSend  /></button>
        </div>
      </div>
    );
  };
  
  export default Chat;