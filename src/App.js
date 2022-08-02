import { Link } from "react-router-dom";

/** Components */
import CustomButton from "./components/button";

export default function App() {
  return (
    <div>      
      <nav>
        <CustomButton>
          <Link to="/login">iniciar sesion</Link>
        </CustomButton>
      </nav>
    </div>
  );
}