import { Link } from "react-router-dom";

/** Components */
import CustomButton from "./components/button";

/** Views */
import Home from "./routes/home";

export default function App() {
  return (
    <div>      
      <nav>
        <CustomButton>
          <Link to="/login">iniciar sesion</Link>
        </CustomButton>
      </nav>
      <main className="flex-container">
        <Home/>
      </main>
    </div>
  );
}