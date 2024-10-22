import { useEffect, useState } from "react";
import { useLibros } from "../context/librocontext";
import axios from "axios";

import { Link } from "react-router-dom";
import Nav from "../componentes/nav";

function InicioPage() {
  const { mirarlibro, libros, eliminarlibro } = useLibros();
  const [loading, setLoading] = useState(true);
  const [nombre, setNombreLibro] = useState("");
  const [message, setMessage] = useState(""); // Estado para los mensajes

  const handleDelete = (id) => {
    eliminarlibro(id);
  };

  useEffect(() => {
    const loadTask = async () => {
      try {
        await mirarlibro();
      } catch (error) {
        console.error("Error al cargar los libros:", error);
        setMessage("Error al cargar los libros."); // Mensaje de error
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, []);

  return (
    <main className="">
      <Nav></Nav>
      <div className="formulario">
        <h1 className="titulo">Bienvenidos a tu biblioteca</h1>
      </div>

      <div className="card-container">
        {Array.isArray(libros) && libros.length > 0 ? (
          libros.slice(0).reverse().map((libro) => (
            <div className="card-body" style={{ width: "18rem" }} key={libro.id}>
              <Link to={`/buscar/${libro.id}`}>
                <h5 className="nombre2">{libro.id}</h5>
                <h7 className="nombre2">Nombre de tu libro favorito</h7>
                <p className="card-text text-light">{libro.nombre}</p>

              </Link>
              <div className="btn-group">
                <button
                  className="btn btneliminar"
                  type="button"
                  onClick={() => handleDelete(libro.id)}
                >
                  Eliminar
                </button>

                <Link to={`/editar/${libro.id}`}>
                  <p className="">Editar</p>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No books available</p>
        )}
      </div>

    </main>
  );
}

export default InicioPage;
