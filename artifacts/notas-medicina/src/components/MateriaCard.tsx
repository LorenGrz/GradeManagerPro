import { useState } from "react";
import { Materia, Final, FuenteNota, EstadoMateria } from "../types";
import FinalRow from "./FinalRow";
import ModalAgregarFinal from "./ModalAgregarFinal";
import ModalEditarMateria from "./ModalEditarMateria";

interface Props {
  materia: Materia;
  onEditarMateria: (id: string, cambios: Partial<Pick<Materia, "nombre" | "estado" | "fuente">>) => void;
  onEliminarMateria: (id: string) => void;
  onAgregarFinal: (materiaId: string, final: { fecha: string; nota: number | null; aprobado: boolean; observaciones?: string }) => void;
  onEditarFinal: (materiaId: string, finalId: string, cambios: Partial<Omit<Final, "id">>) => void;
  onEliminarFinal: (materiaId: string, finalId: string) => void;
  promedio: number | null;
}

const ESTADO_COLORS: Record<EstadoMateria, string> = {
  Aprobada: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Regular: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Pendiente: "bg-slate-100 text-slate-700 dark:bg-slate-700/60 dark:text-slate-300",
};

const FUENTE_COLORS: Record<FuenteNota, string> = {
  Sistema: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  WhatsApp: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  LU: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
};

function promedioColor(prom: number | null): string {
  if (prom === null) return "text-slate-400 dark:text-slate-500";
  if (prom >= 6) return "text-emerald-600 dark:text-emerald-400 font-bold";
  if (prom >= 4) return "text-amber-500 dark:text-amber-400 font-bold";
  return "text-red-500 dark:text-red-400 font-bold";
}

export default function MateriaCard({
  materia,
  onEditarMateria,
  onEliminarMateria,
  onAgregarFinal,
  onEditarFinal,
  onEliminarFinal,
  promedio,
}: Props) {
  const [expandido, setExpandido] = useState(false);
  const [modalFinal, setModalFinal] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);

  const finalAprobado = materia.finales.find((f) => f.aprobado);
  const notaAprobada = finalAprobado ? finalAprobado.nota : null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-200">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
        onClick={() => setExpandido((e) => !e)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900 dark:text-slate-100 truncate text-base">
              {materia.nombre}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ESTADO_COLORS[materia.estado]}`}>
              {materia.estado}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${FUENTE_COLORS[materia.fuente]}`}>
              {materia.fuente}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {materia.finales.length} final{materia.finales.length !== 1 ? "es" : ""}
            </span>
            {promedio !== null && (
              <span className={`text-xs ${promedioColor(promedio)}`}>
                Promedio: {promedio}
              </span>
            )}
            {notaAprobada !== null && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Nota aprobatoria: <span className="font-medium text-emerald-600 dark:text-emerald-400">{notaAprobada}</span>
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setModalEditar(true)}
            className="p-1.5 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            title="Editar materia"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => setConfirmarEliminar(true)}
            className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            title="Eliminar materia"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            onClick={() => setExpandido((e) => !e)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${expandido ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expandido */}
      {expandido && (
        <div className="border-t border-slate-200 dark:border-slate-700 px-5 pb-4 pt-3">
          {materia.finales.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 italic mb-3">Sin finales registrados</p>
          ) : (
            <div className="space-y-2 mb-3">
              <div className="grid grid-cols-[1fr_80px_90px_1fr_80px] gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide pb-1 border-b border-slate-100 dark:border-slate-700">
                <span>Fecha</span>
                <span className="text-center">Nota</span>
                <span className="text-center">Estado</span>
                <span>Observaciones</span>
                <span></span>
              </div>
              {materia.finales.map((final) => (
                <FinalRow
                  key={final.id}
                  final={final}
                  onEditar={(cambios) => onEditarFinal(materia.id, final.id, cambios)}
                  onEliminar={() => onEliminarFinal(materia.id, final.id)}
                />
              ))}
            </div>
          )}
          <button
            onClick={() => setModalFinal(true)}
            className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar final
          </button>
        </div>
      )}

      {/* Modales */}
      {modalFinal && (
        <ModalAgregarFinal
          onGuardar={(data) => { onAgregarFinal(materia.id, data); setModalFinal(false); }}
          onCerrar={() => setModalFinal(false)}
        />
      )}
      {modalEditar && (
        <ModalEditarMateria
          materia={materia}
          onGuardar={(cambios) => { onEditarMateria(materia.id, cambios); setModalEditar(false); }}
          onCerrar={() => setModalEditar(false)}
        />
      )}
      {confirmarEliminar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Eliminar materia</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
              ¿Seguro que quieres eliminar <strong>{materia.nombre}</strong>? Se perderán todos sus finales.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmarEliminar(false)}
                className="px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => { onEliminarMateria(materia.id); setConfirmarEliminar(false); }}
                className="px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
