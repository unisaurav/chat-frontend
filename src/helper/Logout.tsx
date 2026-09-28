import axios from "axios";
import { BASE_URL, LOGOUT } from "../constants/AppConstants";
import type { NavigateFunction } from "react-router-dom";

export const logout = async (navigate: NavigateFunction) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${LOGOUT}`,
      {},
      { withCredentials: true },
    );
    if (response.status == 204) {
      console.log("UserLogged Out");
      navigate("/");
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data);
    }
  }
};
