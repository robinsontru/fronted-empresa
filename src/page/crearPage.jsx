import { useEffect, useState } from "react";
import { useLibros } from "../context/librocontext";
import axios from "axios";
import Nav from "../componentes/nav";

function Crearpage() {
    const { libros } = useLibros();
    const [nombre, setNombreLibro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://backen-empresa.onrender.com/api/crear",
                { nombre },
                {
                    headers: {
                        "Content-Type": "application/json", // Cambia el tipo de contenido
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setNombreLibro(""); // Reinicia el campo de entrada
        }
    };

    return (
        <main className="">
            <Nav></Nav>
            <div className="formulario">
                <h1 className="titulo">Bienvenidos a tu biblioteca</h1>
            </div>

            <div className="cards">
                <div className="card-body " style={{ width: "15rem" }}>
                    <div>
                        <h5 class="card-title"> Ingresa el nombre de tu libro favorito</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary"></h6>
                        <form onSubmit={handleSubmit}>
                            <div class="input-group input-group-sm mb-3">
                                <input type="text" id="nombre" name="nombre" className="btningreso" placeholder="Nombre del libro" value={nombre}
                                    onChange={(e) => setNombreLibro(e.target.value)} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                            </div>
                            <button class="btn btn-success" type="submit" disabled={!nombre}>
                                Enviar
                            </button>

                        </form>
                    </div>
                </div>
            </div>


        </main>
    );
}

export default Crearpage;
