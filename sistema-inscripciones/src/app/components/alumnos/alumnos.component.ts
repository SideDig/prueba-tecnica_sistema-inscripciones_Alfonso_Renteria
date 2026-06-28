import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student, StatusHistory, Program } from '../../models/student.model';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  paginatedStudents: Student[] = []; 
  programs: Program[] = [];
  
  // Estados para filtros
  filterStatus = '';
  filterProgram = '';

  // Variables de Paginacion como la cantidad de registros por pagina
  currentPage = 1;
  pageSize = 10; 
  totalPages = 1;

  // Todos los estatus posibles
  statusOptions: Student['estatus'][] = ['activo', 'baja_empresa', 'baja_programa', 'egresado', 'inscrito', 'reingreso', 'suspendido'];

  // Variables para controlar el Modal de Cambio de Estatus
  showStatusModal = false;
  selectedStudent: Student | null = null;
  newStatus: Student['estatus'] = 'activo';
  changeReason = '';

  // Variables para controlar el Modal de Historial
  showHistoryModal = false;
  selectedStudentHistory: StatusHistory[] = [];

  formatStatus(status: string): string {
    if (!status) return '';
    return status.replace(/_/g, ' ');
  }

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.programs = this.studentService.getPrograms();
    
    // Escuchar cambios reactivamente
    this.studentService.students$.subscribe(students => {
      this.students = students;
      this.applyFilters();
    });
  }

  //Para aplicar los filtros de busqueda en base a los datos en memoria
  applyFilters(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchStatus = this.filterStatus === '' || student.estatus === this.filterStatus;
      const matchProgram = this.filterProgram === '' || student.id_programa === Number(this.filterProgram);
      return matchStatus && matchProgram;
    });

    // Resetear a la primera página tras filtrar
    this.currentPage = 1;
    this.calculatePagination();
  }

  // Calcula el total de paginas y corta la lista para la pagina actual
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.pageSize) || 1;
    this.updatePaginatedStudents();
  }

  updatePaginatedStudents(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedStudents = this.filteredStudents.slice(startIndex, startIndex + this.pageSize);
  }

  // Metodos para paginar entre las paginas de la tabla de alumnos
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedStudents();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedStudents();
    }
  }

  // Modal para cambio de Estatus 
  openStatusModal(student: Student): void {
    this.selectedStudent = student;
    this.newStatus = student.estatus;
    this.changeReason = '';
    this.showStatusModal = true;
  }

  closeStatusModal(): void {
    this.showStatusModal = false;
    this.selectedStudent = null;
  }

  saveStatusChange(): void {
    if (this.selectedStudent && this.newStatus && this.changeReason.trim() !== '') {
      this.studentService.changeStudentStatus(
        this.selectedStudent.id_alumno,
        this.newStatus,
        this.changeReason
      );
      this.closeStatusModal();
    }
  }

  // Modal para ver historial de cambios
  openHistoryModal(student: Student): void {
    this.selectedStudent = student;
    this.selectedStudentHistory = this.studentService.getStudentHistory(student.id_alumno);
    this.showHistoryModal = true;
  }

  closeHistoryModal(): void {
    this.showHistoryModal = false;
    this.selectedStudent = null;
    this.selectedStudentHistory = [];
  }
}
