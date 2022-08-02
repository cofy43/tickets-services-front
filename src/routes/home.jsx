import React, { useState } from "react";

/** Components */
import CustomButton from "../components/button";
import CustomCard from "../components/card";
import CustomInput from "../components/input";
import CustomModalMessage from "../components/modalMessage";

/** API */
import { createATicket } from "../api/tickets";

const defaultValues = {
  name: "",
  fatherLastName: "",
  motherLastName: "",
  email: "",
  phone: "",
};

export default function Home() {
  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("texto de ejemplo");
  const [successResponse, setSuccessResponse] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  async function create() {    
    let res = await createATicket({client: formValues});
    setMessage(res.message);
    setSuccessResponse(res.ok);
    if (res.ok) {
      resetValues();
    }
    setOpen(true);
  }

  function resetValues() {
    setFormValues(defaultValues);
  }

  function validForm() {
    return (
      formValues.name.length > 0 &&
      formValues.fatherLastName.length > 0 &&
      formValues.motherLastName.length > 0 &&
      (formValues.email.length > 0 || formValues.phone.length > 0)
    );
  }

  return (
    <CustomCard width={"800px"} className="inner-element">
      <div className="header-card">
        <h1>¿Tuviste algún problema?</h1>
        <h2>Cuentanos</h2>
      </div>
      <div className="content-card">
        <div className="row">
          <div className="column">
            <CustomInput
              name="name"
              onChange={handleInputChange}
              required={true}
              label="Nombre"
            />
          </div>
          <div className="column">
            <CustomInput
              name="fatherLastName"
              onChange={handleInputChange}
              required={true}
              label="Apellido Paterno"
            />
          </div>
          <div className="column">
            <CustomInput
              name="motherLastName"
              onChange={handleInputChange}
              required={true}
              label="Apellido Materno"
            />
          </div>
        </div>
        <div className="row">
          <div className="column">
            <CustomInput
              name="phone"
              onChange={handleInputChange}
              required={false}
              type="tel"
              pattern="[+ 0-9]{12}"
              label="Número telefónico"
            />
          </div>
          <div className="column">
            <CustomInput
              name="email"
              onChange={handleInputChange}
              required={false}
              label="Correo electrónico"
            />
          </div>
          <div className="column" style={{ marginBottom: "45px" }}>
            <CustomButton
              disable={!validForm()}
              type="submit"
              onClick={() => create()}
              widht={"100%"}
            >
              Enviar
            </CustomButton>
          </div>
        </div>
        <CustomModalMessage
          successAction={successResponse}
          message={message}
          open={open}
          onClose={() => setOpen(false)}
          title="modal titulo"
          contet={message}
        />
      </div>
    </CustomCard>
  );
}
