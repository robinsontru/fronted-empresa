import axios from "axios";


export const getlibro = async () => axios.get("https://jsonplaceholder.typicode.com/posts");

export const deletelibro = async (id) => axios.delete(`https://backen-empresa.onrender.com/api/eliminar/${id}`);


// export const postibro = async (post) => axios.post("https://backen-empresa.onrender.com/api/crear", post,
//     {
//         headers: {
//             "Content-Type": "application/json", // Asegúrate de enviar como JSON
//         },
//     }
// );



export const getidlibro = async (id) => axios.get(`https://backen-empresa.onrender.com/api/buscar/${id}`);
