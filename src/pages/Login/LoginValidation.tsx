import { isRequired } from "../../helper/ValidationHelper";

type LoginType = {
  username: string;
  password: string;
};
type LoginErrors = Partial<Record<keyof LoginType, string>>;
const validateLogin = (values: LoginType) => {
  const error: LoginErrors = {};
  if (values.username.trim().length == 0) {
    error.username = isRequired("Username");
  }
  if (values.password.trim().length === 0) {
    error.password = isRequired("Password");
  }

  return error;
};
export default validateLogin;
