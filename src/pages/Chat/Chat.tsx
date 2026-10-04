import React, { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore";
import "./Chat.scss";
import { BASE_URL, SEND_MESSAGE } from "../../constants/AppConstants";
import { io, Socket } from "socket.io-client";
import { SendHorizonal } from "lucide-react";
import axios, { isAxiosError } from "axios";
import fetchRecentConversation from "../../api/fetchRecentConversation";
import getMessages from "../../api/getMessages";

const Chat = () => {
  const chattingWith = useUserStore((state) => state.chatWith);
  const conversationId = useUserStore((state) => state.conversationId);
  const listOfMessages = useUserStore((state) => state.chatWith?.messages);
  const [message, setMessage] = useState<string>("");
  const setNewMessage = useUserStore((state) => state.setChatMessage);

  useEffect(() => {
    conversationId &&
      chattingWith?.id &&
      getMessages(conversationId, chattingWith?.id);
  }, [conversationId]);

  const sendMessageHandler = async () => {
    if (message.trim().length !== 0 && conversationId) {
      try {
        const response = await axios.post(
          `${BASE_URL}${SEND_MESSAGE}`.replace(
            "conversation_id",
            conversationId,
          ),
          { text: message },
          { withCredentials: true },
        );
        if (response.status == 201) {
          setNewMessage([
            {
              id: response.data.data.id,
              text: message,
              self: true,
            },
          ]);
          setMessage("");
          fetchRecentConversation();
        }
      } catch (e) {
        if (isAxiosError(e)) {
          console.log("Error sending message to", chattingWith?.name);
        }
      }
    }
  };

  const [ws, setWs] = useState<Socket | null>(null);

  return (
    <div className="chat-container">
      {chattingWith?.id && conversationId ? (
        <div className="message-and-sent">
          <input
            className="chat-input"
            value={message}
            placeholder={`Send Message to ${chattingWith.name}`}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <SendHorizonal
            style={{ color: "blue", cursor: "pointer" }}
            type="button"
            onClick={() => sendMessageHandler()}
          >
            {"sendMessage"}{" "}
          </SendHorizonal>
        </div>
      ) : (
        <div>nochat </div>
      )}
      <div className="display-chat">
        {listOfMessages?.map((item) => {
          if (item.self) {
            return (
              <div className="self-message" key={item.id}>
                {item.text}
              </div>
            );
          } else {
            return (
              <div className="not-self-message" key={item.id}>
                {item.text}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default React.memo(Chat);
