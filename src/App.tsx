import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import AppRouter from "./router/AppRouter";
const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
export default App;
