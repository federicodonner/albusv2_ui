import React, { useState, useEffect } from "react";
import Loader from "../loader/Loader";
import albusClaseLogo from "../images/albus-clase-logo.png";
export default function Register() {
  const [loader, setLoader] = useState(false);

  function enviarForm(e) {
    e.preventDefault();
    console.log("enviar form");
  }

  return (
    <div className="section">
      <header className="flexContainer vertical">
        <img className="logo centered" src={albusClaseLogo} alt="logo" />
      </header>
      <main>
        {!loader && (
          <div className="flexContainer vertical">
            <div className="recuadro flexContainer vertical centered">
              <div className="message large centered">
                Registrate para utilizar<span className="albus"> Albus</span>
              </div>
              <form onSubmit={enviarForm}>
                <div className="formLabel">Nombre:</div>
                <input type="text" className="prettyInput" />
                <div className="formLabel">Apellido:</div>
                <input type="text" className="prettyInput" />
                <div className="formLabel">Email:</div>
                <input type="text" className="prettyInput" />
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
