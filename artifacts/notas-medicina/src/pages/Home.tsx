import { useState, useMemo } from "react";
import { useStore } from "../store/useStore";
import { useDarkMode } from "../hooks/useDarkMode";
import MateriaCard from "../components/MateriaCard";
import ModalAgregarMateria from "../components/ModalAgregarMateria";
import Estadisticas from "../components/Estadisticas";
import FiltrosBar from "../components/FiltrosBar";
import { EstadoMateria, FuenteNota } from "../types";

export default function Home() {
  const { materias, agregarMateria, editarMateria, eliminarMateria, agregarFinal, editarFinal, eliminarFinal, getPromedio } = useStore();
  const { dark, toggleDark } = useDarkMode();
  const [modalMateria, setModalMateria] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<EstadoMateria | "Todas">("Todas");
  const [filtroFuente, setFiltroFuente] = useState<FuenteNota | "Todas">("Todas");
  const [busqueda, setBusqueda] = useState("");

  const materiasFiltradas = useMemo(() => {
    return materias
      .filter((m) => {
        if (filtroEstado !== "Todas" && m.estado !== filtroEstado) return false;
        if (filtroFuente !== "Todas" && m.fuente !== filtroFuente) return false;
        if (busqueda && !m.nombre.toLowerCase().includes(busqueda.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        const orden: Record<EstadoMateria, number> = { Aprobada: 0, Regular: 1, Pendiente: 2 };
        return orden[a.estado] - orden[b.estado] || a.nombre.localeCompare(b.nombre);
      });
  }, [materias, filtroEstado, filtroFuente, busqueda]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">Notas Medicina</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight hidden sm:block">Seguimiento de materias y finales</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title={dark ? "Modo claro" : "Modo oscuro"}
            >
              {dark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setModalMateria(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Nueva materia</span>
              <span className="sm:hidden">Agregar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <Estadisticas materias={materias} />

        <FiltrosBar
          filtroEstado={filtroEstado}
          filtroFuente={filtroFuente}
          busqueda={busqueda}
          onFiltroEstado={setFiltroEstado}
          onFiltroFuente={setFiltroFuente}
          onBusqueda={setBusqueda}
        />

        {materiasFiltradas.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {busqueda || filtroEstado !== "Todas" || filtroFuente !== "Todas"
                ? "No hay materias que coincidan con los filtros"
                : "No hay materias aún"}
            </p>
            {!busqueda && filtroEstado === "Todas" && filtroFuente === "Todas" && (
              <button
                onClick={() => setModalMateria(true)}
                className="mt-4 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
              >
                Agregar primera materia
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {materiasFiltradas.map((materia) => (
              <MateriaCard
                key={materia.id}
                materia={materia}
                promedio={getPromedio(materia)}
                onEditarMateria={editarMateria}
                onEliminarMateria={eliminarMateria}
                onAgregarFinal={agregarFinal}
                onEditarFinal={editarFinal}
                onEliminarFinal={eliminarFinal}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
          Los datos se guardan automáticamente en este navegador
        </div>
      </main>

      {modalMateria && (
        <ModalAgregarMateria
          onGuardar={agregarMateria}
          onCerrar={() => setModalMateria(false)}
        />
      )}
    </div>
  );
}
