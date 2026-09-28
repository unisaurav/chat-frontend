import { useFormik } from "formik";
import Button from "../../component/Button/Button";
import "./Login.scss";
import validateLogin from "./LoginValidation";
import axios from "axios";
import { BASE_URL, LOGIN_URL } from "../../constants/AppConstants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

type LoginDetails = {
  username: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const setUserDetails = useAuthStore((state) => state.setUserDetails);

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    submitCount,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    validate: (values) => {
      return validateLogin(values);
    },
    onSubmit: (values) => {
      logUserIn(values);
    },
  });
  const [serverError, setServerError] = useState("");
  const logUserIn = async (values: LoginDetails) => {
    setServerError("");
    try {
      const response = await axios.post(`${BASE_URL}${LOGIN_URL}`, values, {
        withCredentials: true,
      });
      if (response.status == 200) {
        setUserDetails(response.data.data.user);
        navigate("/home", { replace: true });
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setServerError(e.response?.data?.error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        {serverError && <label>{`${serverError}`}</label>}
        {errors.username && submitCount > 0 && <label>{errors.username}</label>}
        <input
          placeholder="Username"
          name="username"
          type="text"
          autoComplete="on"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
      </div>
      <div className="input-container">
        {errors.password && submitCount > 0 && <label>{errors.password}</label>}
        <input
          placeholder="Password*"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
      </div>
      <Button onClick={handleSubmit}>{"Login"}</Button>
    </div>
  );
};
export default Login;
