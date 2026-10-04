import { useEffect, useMemo, useState } from "react";
import useUserStore from "../../store/useUserStore";
import "./RecentChats.scss";
import axios, { isAxiosError } from "axios";
import { BASE_URL, CONVERSATION_ID } from "../../constants/AppConstants";
import useAuthStore from "../../store/useAuthStore";
import fetchRecentConversation from "../../api/fetchRecentConversation";
const RecentChats = ({ userSearching }: { userSearching: boolean }) => {
  const searchUserResult = useUserStore((state) => state.searchUsers);
  const emptyArray = Array.from({ length: 5 });
  const setChatWith = useUserStore((state) => state.setChatWith);
  const setConversationId = useUserStore((state) => state.setConversationId);
  const recentConversation = useUserStore((state) => state.recentConversation);

  const userDetails = useAuthStore((state) => state.userDetails);

  useEffect(() => {
    fetchRecentConversation();
  }, []);

  const fetchConversationId = async (item: any) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${CONVERSATION_ID}`,
        { userId: item.id },
        { withCredentials: true },
      );

      if (response.statusText == "OK") {
        setConversationId(response.data.data.id);
        setChatWith(item);
      }
    } catch (e) {
      if (isAxiosError(e)) {
        console.log("Failed to Fetch conversation id");
      }
    }
  };

  const renderCards = useMemo(() => {
    if (userSearching && searchUserResult.length == 0) {
      return <div> No Records found </div>;
    }
    if (userSearching && searchUserResult.length > 0) {
      return searchUserResult.map((item) => {
        return (
          <div
            className="recent-contact-card"
            key={item.id}
            onClick={() => fetchConversationId(item)}
          >
            {item.username}
          </div>
        );
      });
    } else {
      return (
        recentConversation &&
        recentConversation.map((item, key) => {
          return (
            <div
              className="recent-contact-card"
              key={key}
              onClick={() => {
                fetchConversationId(
                  item.members[0].id == userDetails?.id
                    ? item.members[1]
                    : item.members[0],
                );
              }}
            >
              <h4 className="chat-name">{item?.name}</h4>
              <p>
                {item?.lastMessage?.text.length < 10
                  ? item?.lastMessage?.text
                  : item?.lastMessage?.text.slice(0, 20) + "..."}
              </p>
            </div>
          );
        })
      );
    }
  }, [searchUserResult, emptyArray]);

  return <div className="recent-chats">{renderCards}</div>;
};
export default RecentChats;
