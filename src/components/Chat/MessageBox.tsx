import { useAppSelector } from "../../redux/hooks";
import { IMessages } from "../../types/game.typing";

const MessageBox = () => {
    const messages = useAppSelector((state) => state.game.Data?.Chat.Messages);
    return (
    <div id="chatBox" className="h-full overflow-y-scroll">
        {Array.isArray(messages) &&
              messages.map((message: IMessages) => (
                <div className="flex justify-between w-full">
                    <p className="w-3/4 break-words">{message.Player.UserName}: {message.MessageBody}</p>
                    <p>{message.DateTime.slice(message.DateTime.indexOf("T") + 1, message.DateTime.indexOf("."))}</p>
                </div>
              ))}
    </div>
    );
  };
  
  export default MessageBox;