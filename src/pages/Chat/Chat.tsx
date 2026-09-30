import React, { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore";
import "./Chat.scss";
import { BASE_URL } from "../../constants/AppConstants";
import { io, Socket } from "socket.io-client";
import { SendHorizonal } from "lucide-react";

const Chat = () => {
  const chattingWith = useUserStore((state) => state.chatWith);
  const [ws,setWs] = useState<Socket|null>(null)
  useEffect(() => {
    const socket = io(BASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
    const handelConnect = () => {
      console.log("WebSocket connected:", socket.id);
      setWs(socket);
    };
    socket.on("connect", handelConnect);

    return () => {
      socket.off("connect", handelConnect);
      socket.disconnect();
    };
  }, []);

  const sendMessage = ()=>{
      if(ws){
        ws.send()
      }
  }

  return (
    <div className="chat-container">
      <div>{chattingWith?.id}</div>
      <div className="message-and-sent">
        <input className="chat-input"></input>
        <SendHorizonal
          style={{ color: "blue", cursor: "pointer" }}
          type="button"
          onClick={() => console.log("sent ")}
        >
          {"sendMessage"}{" "}
        </SendHorizonal>
      </div>
    </div>
  );
};
export default React.memo(Chat);
