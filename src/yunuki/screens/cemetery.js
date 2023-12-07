import { Grave } from "../../core/components/grave";
import { Navbar } from "../../core/components/navbar";
import "../css/grave.css";

export function Cemetery() {
  return (
    <div>
      <Navbar />
      <div className="section">
        <div className="container is-flex-direction-row">
          <Grave />
          <Grave />
        </div>
      </div>
    </div>
  );
}
