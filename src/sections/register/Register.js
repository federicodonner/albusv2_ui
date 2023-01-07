import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../elements/loader/Loader";
import Formulario from "../../elements/formulario/Formulario";
import albusClaseLogo from "../../images/albus-clase-logo.png";
import { accessAPI } from "../../utils/fetchFunctions.js";

export default function Register() {
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  // Carga el id de la materia desde la URL
  const { materiaId } = useParams();

  const formConfig = {
    campos: [
      { nombre: "nombre", tipo: "texto", etiqueta: "Nombre", requerido: true },
      {
        nombre: "apellido",
        tipo: "texto",
        etiqueta: "Apellido",
        requerido: true,
      },
      { nombre: "mail", tipo: "email", etiqueta: "Email", requerido: true },
    ],
    submit: { callback: enviarForm, etiqueta: "Enviar" },
    cancelar: { callback: volverALogin, etiqueta: "Cancelar" },
  };

  // Callback a submit del formulario
  function enviarForm(fields) {
    setLoader(true);

    // Le agrega la materia id
    fields.materiaId = materiaId;

    accessAPI(
      "POST",
      "operacionesalumno/alumno",
      JSON.stringify(fields),
      (response) => {
        alert(response.message);
        navigate(`/activity/${response.alumnoId}`);
      },
      (response) => {
        setLoader(false);
        alert(response.message);
      }
    );
  }

  function volverALogin() {
    navigate("/");
  }

  return (
    <div className="section">
      <header className="flexContainer vertical">
        <img className="logo centered" src={albusClaseLogo} alt="logo" />
      </header>
      <main>
        {loader && <Loader>Creando alumno </Loader>}
        {!loader && (
          <div className="flexContainer vertical">
            <div className="recuadro  centered">
              <div className="recuadroContent flexContainer vertical centered">
                <div className="message large centered">
                  Registrate para utilizar<span className="albus"> Albus</span>
                </div>
                <Formulario config={formConfig} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
