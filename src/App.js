import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import { YunukiStage } from "../src/yunuki/screens//yunukiStage";
import { CreateYunuki } from "../src/yunuki/screens/createYunuki";
import { Login } from "./auth/screens/login";
import { PasswordForgotten } from "./auth/screens/password-forgotten";
import { Register } from "./auth/screens/register";
import { Cemetery } from "./yunuki/screens/cemetery";

function App() {
  return (
    <div className="columns">
      <div className="column">
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/password-forgotten" element={<PasswordForgotten />} />
          <Route path="/create-yunuki" element={<CreateYunuki />} />
          <Route path="/yunuki" element={<YunukiStage />} />
          <Route path="/cemetery" element={<Cemetery />} />
          <Route path="*" element={<Navigate replace to="/auth/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
