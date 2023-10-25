import { Route, Routes } from "react-router";
import { Login } from "./auth/screens/login";
import { Register } from "./auth/screens/register";

function App() {
  return (
      <div className="columns">
        <div className="column">
          <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
