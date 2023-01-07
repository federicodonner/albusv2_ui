import React, { useRef } from "react";

export default function FormularioCampo(props) {
  const campoRef = useRef();

  // Cuando cambia el campo, actualiza el padre
  function campoOnChange() {
    props.onUpdate(props.index, campoRef.current.value);
  }

  return (
    <div>
      <div>{props.campo.etiqueta}</div>
      {(props.campo.tipo === "texto" || props.campo.tipo === "email") && (
        <input
          type="text"
          onChange={campoOnChange}
          className={`${props.estado} prettyInput`}
          ref={campoRef}
        />
      )}
      {props.campo.tipo === "password" && (
        <input
          type="password"
          onChange={campoOnChange}
          className={`${props.estado} prettyInput`}
          ref={campoRef}
        />
      )}
      {props.campo.tipo === "numero" && (
        <input
          type="number"
          onChange={campoOnChange}
          className={`${props.estado} prettyInput`}
          ref={campoRef}
        />
      )}
    </div>
  );
}
