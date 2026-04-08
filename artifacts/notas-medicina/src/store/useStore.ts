import { useState, useCallback, useEffect } from "react";
import { Materia, Final, EstadoMateria, FuenteNota } from "../types";

const STORAGE_KEY = "notas-medicina-data";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function calcularPromedio(finales: Final[]): number | null {
  const conNota = finales.filter((f) => f.nota !== null && f.nota !== undefined);
  if (conNota.length === 0) return null;
  const suma = conNota.reduce((acc, f) => acc + (f.nota as number), 0);
  return Math.round((suma / conNota.length) * 100) / 100;
}

const MATERIAS_INICIALES: Materia[] = [
  {
    id: generateId(),
    nombre: "Anatomía",
    estado: "Aprobada",
    fuente: "Sistema",
    finales: [{ id: generateId(), fecha: "2023-03-15", nota: 7, aprobado: true, observaciones: "" }],
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    nombre: "Fisiología",
    estado: "Aprobada",
    fuente: "WhatsApp",
    finales: [
      { id: generateId(), fecha: "2023-06-10", nota: 3, aprobado: false, observaciones: "Desaprobado" },
      { id: generateId(), fecha: "2023-08-20", nota: 6, aprobado: true, observaciones: "" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    nombre: "Bioquímica",
    estado: "Regular",
    fuente: "LU",
    finales: [
      { id: generateId(), fecha: "2023-07-05", nota: 2, aprobado: false, observaciones: "Desaprobado" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    nombre: "Inmunología",
    estado: "Aprobada",
    fuente: "Sistema",
    finales: [
      { id: generateId(), fecha: "2022-12-01", nota: 2, aprobado: false, observaciones: "Desaprobado" },
      { id: generateId(), fecha: "2023-02-10", nota: 2, aprobado: false, observaciones: "Desaprobado" },
      { id: generateId(), fecha: "2023-05-15", nota: 8, aprobado: true, observaciones: "" },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    nombre: "Farmacología",
    estado: "Pendiente",
    fuente: "Sistema",
    finales: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    nombre: "Patología",
    estado: "Regular",
    fuente: "WhatsApp",
    finales: [{ id: generateId(), fecha: "2024-03-20", nota: 4, aprobado: false, observaciones: "Desaprobado" }],
    createdAt: new Date().toISOString(),
  },
];

function loadFromStorage(): Materia[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return MATERIAS_INICIALES;
}

function saveToStorage(materias: Materia[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(materias));
  } catch {}
}

export function useStore() {
  const [materias, setMaterias] = useState<Materia[]>(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(materias);
  }, [materias]);

  const agregarMateria = useCallback(
    (nombre: string, estado: EstadoMateria, fuente: FuenteNota) => {
      const nueva: Materia = {
        id: generateId(),
        nombre,
        estado,
        fuente,
        finales: [],
        createdAt: new Date().toISOString(),
      };
      setMaterias((prev) => [...prev, nueva]);
    },
    []
  );

  const editarMateria = useCallback(
    (id: string, cambios: Partial<Pick<Materia, "nombre" | "estado" | "fuente">>) => {
      setMaterias((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...cambios } : m))
      );
    },
    []
  );

  const eliminarMateria = useCallback((id: string) => {
    setMaterias((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const agregarFinal = useCallback(
    (
      materiaId: string,
      final: { fecha: string; nota: number | null; aprobado: boolean; observaciones?: string }
    ) => {
      setMaterias((prev) =>
        prev.map((m) => {
          if (m.id !== materiaId) return m;
          const nuevosFinales = [
            ...m.finales,
            { id: generateId(), ...final },
          ];
          return {
            ...m,
            finales: nuevosFinales,
            notaFinal: calcularPromedio(nuevosFinales),
          };
        })
      );
    },
    []
  );

  const editarFinal = useCallback(
    (
      materiaId: string,
      finalId: string,
      cambios: Partial<Omit<Final, "id">>
    ) => {
      setMaterias((prev) =>
        prev.map((m) => {
          if (m.id !== materiaId) return m;
          const nuevosFinales = m.finales.map((f) =>
            f.id === finalId ? { ...f, ...cambios } : f
          );
          return {
            ...m,
            finales: nuevosFinales,
            notaFinal: calcularPromedio(nuevosFinales),
          };
        })
      );
    },
    []
  );

  const eliminarFinal = useCallback((materiaId: string, finalId: string) => {
    setMaterias((prev) =>
      prev.map((m) => {
        if (m.id !== materiaId) return m;
        const nuevosFinales = m.finales.filter((f) => f.id !== finalId);
        return {
          ...m,
          finales: nuevosFinales,
          notaFinal: calcularPromedio(nuevosFinales),
        };
      })
    );
  }, []);

  const getPromedio = useCallback(
    (materia: Materia): number | null => calcularPromedio(materia.finales),
    []
  );

  return {
    materias,
    agregarMateria,
    editarMateria,
    eliminarMateria,
    agregarFinal,
    editarFinal,
    eliminarFinal,
    getPromedio,
  };
}
