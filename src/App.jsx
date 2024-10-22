import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LibroProvider } from "./context/librocontext";
import Iniciopage from "./page/iniciopage";
import Buscarpage from "./page/buscarPage";
import Crearpage from "./page/crearPage";

function App() {
  return (
    <LibroProvider>
      <BrowserRouter>
        <main className="container content-container mx-auto px-10 md:px-0">
          <Routes>
            <Route path="/" element={<Iniciopage />} />
            <Route path="/buscar/:id" element={<Buscarpage />} />
            <Route path="/crear" element={<Crearpage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </LibroProvider>
  );
}

export default App;
