import "./Registration.scss";
import Button from "../../component/Button/Button";
import { useFormik } from "formik";
import axios from "axios";
import { BASE_URL, REGISTRATION_URL } from "../../constants/AppConstants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import validateRegistration from "./RegistrationValidation";
type RegistrationType = {
  username: string;
  name: string;
  password: string;
};

const Registration = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    values,
    handleBlur,
    submitCount,
    handleChange,
    handleSubmit,
    errors,
  } = useFormik({
    initialValues: {
      username: "",
      name: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: false,
    validate: (values) => {
      return validateRegistration(values);
    },
    onSubmit: (values) => {
      signUserIn(values);
    },
  });

  const signUserIn = async (values: RegistrationType) => {
    setServerError("");

    try {
      const response = await axios.post(
        `${BASE_URL}${REGISTRATION_URL}`,
        values,
      );
      if (response.status == 201) {
        navigate("/");
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
        {serverError && <label>{serverError}</label>}
      </div>
      <div className="input-container">
        {errors.username && submitCount > 0 && <label>{errors.username}</label>}
        <input
          placeholder="Username*"
          name="username"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        ></input>
      </div>
      <div className="input-container">
        {errors.name && submitCount > 0 && <label>{errors.name}</label>}

        <input
          placeholder="Full Name*"
          name="name"
          value={values.name}
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
        ></input>{" "}
      </div>
      <Button onClick={handleSubmit}>{"Registration"}</Button>
    </div>
  );
};
export default Registration;
