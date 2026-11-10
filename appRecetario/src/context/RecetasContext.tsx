
import React, { createContext, useContext, useState } from "react";
import PantallaPrincipal from "../components/PantallaPrincipal";

export interface Receta {
  id: number;
  nombre: string;
  ingredientes: string[];
  fecha: string;
}

interface RecetasContextoType {
  recetas: Receta[];
  pantalla: string;
  recetaSeleccionada: Receta | null;
  agregarReceta: (nombre: string, ingredientes: string[]) => void;
  eliminarReceta: (id: number) => void;
  buscarReceta: (id: number) => boolean;
  cambiarPantalla: (nombre: string) => void;
  volverInicio: () => void;
}

const RecetasContext = createContext<RecetasContextoType | undefined>(undefined);

export function RecetasProvider() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [ultimoId, setUltimoId] = useState(0);

  const [pantalla, setPantalla] = useState("inicio");
  const [recetaSeleccionada, setRecetaSeleccionada] =
    useState<Receta | null>(null);

  function agregarReceta(nombre: string, ingredientes: string[]) {
    const nuevaReceta: Receta = {
      id: ultimoId + 1,
      nombre: nombre,
      ingredientes: ingredientes,
      fecha: new Date().toLocaleDateString(),
    };

    setRecetas([...recetas, nuevaReceta]);
    setUltimoId(ultimoId + 1);
  }

  function eliminarReceta(id: number) {
    setRecetas(recetas.filter((receta) => receta.id !== id));
  }

  function buscarReceta(id: number) {
    const receta = recetas.find((receta) => receta.id === id);

    if (receta) {
      setRecetaSeleccionada(receta);
      setPantalla("detalle");
      return true;
    }

    return false;
  }

  function cambiarPantalla(nombre: string) {
    setRecetaSeleccionada(null);
    setPantalla(nombre);
  }

  function volverInicio() {
    setRecetaSeleccionada(null);
    setPantalla("inicio");
  }

  return (
    <RecetasContext.Provider
      value={{
        recetas,
        pantalla,
        recetaSeleccionada,
        agregarReceta,
        eliminarReceta,
        buscarReceta,
        cambiarPantalla,
        volverInicio,
      }}
    >
      <PantallaPrincipal />
    </RecetasContext.Provider>
  );
}

export function useRecetas() {
  const contexto = useContext(RecetasContext);

  if (!contexto) {
    throw new Error("useRecetas debe utilizarse dentro de RecetasProvider");
  }

  return contexto;
}
