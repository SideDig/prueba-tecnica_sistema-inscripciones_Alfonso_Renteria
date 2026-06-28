import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent implements OnInit {
  activeCount = 0;
  bajaEmpresaCount = 0;
  bajaProgramaCount = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    // Nos suscribimos al observable de estudiantes del servicio
    // Aqui aseguramos que si agregamos un alumno o cambia un estatus las tarjetas se actualizan solas
    this.studentService.students$.subscribe((students) => {
      this.activeCount = students.filter(
        (s) => s.estatus === 'activo' || s.estatus === 'reingreso',
      ).length;
      this.bajaEmpresaCount = students.filter(
        (s) => s.estatus === 'baja_empresa',
      ).length;
      this.bajaProgramaCount = students.filter(
        (s) => s.estatus === 'baja_programa',
      ).length;
    });
  }
}
