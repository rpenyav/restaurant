export interface Consultas {
  list: List[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}

export interface List {
  id: number;
  idPaciente: number;
  idCliente: number;
  motivoConsulta: string;
  descripcionConsulta: string;
  fechaConsulta: Date;
  anamnesisConsulta: string;
  eog_mucosas: string;
  eog_temperatura: string;
  eog_peso: string;
  eog_condicioncorporal: string;
  eog_estadoSensorio: string;
  eog_hidratacion: string;
  eop_piel: string;
  eop_piel_observaciones: number;
  eop_ojos: string;
  eop_ojos_observaciones: number;
  eop_oidos: string;
  eop_oidos_observaciones: string;
  eop_sisdigestivo: string;
  eop_sisdigestivo_observaciones: string;
  eop_cardiovascular: string;
  eop_cardiovascular_observaciones: string;
  eop_respiratorio: string;
  eop_respiratorio_observaciones: string;
  eop_urinario: string;
  eop_urinario_observaciones: string;
  eop_nervioso: string;
  eop_nervioso_observaciones: string;
  eop_linfatico: string;
  eop_linfatico_observaciones: string;
  eop_locomotor: string;
  eop_locomotor_observaciones: string;
  eop_reproductor: string;
  eop_reproductor_observaciones: string;
  diagnosticoConsulta: string;
  observacionesConsulta: string;
  proximoControlConsulta: Date;
  tratamientos: Tratamiento[];
  productosAplicados: ProductosAplicado[];
  candidatos: Candidato[];
}

export interface Candidato {
  id: number;
  fechaCandidatura: Date;
}

export interface ProductosAplicado {
  id: number;
  producto: string;
  cantidad: string;
}

export interface Tratamiento {
  id: number;
  nombre: string;
  dosis: string;
}
