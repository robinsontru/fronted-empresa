import { useEffect, useState } from "react";
import { useLibros } from "../context/librocontext";
import axios from "axios";
import "../App.css";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre); // Usa el estado directamente

    try {
      const response = await axios.post(
        "http://localhost:3001/api/crear",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Error al agregar el libro."); // Mensaje de error
    } finally {
      setNombreLibro(""); // Reinicia el campo de entrada
    }
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

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!Array.isArray(libros)) {
    return <div>Error: No se pudieron cargar los libros.</div>;
  }

  return (
    <main className="">
      <Nav></Nav>
      <div className="formulario">
        <h1 className="titulo">Bienvenidos a tu biblioteca</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Ingresa el nombre de tu libro favorito:</p>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="btningreso"
              placeholder="Nombre del libro"
              value={nombre}
              onChange={(e) => setNombreLibro(e.target.value)}
            />
            <button type="submit" disabled={!nombre}>
              Enviar
            </button>
          </div>
        </form>
      </div>

      <div className="card-container">
        {libros.slice(0).reverse().map((libro) => (
          <div className="card-body" style={{ width: "18rem" }} key={libro.id}>
            <Link to={`/buscar/${libro.id}`}>
              <h5 className="nombre2">Nombre de tu libro favorito</h5>
            </Link>
            <p className="card-text">{libro.nombre}</p>
            <div className="btn-group">
              <button
                className="btn btneliminar"
                type="button"
                onClick={() => handleDelete(libro.id)}
              >
                Eliminar
              </button>
              <button className="btn btnupdate" type="button">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}

export default InicioPage;
