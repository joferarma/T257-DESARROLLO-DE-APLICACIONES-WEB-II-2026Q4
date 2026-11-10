
import { useRecetas } from "../context/RecetasContext";

import Inicio from "./Inicio";
import FormularioReceta from "./FormularioReceta";
import ListaRecetas from "./ListaRecetas";
import BuscarReceta from "./BuscarReceta";
import DetalleReceta from "./DetalleReceta";

export default function PantallaPrincipal() {
  const { pantalla } = useRecetas();

  if (pantalla === "agregar") {
    return <FormularioReceta />;
  }

  if (pantalla === "lista") {
    return <ListaRecetas />;
  }

  if (pantalla === "buscar") {
    return <BuscarReceta />;
  }

  if (pantalla === "detalle") {
    return <DetalleReceta />;
  }

  return <Inicio />;
}
