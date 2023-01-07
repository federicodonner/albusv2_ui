import React, { useState, useEffect } from "react";
import FormularioCampo from "./FormularioCampo";

export default function Formulario(props) {
  const [formulario] = useState(props.config);
  const [contenidoCampos, setContenidoCampos] = useState({});
  const [estadoCampos, setEstadoCampos] = useState([]);

  // Al inicializar el formulario, crea un objeto por cada campo
  // con el nombre para ingresar el valor dinámicamente
  // Esto facilita luego el callback de submit, ya se entrega
  // un objeto listo para usar
  useEffect(() => {
    let contenidoCamposInicial = {};
    formulario.campos.forEach((campo, indice) => {
      contenidoCamposInicial[campo.nombre] = null;
    });
    setContenidoCampos(contenidoCamposInicial);
  }, [formulario]);

  // Función llamada en cada update de un campo, lo actualiza
  // en el padre para poder tener los datos para el submit
  function actualizarContenidoCampo(indice, contenido) {
    let contenidoActual = { ...contenidoCampos };
    contenidoActual[formulario.campos[indice].nombre] = contenido;
    setContenidoCampos(contenidoActual);
    // Si un campo es requerido, está en error y ahora tiene contenido
    // se actualiza el estado
    if (
      estadoCampos[indice] === "error" &&
      contenidoActual[formulario.campos[indice].nombre]
    ) {
      let estadoActual = [...estadoCampos];
      estadoActual[indice] = "";
      setEstadoCampos(estadoActual);
    }
  }

  // Cuando se submittea el formulario, se verifica
  // que los campos obligatorios tengan datos
  function formSubmit(e) {
    e.preventDefault();
    let camposOk = true;
    let estadoCamposActual = [];
    let error;
    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    formulario.campos.forEach((campo, indice) => {
      // Si algún campo requerido no tiene contenido
      if (
        campo.requerido &&
        (contenidoCampos[formulario.campos[indice].nombre] === null ||
          contenidoCampos[formulario.campos[indice].nombre] === "")
      ) {
        // Marca el flag como false para no submittear
        camposOk = false;
        estadoCamposActual[indice] = "error";
        error = "Falta completar algunos campos";
      }
      // Verifica que el campo email tenga formato de email
      if (
        campo.tipo === "email" &&
        contenidoCampos[formulario.campos[indice].nombre] &&
        !contenidoCampos[formulario.campos[indice].nombre].match(emailRegEx)
      ) {
        camposOk = false;
        estadoCamposActual[indice] = "error";
        error = "El email no tiene formato correcto";
      }
    });
    if (!camposOk) {
      setEstadoCampos(estadoCamposActual);
      alert(error);
      return;
    }
    formulario.submit.callback(contenidoCampos);
  }

  // Cuando el usuario presiona cancelar, llama al callback del config
  function cancelOnClick() {
    formulario.cancelar.callback();
  }

  return (
    <div>
      <div>
        <form onSubmit={formSubmit}>
          {formulario.campos.map((campo, index) => {
            return (
              <FormularioCampo
                onUpdate={actualizarContenidoCampo}
                campo={campo}
                estado={estadoCampos[index]}
                index={index}
                key={index}
              />
            );
          })}
          {formulario.submit && (
            <button type="submit" className="blue">
              {formulario.submit.etiqueta}
            </button>
          )}
          {formulario.cancelar && (
            <button
              type="button"
              className="red noBorder"
              onClick={cancelOnClick}
            >
              {formulario.cancelar.etiqueta}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
