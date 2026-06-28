import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Company, Program } from '../../models/student.model';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  studentForm!: FormGroup;
  companies: Company[] = [];
  programs: Program[] = [];
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    // Obtenemos los catálogos estaticos para llenar los selectores para llenar la info del usuario
    this.companies = this.studentService.getCompanies();
    this.programs = this.studentService.getPrograms();

    // iniciamos el formulario con Reactive Form Builder y validaciones obligatorias (Validators.required)
    this.studentForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      id_empresa: ['', Validators.required],
      id_programa: ['', Validators.required],
      fecha_inscripcion: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      // Aqui guardamos la info del alumno en el servicio
      this.studentService.addStudent(this.studentForm.value);
      this.successMessage = '¡Alumno registrado exitosamente en el sistema!';
      
      // Reseteamos el formulario a sus valores por defecto
      this.studentForm.reset({
        nombre: '',
        id_empresa: '',
        id_programa: '',
        fecha_inscripcion: new Date().toISOString().split('T')[0]
      });

      // Ocultar mensaje de éxito tras 3 segundos
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } else {
      
      this.studentForm.markAllAsTouched();
    }
  }
}
