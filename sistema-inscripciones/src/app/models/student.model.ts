// Aqui se declaran las interfaces de los modelos que se usaran en la aplicacion 

export interface Student {
  id_alumno: number;
  nombre: string;
  id_empresa: number;
  nombre_empresa: string;
  id_programa: number;
  nombre_programa: string;
  estatus: 'activo' | 'baja_empresa' | 'baja_programa' | 'egresado' | 'inscrito' | 'reingreso' | 'suspendido';
  fecha_inscripcion: string;
}

export interface StatusHistory {
  id_historial: number;
  id_inscripcion: number;
  estatus_anterior: string;
  estatus_nuevo: string;
  fecha_cambio: string;
  motivo: string;
}

export interface Company {
  id_empresa: number;
  nombre_empresa: string;
}

export interface Program {
  id_programa: number;
  nombre_programa: string;
  nivel: 'Bachillerato' | 'Licenciatura' | 'Maestria' | 'Secundaria';
}
