import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student, StatusHistory, Company, Program } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // Catálogos estaticos de empresas y programas para los formularios
  private companies: Company[] = [
    { id_empresa: 1, nombre_empresa: 'Alpura' },
    { id_empresa: 2, nombre_empresa: 'Banorte' },
    { id_empresa: 3, nombre_empresa: 'Bayer' },
    { id_empresa: 4, nombre_empresa: 'Bimbo' },
    { id_empresa: 5, nombre_empresa: 'Cemex' },
    { id_empresa: 8, nombre_empresa: 'Coppel' },
    { id_empresa: 13, nombre_empresa: 'Soriana' }
  ];

  private programs: Program[] = [
    { id_programa: 1, nombre_programa: 'Bachillerato Ejecutivo', nivel: 'Bachillerato' },
    { id_programa: 2, nombre_programa: 'Bachillerato General', nivel: 'Bachillerato' },
    { id_programa: 3, nombre_programa: 'Lic. Administracion', nivel: 'Licenciatura' },
    { id_programa: 4, nombre_programa: 'Lic. Contaduria', nivel: 'Licenciatura' },
    { id_programa: 5, nombre_programa: 'Lic. Logistica', nivel: 'Licenciatura' },
    { id_programa: 7, nombre_programa: 'Lic. Negocios', nivel: 'Licenciatura' },
    { id_programa: 9, nombre_programa: 'Maestria en Educacion', nivel: 'Maestria' }
  ];

  // Datos mock iniciales basados en la prueba tecnica
  private initialStudents: Student[] = [
    { id_alumno: 1001, nombre: 'Luis Cruz', id_empresa: 13, nombre_empresa: 'Soriana', id_programa: 7, nombre_programa: 'Lic. Negocios', estatus: 'activo', fecha_inscripcion: '2025-02-26' },
    { id_alumno: 1002, nombre: 'Andrés Ramírez', id_empresa: 8, nombre_empresa: 'Coppel', id_programa: 4, nombre_programa: 'Lic. Contaduria', estatus: 'suspendido', fecha_inscripcion: '2022-10-04' },
    { id_alumno: 1003, nombre: 'Daniela Ortiz', id_empresa: 13, nombre_empresa: 'Soriana', id_programa: 5, nombre_programa: 'Lic. Logistica', estatus: 'egresado', fecha_inscripcion: '2017-10-02' },
    { id_alumno: 1004, nombre: 'Luis Reyes', id_empresa: 13, nombre_empresa: 'Soriana', id_programa: 5, nombre_programa: 'Lic. Logistica', estatus: 'egresado', fecha_inscripcion: '2015-06-06' },
    { id_alumno: 1005, nombre: 'Sofía Hernández', id_empresa: 13, nombre_empresa: 'Soriana', id_programa: 5, nombre_programa: 'Lic. Logistica', estatus: 'baja_programa', fecha_inscripcion: '2017-03-31' },
    { id_alumno: 1006, nombre: 'Paola Mendoza', id_empresa: 3, nombre_empresa: 'Bayer', id_programa: 9, nombre_programa: 'Maestria en Educacion', estatus: 'baja_programa', fecha_inscripcion: '2023-03-28' },
    { id_alumno: 1007, nombre: 'Gabriela Cruz', id_empresa: 13, nombre_empresa: 'Soriana', id_programa: 7, nombre_programa: 'Lic. Negocios', estatus: 'baja_empresa', fecha_inscripcion: '2024-03-30' },
    { id_alumno: 1008, nombre: 'José Gutiérrez', id_empresa: 8, nombre_empresa: 'Coppel', id_programa: 4, nombre_programa: 'Lic. Contaduria', estatus: 'suspendido', fecha_inscripcion: '2022-05-06' },
    { id_alumno: 1009, nombre: 'Carlos Fuentes', id_empresa: 4, nombre_empresa: 'Bimbo', id_programa: 3, nombre_programa: 'Lic. Administracion', estatus: 'activo', fecha_inscripcion: '2024-01-15' },
    { id_alumno: 1010, nombre: 'Ana Karen Gómez', id_empresa: 2, nombre_empresa: 'Banorte', id_programa: 3, nombre_programa: 'Lic. Administracion', estatus: 'activo', fecha_inscripcion: '2023-11-20' },
    { id_alumno: 1011, nombre: 'Mateo Valenzuela', id_empresa: 5, nombre_empresa: 'Cemex', id_programa: 5, nombre_programa: 'Lic. Logistica', estatus: 'activo', fecha_inscripcion: '2025-05-10' },
    { id_alumno: 1012, nombre: 'María José Luján', id_empresa: 1, nombre_empresa: 'Alpura', id_programa: 1, nombre_programa: 'Bachillerato Ejecutivo', estatus: 'activo', fecha_inscripcion: '2025-01-10' },
    { id_alumno: 1013, nombre: 'Rodrigo Herrera', id_empresa: 3, nombre_empresa: 'Bayer', id_programa: 9, nombre_programa: 'Maestria en Educacion', estatus: 'activo', fecha_inscripcion: '2026-02-14' },
    { id_alumno: 1014, nombre: 'Fernando Castillo', id_empresa: 4, nombre_empresa: 'Bimbo', id_programa: 7, nombre_programa: 'Lic. Negocios', estatus: 'inscrito', fecha_inscripcion: '2026-06-01' },
    { id_alumno: 1015, nombre: 'Jimena Santos', id_empresa: 13, nombre_empresa: 'Soriana', id_programa: 2, nombre_programa: 'Bachillerato General', estatus: 'baja_empresa', fecha_inscripcion: '2023-08-12' },
    { id_alumno: 1016, nombre: 'Alejandro Ruiz', id_empresa: 8, nombre_empresa: 'Coppel', id_programa: 5, nombre_programa: 'Lic. Logistica', estatus: 'baja_programa', fecha_inscripcion: '2022-12-15' },
    { id_alumno: 1017, nombre: 'Valeria Peralta', id_empresa: 5, nombre_empresa: 'Cemex', id_programa: 3, nombre_programa: 'Lic. Administracion', estatus: 'egresado', fecha_inscripcion: '2021-06-30' },
    { id_alumno: 1018, nombre: 'Ricardo Medina', id_empresa: 1, nombre_empresa: 'Alpura', id_programa: 1, nombre_programa: 'Bachillerato Ejecutivo', estatus: 'egresado', fecha_inscripcion: '2020-11-18' },
    { id_alumno: 1019, nombre: 'Patricia Flores', id_empresa: 2, nombre_empresa: 'Banorte', id_programa: 4, nombre_programa: 'Lic. Contaduria', estatus: 'suspendido', fecha_inscripcion: '2024-09-05' },
    { id_alumno: 1020, nombre: 'Roberto Silva', id_empresa: 8, nombre_empresa: 'Coppel', id_programa: 2, nombre_programa: 'Bachillerato General', estatus: 'activo', fecha_inscripcion: '2024-03-10' },
    { id_alumno: 1021, nombre: 'Claudia Torres', id_empresa: 4, nombre_empresa: 'Bimbo', id_programa: 7, nombre_programa: 'Lic. Negocios', estatus: 'reingreso', fecha_inscripcion: '2025-09-20' },
    { id_alumno: 1022, nombre: 'Hugo Morales', id_empresa: 3, nombre_empresa: 'Bayer', id_programa: 9, nombre_programa: 'Maestria en Educacion', estatus: 'activo', fecha_inscripcion: '2025-10-05' },
    { id_alumno: 1023, nombre: 'Estefanía Aguilar', id_empresa: 13, nombre_empresa: 'Soriana', id_programa: 5, nombre_programa: 'Lic. Logistica', estatus: 'inscrito', fecha_inscripcion: '2026-06-15' },
    { id_alumno: 1024, nombre: 'Daniel Vargas', id_empresa: 5, nombre_empresa: 'Cemex', id_programa: 4, nombre_programa: 'Lic. Contaduria', estatus: 'activo', fecha_inscripcion: '2025-07-22' },
    { id_alumno: 1025, nombre: 'Mónica Sánchez', id_empresa: 1, nombre_empresa: 'Alpura', id_programa: 1, nombre_programa: 'Bachillerato Ejecutivo', estatus: 'activo', fecha_inscripcion: '2026-01-18' }
  ];

  private initialHistory: StatusHistory[] = [
    { id_historial: 1, id_inscripcion: 1001, estatus_anterior: 'inscrito', estatus_nuevo: 'activo', fecha_cambio: '2025-02-26', motivo: 'Alta inicial del alumno confirmada' },
    { id_historial: 2, id_inscripcion: 1002, estatus_anterior: 'activo', estatus_nuevo: 'suspendido', fecha_cambio: '2022-10-04', motivo: 'Adeudo de dos mensualidades' },
    { id_historial: 3, id_inscripcion: 1003, estatus_anterior: 'activo', estatus_nuevo: 'egresado', fecha_cambio: '2017-10-02', motivo: 'Cumplimiento de creditos' },
    { id_historial: 4, id_inscripcion: 1004, estatus_anterior: 'activo', estatus_nuevo: 'egresado', fecha_cambio: '2015-06-06', motivo: 'Entrega de certificado' },
    { id_historial: 5, id_inscripcion: 1005, estatus_anterior: 'activo', estatus_nuevo: 'baja_programa', fecha_cambio: '2017-03-31', motivo: 'Baja voluntaria por motivos de salud' },
    { id_historial: 6, id_inscripcion: 1006, estatus_anterior: 'activo', estatus_nuevo: 'baja_programa',  fecha_cambio: '2023-03-28', motivo: 'Baja voluntaria por cambio de empleo' },
    { id_historial: 7, id_inscripcion: 1007, estatus_anterior: 'activo', estatus_nuevo: 'baja_empresa', fecha_cambio: '2024-03-30', motivo: 'Empresa suspendio convenio corporativo' },
    { id_historial: 8, id_inscripcion: 1008, estatus_anterior: 'activo', estatus_nuevo: 'suspendido', fecha_cambio: '2022-05-06', motivo: 'Documentacion incompleta' },
    { id_historial: 9, id_inscripcion: 1015, estatus_anterior: 'activo', estatus_nuevo: 'baja_empresa', fecha_cambio: '2023-08-12', motivo: 'Cancelacion de convenio de becas' },
    { id_historial: 10, id_inscripcion: 1016, estatus_anterior: 'activo', estatus_nuevo: 'baja_programa', fecha_cambio: '2022-12-15', motivo: 'Cambio de ciudad de residencia' }
  ];

  // Estado compartido (BehaviorSubjects)
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  private historySubject = new BehaviorSubject<StatusHistory[]>([]);

  students$: Observable<Student[]> = this.studentsSubject.asObservable();
  history$: Observable<StatusHistory[]> = this.historySubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  // Carga inicial desde LocalStorage o Mock Data
  private loadInitialData(): void {
    const savedStudents = localStorage.getItem('students');
    const savedHistory = localStorage.getItem('history');

    if (savedStudents && savedHistory) {
      this.studentsSubject.next(JSON.parse(savedStudents));
      this.historySubject.next(JSON.parse(savedHistory));
    } else {
      this.studentsSubject.next(this.initialStudents);
      this.historySubject.next(this.initialHistory);
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('students', JSON.stringify(this.studentsSubject.value));
    localStorage.setItem('history', JSON.stringify(this.historySubject.value));
  }

  // Getters para catálogos
  getCompanies(): Company[] {
    return this.companies;
  }

  getPrograms(): Program[] {
    return this.programs;
  }

  // Agregar nuevo alumno 
  addStudent(studentData: Omit<Student, 'id_alumno' | 'nombre_empresa' | 'nombre_programa' | 'estatus'>): void {
    const currentStudents = this.studentsSubject.value;
    
    // Obtener nombres de empresa y programa 
    const company = this.companies.find(c => c.id_empresa === Number(studentData.id_empresa));
    const program = this.programs.find(p => p.id_programa === Number(studentData.id_programa));

    // Generar nuevo ID unico (este seria el id_alumno)
    const nextId = currentStudents.length > 0 
      ? Math.max(...currentStudents.map(s => s.id_alumno)) + 1 
      : 1001;

    const newStudent: Student = {
      id_alumno: nextId,
      nombre: studentData.nombre,
      id_empresa: Number(studentData.id_empresa),
      nombre_empresa: company ? company.nombre_empresa : 'Desconocida',
      id_programa: Number(studentData.id_programa),
      nombre_programa: program ? program.nombre_programa : 'Desconocido',
      estatus: 'inscrito', // este es el estatus inicial por defecto
      fecha_inscripcion: studentData.fecha_inscripcion
    };

    // Actualizar el estado de estudiantes que hay en el sistema 
    const updatedStudents = [...currentStudents, newStudent];
    this.studentsSubject.next(updatedStudents);

    // Registrar en el historial de estatus (este seria el id_historial)
    const currentHistory = this.historySubject.value;
    const nextHistorialId = currentHistory.length > 0
      ? Math.max(...currentHistory.map(h => h.id_historial)) + 1
      : 1;

    const newHistoryRecord: StatusHistory = {
      id_historial: nextHistorialId,
      id_inscripcion: newStudent.id_alumno,
      estatus_anterior: 'Ninguno',
      estatus_nuevo: 'inscrito',
      fecha_cambio: new Date().toISOString().split('T')[0],
      motivo: 'Alta inicial del alumno en el sistema'
    };

    const updatedHistory = [...currentHistory, newHistoryRecord];
    this.historySubject.next(updatedHistory);

    this.saveToStorage();
  }

  // Cambiar estatus de un alumno 
  changeStudentStatus(studentId: number, newStatus: Student['estatus'], reason: string): void {
    const currentStudents = this.studentsSubject.value;
    const studentIndex = currentStudents.findIndex(s => s.id_alumno === studentId);

    if (studentIndex !== -1) {
      const student = currentStudents[studentIndex];
      const previousStatus = student.estatus;

      // Si el estatus es igual, no hacemos nada
      if (previousStatus === newStatus) return;

      // y aqui actualizar estatus del alumno
      student.estatus = newStatus;
      currentStudents[studentIndex] = { ...student };
      this.studentsSubject.next([...currentStudents]);

      // y agrega el registro al historial 
      const currentHistory = this.historySubject.value;
      const nextHistorialId = currentHistory.length > 0
        ? Math.max(...currentHistory.map(h => h.id_historial)) + 1
        : 1;

      const newHistoryRecord: StatusHistory = {
        id_historial: nextHistorialId,
        id_inscripcion: studentId,
        estatus_anterior: previousStatus,
        estatus_nuevo: newStatus,
        fecha_cambio: new Date().toISOString().split('T')[0],
        motivo: reason
      };

      const updatedHistory = [...currentHistory, newHistoryRecord];
      this.historySubject.next(updatedHistory);

      this.saveToStorage();
    }
  }

  // Obtener historial de estatus de un alumno
  getStudentHistory(studentId: number): StatusHistory[] {
    return this.historySubject.value.filter(h => h.id_inscripcion === studentId);
  }
}
