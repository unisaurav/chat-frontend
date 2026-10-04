import axios from "axios";
import { BASE_URL, RECENT_CONVERSATION } from "../constants/AppConstants";
import useUserStore from "../store/useUserStore";

const fetchRecentConversation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${RECENT_CONVERSATION}`, {
      withCredentials: true,
    });

    useUserStore.getState().setRecentConversation(response.data.data);
  } catch (e) {
    console.log(e);
  }
};
export default fetchRecentConversation;
