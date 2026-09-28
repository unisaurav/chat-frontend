import { useCallback, useMemo } from "react";
import useUserSearchStore from "../../store/useUserSearchStore";
import "./RecentChats.scss";
const RecentChats = ({ userSearching }: { userSearching: boolean }) => {
  const searchUserResult = useUserSearchStore((state) => state.searchUsers);
  const emptyArray = Array.from({ length: 5 });

  const renderCards = useMemo(() => {
    if (userSearching && searchUserResult.length == 0) {
      return <div> No Records found </div>;
    }
    if (userSearching && searchUserResult.length > 0) {
      return searchUserResult.map((item) => {
        return (
          <div className="recent-contact-card" key={item.id}>
            {item.username}
          </div>
        );
      });
    } else {
      return emptyArray.map((item,key) => {
        return <div className="recent-contact-card" key={key}>{"test"+ key}</div>;
      });
    }
  }, [searchUserResult, emptyArray]);

  return <div className="recent-chats">{renderCards}</div>;
};
export default RecentChats;
