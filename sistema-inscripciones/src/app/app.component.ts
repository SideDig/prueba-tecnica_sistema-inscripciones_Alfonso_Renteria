import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumenComponent } from './components/resumen/resumen.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ResumenComponent,
    RegistroComponent,
    AlumnosComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistema-inscripciones';
}
