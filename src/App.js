import { Route, Routes } from "react-router";
import { Login } from "./auth/screens/login";
import { Register } from "./auth/screens/register";
import { CreateYunuki } from "./createYunuki";
import { YunukiStage } from "./yunukiStage";
import { PasswordForgotten } from "./auth/screens/password-forgotten";

function App() {
  return (
    <div className="columns">
      <div className="column">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-forgotten" element={<PasswordForgotten />} />
          <Route path="/create-yunuki" element={<CreateYunuki />} />
          <Route path="/yunuki" element={<YunukiStage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
