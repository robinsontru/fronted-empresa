import axios from "axios";


export const getlibro = async () => axios.get("https://********/api/mirar");

export const deletelibro = async (id) => axios.delete(`https://********/api/eliminar/${id}`);

export const getidlibro = async (id) => axios.get(`https://********/api/buscar/${id}`);
