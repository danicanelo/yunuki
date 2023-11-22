import { Route, Routes } from "react-router";
import { Login } from "./auth/screens/login";
import { PasswordForgotten } from "./auth/screens/password-forgotten";
import { Register } from "./auth/screens/register";
import { CreateYunuki } from "./createYunuki";
import { YunukiStage } from "./yunukiStage";

function App() {
  return (
    <div className="columns">
      <div className="column">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/password-forgotten" element={<PasswordForgotten />} />
          <Route path="/create-yunuki" element={<CreateYunuki />} />
          <Route path="/yunuki" element={<YunukiStage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
