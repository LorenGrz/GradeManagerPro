export type FuenteNota = "Sistema" | "WhatsApp" | "LU";
export type EstadoMateria = "Aprobada" | "Regular" | "Pendiente";

export interface Final {
  id: string;
  fecha: string;
  nota: number | null;
  aprobado: boolean;
  observaciones?: string;
}

export interface Materia {
  id: string;
  nombre: string;
  estado: EstadoMateria;
  fuente: FuenteNota;
  finales: Final[];
  notaFinal?: number | null;
  createdAt: string;
}
