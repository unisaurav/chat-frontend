import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import withAuth from "../hoc/withAuth";

const Login = lazy(() => import("../pages/Login/Login"));
const Registration = lazy(() => import("../pages/Registration/Registration"));
const Home = withAuth(lazy(() => import("../pages/Home/Home")));
const AppRouter = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/reg" element={<Registration />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Suspense>
  );
};
export default AppRouter;
