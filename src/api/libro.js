import axios from "axios";


export const getlibro = async () => axios.get("https://backen-empresa.onrender.com/api/mirar");

export const deletelibro = async (id) => axios.delete(`https://backen-empresa.onrender.com/api/eliminar/${id}`);


export const postibro = async (post) => axios.post("https://backen-empresa.onrender.com/api/crear", post);



export const getidlibro = async (id) => axios.get(`https://backen-empresa.onrender.com/api/buscar/${id}`);
