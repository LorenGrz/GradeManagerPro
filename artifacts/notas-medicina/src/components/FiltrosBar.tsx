import { EstadoMateria, FuenteNota } from "../types";

interface Props {
  filtroEstado: EstadoMateria | "Todas";
  filtroFuente: FuenteNota | "Todas";
  busqueda: string;
  onFiltroEstado: (v: EstadoMateria | "Todas") => void;
  onFiltroFuente: (v: FuenteNota | "Todas") => void;
  onBusqueda: (v: string) => void;
}

const ESTADOS: (EstadoMateria | "Todas")[] = ["Todas", "Aprobada", "Regular", "Pendiente"];
const FUENTES: (FuenteNota | "Todas")[] = ["Todas", "Sistema", "WhatsApp", "LU"];

export default function FiltrosBar({
  filtroEstado,
  filtroFuente,
  busqueda,
  onFiltroEstado,
  onFiltroFuente,
  onBusqueda,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-5 items-center">
      <div className="relative flex-1 min-w-[180px]">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => onBusqueda(e.target.value)}
          placeholder="Buscar materia..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
        {ESTADOS.map((e) => (
          <button
            key={e}
            onClick={() => onFiltroEstado(e)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filtroEstado === e
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
        {FUENTES.map((f) => (
          <button
            key={f}
            onClick={() => onFiltroFuente(f)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filtroFuente === f
                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
