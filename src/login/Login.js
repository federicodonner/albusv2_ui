import React, { useState, useEffect, useRef } from "react";
import Loader from "../loader/Loader";
import albusClaseLogo from "../images/albus-clase-logo.png";
import { accessAPI } from "../utils/fetchFunctions";

export default function Login(props) {
  const [loader, setLoader] = useState(true);
  const [loaderAlumnos, setLoaderAlumnos] = useState(false);
  // materias stores the list of materias
  const [materias, setMaterias] = useState([]);
  // selectedMateria stores the class after the user has selected it
  const [selectedMateria, setSelectedMateria] = useState(null);
  // alumnosFromMateria stores the alumnos from the chosen materia
  const [alumnosInMateria, setAlumnosInMateria] = useState([]);
  // selectedAlumno stores the alumno after the user has selected it
  const [selectedAlumno, setSelectedAlumno] = useState(null);

  const materiaSelector = useRef(-1);
  const alumnoSelector = useRef(-1);

  // Cuando carga el componente, trae la lista de clases
  useEffect(() => {
    console.log(props);
    accessAPI(
      "GET",
      "operacionesalumno/materia",
      null,
      (response) => {
        setMaterias(response);
      },
      (respuesta) => {
        console.log(respuesta);
      }
    );
  }, []);

  // When the materias are loaded, turn off the loader
  useEffect(() => {
    if (materias) {
      setLoader(false);
    }
  }, [materias]);

  // When the loader is turned off by any reason, if there is a selected materia
  // set it on the selector
  useEffect(() => {
    if (!loader && selectedMateria) {
      materiaSelector.current.value = selectedMateria;
    }
  }, [loader, selectedMateria]);

  // When the materia is selected, fetch the students
  useEffect(() => {
    if (selectedMateria) {
      //Turns on the loader
      setLoaderAlumnos(true);
      // Fetches the alumnos
      accessAPI(
        "GET",
        `operacionesalumno/materia/${selectedMateria}`,
        null,
        (response, status) => {
          if (status === 204) {
            setLoaderAlumnos(false);
            setAlumnosInMateria([]);
          } else {
            setAlumnosInMateria(response);
            setLoaderAlumnos(false);
          }
        },
        (response) => {
          alert(response.message);
          setLoaderAlumnos(false);
        }
      );
    }
  }, [selectedMateria]);

  return (
    <div className="section">
      <header className="flexContainer vertical">
        <img className="logo centered" src={albusClaseLogo} alt="logo" />
      </header>
      <main>
        {loader && <Loader>Cargando Albus</Loader>}
        {!loader && (
          <div className="flexContainer vertical">
            <div className="recuadro flexContainer vertical centered">
              <div className="message large centered">
                Busca tu nombre en la lista
              </div>
              {materias && (
                <select
                  name="materias"
                  id="materias"
                  defaultValue={-1}
                  ref={materiaSelector}
                  className="centered prettyInput"
                  onChange={() => {
                    setSelectedMateria(materiaSelector.current.value);
                  }}
                >
                  <option value="-1" disabled="disabled">
                    Selecciona tu materia
                  </option>
                  {materias.map((materia) => {
                    return (
                      <option value={materia.id} key={materia.id}>
                        {materia.nombre}
                      </option>
                    );
                  })}
                </select>
              )}
              {selectedMateria && loaderAlumnos === true && (
                <Loader small={true}>Cargando alumnos</Loader>
              )}
              {selectedMateria &&
                alumnosInMateria.length > 0 &&
                loaderAlumnos === false && (
                  <>
                    <select
                      name="alumnos"
                      id="alumnos"
                      defaultValue={-1}
                      ref={alumnoSelector}
                      className="centered prettyInput"
                      onChange={() => {
                        setSelectedAlumno(alumnoSelector.current.value);
                      }}
                    >
                      <option value="-1" disabled={true}>
                        Selecciona tu nombre
                      </option>
                      {alumnosInMateria.map((alumno) => {
                        return (
                          <option value={alumno.id} key={alumno.id}>
                            {alumno.nombre + " " + alumno.apellido}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      type="button"
                      className={
                        selectedAlumno
                          ? "confirm centered"
                          : "confirm centered disabled"
                      }
                    >
                      Ingresar
                    </button>
                    <div className="blueSection flexContainer vertical">
                      <div className="message centered">
                        ¡Hey, no estoy en la lista!
                      </div>
                      <button type="button" className="centered">
                        Crear usuario
                      </button>
                    </div>
                  </>
                )}
              {selectedMateria &&
                alumnosInMateria.length === 0 &&
                loaderAlumnos === false && (
                  <div className="blueSection flexContainer vertical">
                    <div className="message centered">
                      La materia seleccionada no tiene alumnos
                    </div>
                    <button
                      type="button"
                      className="centered"
                      onClick={() => {
                        props.history.push("/register");
                      }}
                    >
                      Crear usuario
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
