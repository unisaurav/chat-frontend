import axios from "axios";
import { useEffect, useState, type ComponentType } from "react";
import { AUTH, BASE_URL } from "../constants/AppConstants";
import useAuthStore from "../store/useAuthStore";

const withAuth = <p extends object>(WrappedComponent: ComponentType<p>) => {
  return (props: p) => {
    const [withAuth, setWithAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const setUserDetails = useAuthStore((state) => state.setUserDetails);

    useEffect(() => {
      const controller: AbortController = new AbortController();

      const checkAuth = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}${AUTH}`, {
            withCredentials: true,
            signal: controller.signal,
          });
          if (response.status === 200) {
            if (!controller.signal.aborted) {
              setUserDetails(response.data.data.user);
              setWithAuth(true);
            }
          }
        } catch (e) {
          setWithAuth(false);
          if (axios.isAxiosError(e)) {
            !axios.isCancel && console.log("Error from axios ");
          }
        } finally {
          setLoading(false);
        }
      };

      checkAuth();

      return () => {
        controller.abort();
      };
    }, []);

    if (loading) {
      return <div>Its loading.....</div>;
    }
    //navigate if auth is false later...
    return withAuth ? <WrappedComponent {...props} /> : <div>Not Auth</div>;
  };
};
export default withAuth;
