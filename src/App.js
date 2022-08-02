import { Link } from "react-router-dom";

/** Components */
import CustomButton from "./components/button";
import CustomCard from "./components/card";
import CustomInput from "./components/input";

export default function App() {
  return (
    <div>      
      <nav>
        <CustomButton>
          <Link to="/login">iniciar sesion</Link>
        </CustomButton>
      </nav>
      <main className="flex-container">
        <CustomCard width={"800px"} className="inner-element">
          <div className="header-card">
            <h1>¿Tuviste algún problema?</h1>
            <h2>Cuentanos</h2>
          </div>
          <div className="content-card">
            <div className="row">
              <div className="column"> <CustomInput label="Nombre"/> </div>
              <div className="column"> <CustomInput label="Apellido Paterno"/> </div>
              <div className="column"> <CustomInput label="Apellido Materno"/> </div>
            </div>
            <div className="row">
              <div className="column"> <CustomInput label="Número telefónico"/> </div>
              <div className="column"> <CustomInput label="Correo electrónico"/> </div>
              <div className="column" style={{marginBottom:"45px"}}> <CustomButton widht={"100%"}>Enviar</CustomButton> </div>
            </div>
          </div>
        </CustomCard>
      </main>
    </div>
  );
}