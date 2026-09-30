import { useNavigate } from "react-router-dom";
import Chat from "../Chat/Chat";
import RecentChats from "../RecentChats/RecentChats";
import "./Home.scss";
import Header from "./Header";
import React, { useState } from "react";
const Home = () => {
  const navigate = useNavigate();
  const [userSearching, setUserSearching] = useState(false);
  return (
    <div className="home-container">
      <Header navigate={navigate} setUserSearching={setUserSearching} />
      <div className="home-inner">
        <RecentChats userSearching={userSearching} />
        <Chat />
      </div>
    </div>
  );
};
export default React.memo(Home);
