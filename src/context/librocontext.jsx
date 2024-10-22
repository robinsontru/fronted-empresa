import { createContext, useContext, useEffect, useState } from "react";
import { deletelibro, getidlibro, getlibro, postibro } from "../api/libro";
import Swal  from "sweetalert2";

const libroContext = createContext();

export const useLibros = () => {
  const context = useContext(libroContext);
  if (!context) {
    throw new Error("useLibros must be used within a LibroProvider"); // Fixed typo in provider name
  }
  return context;
};

export function LibroProvider({ children }) {
  const [libros, setLibros] = useState([]);

  const mirarlibro = async () => {
    try {
      const res = await getlibro();
      setLibros(res.data);
      console.log(res.data);
    } catch (error) { }
  };

  const eliminarlibro = async (id) => {
    const res = await deletelibro(id);
    try {
      mirarlibro();
      setLibros(res.data);
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Libro eliminado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) { }
  };

  const buscarlibro = async (id) => {
    try {
      const res = await getidlibro(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching book:", error);
      return null; // Devuelve null en caso de error
    }
  };


  useEffect(() => {
    mirarlibro();
  }, []);

  return (
    <libroContext.Provider
      value={{
        libros,
        mirarlibro: mirarlibro,
        eliminarlibro: eliminarlibro,
        buscarlibro: buscarlibro,
      }}
    >
      {children}
    </libroContext.Provider>
  );
}
