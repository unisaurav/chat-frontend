import axios from "axios";
import { BASE_URL, SEND_MESSAGE } from "../constants/AppConstants";
import useUserStore from "../store/useUserStore";

type MessageReceipt = {
  messageId: string;
  userId: string;
  deliveredAt: string | null;
  readAt: string | null;
};
type ChatMessage = {
  id: string;
  conversationId: string;
  sender: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string | null;
  };
  text: string | null;
  replyToId: string | null;
  createdAt: string;
  editedAt: string | null;
  deletedAt: string | null;
  receipts: MessageReceipt[];
};

type ChatMessageArray = {
  text: string;
  self: boolean;
  id?: string
};

const getMessages = async (conversationId: string, theirId: string) => {
  let listOfMsg: ChatMessageArray[] | undefined;
  const store = useUserStore.getState();
  if (conversationId) {
    try {
      const response = await axios.get(
        `${BASE_URL}${SEND_MESSAGE}`.replace("conversation_id", conversationId),
        { withCredentials: true },
      ); // SAME AS SEND BUT GET
      if (response.status === 200) {
        listOfMsg = response.data.data.map((item: ChatMessage) => {
          return {
            text: item.text,
            self: item.sender.id == theirId ? false : true,
            id:item.id
          };
        });
        store.setChatMessage(listOfMsg ?? []);
      }
    } catch (e) {}
  }
};
export default getMessages;
