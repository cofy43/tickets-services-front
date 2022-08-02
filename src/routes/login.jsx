import { Link } from "react-router-dom";

/** Components */
import CustomButton from "../components/button";

export default function Login() {
  return (
    <div>
      <nav>
        <CustomButton>
          <Link to="/">cerrar sesión</Link>
        </CustomButton>
      </nav>
      <main>Login</main>
    </div>
  );
}
