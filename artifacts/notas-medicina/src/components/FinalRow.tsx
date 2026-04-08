import { useState } from "react";
import { Final } from "../types";

interface Props {
  final: Final;
  onEditar: (cambios: Partial<Omit<Final, "id">>) => void;
  onEliminar: () => void;
}

export default function FinalRow({ final, onEditar, onEliminar }: Props) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    fecha: final.fecha,
    nota: final.nota !== null ? String(final.nota) : "",
    aprobado: final.aprobado,
    observaciones: final.observaciones ?? "",
  });

  function guardar() {
    const nota = form.nota === "" ? null : Number(form.nota);
    onEditar({
      fecha: form.fecha,
      nota,
      aprobado: form.aprobado,
      observaciones: form.observaciones,
    });
    setEditando(false);
  }

  if (editando) {
    return (
      <div className="grid grid-cols-[1fr_80px_90px_1fr_80px] gap-2 items-center py-1.5 px-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
        <input
          type="date"
          value={form.fecha}
          onChange={(e) => setForm((f) => ({ ...f, fecha: e.target.value }))}
          className="text-xs border border-slate-200 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        />
        <input
          type="number"
          min="1"
          max="10"
          step="0.5"
          value={form.nota}
          onChange={(e) => setForm((f) => ({ ...f, nota: e.target.value }))}
          placeholder="—"
          className="text-xs border border-slate-200 dark:border-slate-600 rounded px-2 py-1 text-center bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        />
        <select
          value={form.aprobado ? "1" : "0"}
          onChange={(e) => setForm((f) => ({ ...f, aprobado: e.target.value === "1" }))}
          className="text-xs border border-slate-200 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        >
          <option value="1">Aprobado</option>
          <option value="0">Desaprobado</option>
        </select>
        <input
          type="text"
          value={form.observaciones}
          onChange={(e) => setForm((f) => ({ ...f, observaciones: e.target.value }))}
          placeholder="Observaciones..."
          className="text-xs border border-slate-200 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <button
            onClick={guardar}
            className="p-1 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
            title="Guardar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button
            onClick={() => setEditando(false)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Cancelar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_80px_90px_1fr_80px] gap-2 items-center py-1.5 px-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
      <span className="text-sm text-slate-700 dark:text-slate-300">
        {final.fecha ? new Date(final.fecha + "T12:00:00").toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
      </span>
      <span className={`text-sm text-center font-medium ${final.nota !== null ? (final.nota >= 6 ? "text-emerald-600 dark:text-emerald-400" : final.nota >= 4 ? "text-amber-500 dark:text-amber-400" : "text-red-500 dark:text-red-400") : "text-slate-400 dark:text-slate-500"}`}>
        {final.nota !== null ? final.nota : "—"}
      </span>
      <span className={`text-xs text-center px-2 py-0.5 rounded-full font-medium ${final.aprobado ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"}`}>
        {final.aprobado ? "Aprobado" : "Desaprobado"}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
        {final.observaciones || "—"}
      </span>
      <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setEditando(true)}
          className="p-1 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          title="Editar"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          onClick={onEliminar}
          className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          title="Eliminar"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
