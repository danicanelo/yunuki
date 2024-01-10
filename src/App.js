import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import { YunukiStage } from "../src/yunuki/screens//yunukiStage";
import { CreateYunuki } from "../src/yunuki/screens/createYunuki";
import { Login } from "./auth/screens/login";
import { Register } from "./auth/screens/register";
import { Cemetery } from "./yunuki/screens/cemetery";

// Este es el componente principal de la aplicación, que utiliza todos nuestros componentes pensados como páginas para establecer las rutas correspondientes que dirijan a cada uno de ellos. Para ello hacemos uso de Route y Routes de la librería react-router. Establecemos también que cualquier otra ruta que no esté contemplada redirija a la pantalla de login mediante Navigate, de react-router-dom
function App() {
  return (
    <div className="columns">
      <div className="column">
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
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
