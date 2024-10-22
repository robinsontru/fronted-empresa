import { useEffect, useState } from "react";
import { useLibros } from "../context/librocontext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../componentes/nav";
import Swal from "sweetalert2";

function Editarpage() {
    const { libros } = useLibros();
    const [nombre, setNombreLibro] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchLibro = async () => {
                try {
                    const response = await axios.get(`https://backen-empresa.onrender.com/api/libro/${id}`);
                    setNombreLibro(response.data.nombre);
                } catch (error) {
                    console.error("Error al cargar el libro", error);
                }
            };
            fetchLibro();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`https://backen-empresa.onrender.com/api/editar/${id}`, { nombre }, {
                    headers: { "Content-Type": "application/json" },
                });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Libro editado con éxito",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            navigate("/");
        } catch (error) {
            console.error("Error al guardar el libro", error);
        } finally {
            setNombreLibro("");
        }
    };

    return (
        <main>
            <Nav />
            <div className="formulario">
                <h1 className="titulo">Bienvenidos a tu biblioteca</h1>
            </div>

            <div className="cards">
                <div className="card-body" style={{ width: "15rem" }}>
                    <div>
                        <h5 className="card-title">
                            {id ? "Edita el nombre de tu libro favorito" : "Ingresa el nombre de tu libro favorito"}
                        </h5>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group input-group-sm mb-3">
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    className="btningreso form-control"
                                    placeholder="Nombre del libro"
                                    value={nombre}
                                    onChange={(e) => setNombreLibro(e.target.value)}
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                />
                            </div>
                            <button className="btn btn-success" type="submit" disabled={!nombre}>
                                {id ? "Guardar cambios" : "Enviar"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Editarpage;
