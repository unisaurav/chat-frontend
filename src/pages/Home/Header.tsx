import type { NavigateFunction } from "react-router-dom";
import { logout } from "../../helper/Logout";
import { LogOut } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { BASE_URL, FIND_USER } from "../../constants/AppConstants";
import useUserStore from "../../store/useUserStore";

const Header = ({
  navigate,
  setUserSearching,
}: {
  navigate: NavigateFunction;
  setUserSearching: (value: boolean) => void;
}) => {
  const userDetails = useAuthStore((state) => state.userDetails);
  const setSearchUser = useUserStore((state) => state.setSearchUsers);
  const [findUser, setFindUser] = useState<string>("");
  useEffect(() => {
    let timer: number;
    const controller: AbortController = new AbortController();
    const findUserApi = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}${FIND_USER}${findUser.trim()}`,
          { signal: controller.signal, withCredentials: true },
        );
        if (response.statusText === "OK") {
          setSearchUser(response.data.data);
        }
      } catch (e) {
        if (isAxiosError(e)) {
          console.log("Error calling din user api", e);
        }
      }
    };
    if (findUser.trim().length >= 0) {
      timer = setTimeout(() => {
        findUserApi();
      }, 500);
    }

    return () => {
      if (controller) {
        controller.abort();
      }
      clearTimeout(timer);
    };
  }, [findUser]);

  const checkAndSetUserSearch = (value?: string) => {
    if (value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      value.trim().length > 0 && setUserSearching(true);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      findUser.trim().length > 0 && setUserSearching(true);
    }
  };

  return (
    <div className="chat-header">
      <input
        className="header-search"
        placeholder="Find to Chat"
        onChange={(e) => {
          setFindUser(e.target.value);
          checkAndSetUserSearch(e.target.value);
        }}
        onFocus={() => {
          checkAndSetUserSearch();
        }}
        onBlur={() => findUser.trim().length == 0 && setUserSearching(false)}
      ></input>
      <div className="logout-and-username">
        <label className="header-label">{`@${userDetails?.username}`}</label>
        <LogOut onClick={() => logout(navigate)} className="icon-style" />
      </div>
    </div>
  );
};
export default Header;
