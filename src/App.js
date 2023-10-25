import { Login } from "./auth/screens/login";
import { Register } from "./auth/screens/register";

function App() {
  return (
      <div className="columns">
        <div className="column">
            <Login />
            <Register />
        </div>
      </div>
  );
}

export default App;
