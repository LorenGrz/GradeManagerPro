import { Materia } from "../types";

interface Props {
  materias: Materia[];
}

function calcularPromedio(finales: { nota: number | null }[]): number | null {
  const conNota = finales.filter((f) => f.nota !== null);
  if (conNota.length === 0) return null;
  const suma = conNota.reduce((acc, f) => acc + (f.nota as number), 0);
  return Math.round((suma / conNota.length) * 100) / 100;
}

export default function Estadisticas({ materias }: Props) {
  const aprobadas = materias.filter((m) => m.estado === "Aprobada");
  const regulares = materias.filter((m) => m.estado === "Regular");
  const pendientes = materias.filter((m) => m.estado === "Pendiente");

  const promediosAprobadas = aprobadas
    .map((m) => calcularPromedio(m.finales))
    .filter((p): p is number => p !== null);
  const promedioGeneral =
    promediosAprobadas.length > 0
      ? Math.round((promediosAprobadas.reduce((a, b) => a + b, 0) / promediosAprobadas.length) * 100) / 100
      : null;

  const totalFinales = materias.reduce((acc, m) => acc + m.finales.length, 0);

  const stats = [
    {
      label: "Aprobadas",
      value: aprobadas.length,
      total: materias.length,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-emerald-200 dark:border-emerald-800",
    },
    {
      label: "Regulares",
      value: regulares.length,
      total: materias.length,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-amber-200 dark:border-amber-800",
    },
    {
      label: "Pendientes",
      value: pendientes.length,
      total: materias.length,
      color: "text-slate-500 dark:text-slate-400",
      bg: "bg-slate-50 dark:bg-slate-800",
      border: "border-slate-200 dark:border-slate-700",
    },
    {
      label: "Promedio general",
      value: promedioGeneral !== null ? promedioGeneral : "—",
      total: null,
      color: promedioGeneral !== null && promedioGeneral >= 6 ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      border: "border-indigo-200 dark:border-indigo-800",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-xl border ${s.bg} ${s.border} px-4 py-3 flex flex-col`}
        >
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{s.label}</span>
          <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
          {s.total !== null && (
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">de {s.total} materias</span>
          )}
          {s.total === null && (
            <span className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{totalFinales} finales registrados</span>
          )}
        </div>
      ))}
    </div>
  );
}
