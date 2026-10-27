"use client";

import { useState } from "react";

type EstadoTarea = "Pendiente" | "En Proceso" | "Completada";

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: EstadoTarea;
}

export default function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [siguienteId, setSiguienteId] = useState(1);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [mensaje, setMensaje] = useState("");

  function agregarTarea(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (titulo.trim() === "" || descripcion.trim() === "") {
      setMensaje("Porfavor completar todos los campos.");
      return;
    }

    const nuevaTarea: Tarea = {
      id: siguienteId,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      estado: "Pendiente",
    };

    setTareas((tareasActuales) => [...tareasActuales, nuevaTarea]);

    setSiguienteId((idActual) => idActual + 1);

    setTitulo("");
    setDescripcion("");
    setMensaje("Tarea agregada correctamente.");
  }

  function cambiarEstado(id: number, nuevoEstado: EstadoTarea) {
    setTareas((tareasActuales) =>
      tareasActuales.map((tarea) =>
        tarea.id === id
          ? { ...tarea, estado: nuevoEstado }
          : tarea
      )
    );

    setMensaje("Estado de la tarea actualizado.");
  }

  function eliminarTarea(id: number) {
    setTareas((tareasActuales) =>
      tareasActuales.filter((tarea) => tarea.id !== id)
    );

    setMensaje("Tarea eliminada correctamente.");
  }

  return (
    <main className="contenedor">
      <header className="encabezado">
        <p className="etiqueta">Organizacion Personal</p>

        <h1>Lista de tareas</h1>

        <p className="subtitulo">
          Organiza tus actividades y lleva el control de tu progreso.
        </p>
      </header>

      <section className="tarjeta">
        <h2>Agregar nueva tarea</h2>

        <form onSubmit={agregarTarea} className="formulario">
          <div className="grupo-campo">
            <label htmlFor="titulo">Titulo de la tarea</label>

            <input
              id="titulo"
              type="text"
              placeholder="Ej. Crear la pagina principal"
              value={titulo}
              onChange={(evento) => setTitulo(evento.target.value)}
              required
            />
          </div>

          <div className="grupo-campo">
            <label htmlFor="descripcion">Descripcion</label>

            <textarea
              id="descripcion"
              placeholder="Describe las actividades que debes realizar..."
              value={descripcion}
              onChange={(evento) => setDescripcion(evento.target.value)}
              rows={3}
              required
            />
          </div>

          <button type="submit" className="boton boton-principal">
            + Agregar tarea
          </button>
        </form>

        {mensaje && (
          <p className="mensaje" role="status" aria-live="polite">
            {mensaje}
          </p>
        )}
      </section>

      <section className="seccion-lista">
        <div className="encabezado-lista">
          <div>
            <h2>Mis tareas</h2>

            <p className="texto-secundario">
              Tienes {tareas.length}{" "}
              {tareas.length === 1 ? "tarea registrada" : "tareas registradas"}.
            </p>
          </div>
        </div>

        {tareas.length === 0 ? (
          <div className="estado-vacio">
            <h3>No hay tareas registradas</h3>

            <p>
              Utiliza el formulario para agregar tu primera tarea.
            </p>
          </div>
        ) : (
          <div className="contenedor-tabla">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {tareas.map((tarea) => (
                  <tr key={tarea.id}>
                    <td>#{tarea.id}</td>

                    <td className="celda-titulo">
                      {tarea.titulo}
                    </td>

                    <td className="celda-descripcion">
                      {tarea.descripcion}
                    </td>

                    <td>
                      <select
                        className={`selector-estado estado-${tarea.estado
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        value={tarea.estado}
                        onChange={(evento) =>
                          cambiarEstado(
                            tarea.id,
                            evento.target.value as EstadoTarea
                          )
                        }
                        aria-label={`Estado de la tarea ${tarea.titulo}`}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Completada">Completada</option>
                      </select>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="boton boton-eliminar"
                        onClick={() => eliminarTarea(tarea.id)}
                        aria-label={`Eliminar tarea ${tarea.titulo}`}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}