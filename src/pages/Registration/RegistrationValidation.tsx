import { isRequired } from "../../helper/ValidationHelper";

type RegistrationType = {
  username: string;
  name: string;
  password: string;
};

const validateRegistration = (values: RegistrationType) => {
  const error: any = {};

  if (values.name.trim().length == 0) {
    error.name = isRequired("Name");
  }
  if (values.username.trim().length == 0) {
    error.username = isRequired("Username");
  }
  if (values.password.trim().length == 0) {
    error.password = isRequired("Password");
  }
  if (!Object.hasOwn(error, "password") && values.password.trim().length < 8) {
    error.password = "Password should be more than 8 chars.";
  }
  return error;
};

export default validateRegistration;
