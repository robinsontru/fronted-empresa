import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importa useParams
import { useLibros } from "../context/librocontext";
import "../App.css";
import Nav from "../componentes/nav";

function Buscarpage() {
  const { id } = useParams(); // Obtén el ID desde los parámetros de la URL
  const { buscarlibro } = useLibros();
  const [libro, setLibros] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await buscarlibro(id);
          setLibros(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, buscarlibro]);

  return (
    <main>
      <Nav />

      <div className="card-container">
        {libro ? (
          <div className="card-body" style={{ width: "18rem" }} key={libro.id}>
            <h5 className="nombre2">Numero de identificacion de tu libro</h5>
            <p>{libro.id}</p>
            <h5 className="nombre2">Nombre de tu libro favorito</h5>
            {/* </Link> */}
            <p className="card-text">{libro.nombre}</p>
          </div>
        ) : (
          <p>No hay libros disponibles.</p>
        )}
      </div>
    </main>
  );
}

export default Buscarpage;
