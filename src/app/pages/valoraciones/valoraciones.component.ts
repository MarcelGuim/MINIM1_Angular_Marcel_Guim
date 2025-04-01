import { RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ValoracionesService } from '../../services/valoraciones.service';
import { Component, inject, Output, EventEmitter } from '@angular/core';
import { IValoraciones } from '../../models/valoraciones.mode';
import { CommonModule } from '@angular/common';  // Afegeix CommonModule
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Afegeix aquesta línia


@Component({
  selector: 'app-valoraciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './valoraciones.component.html',
  styleUrl: './valoraciones.component.css'
})
export class ValoracionesComponent {
  constructor(private route: ActivatedRoute,  private router: Router) { }
  id: string | null = null;
  valoraciones: IValoraciones[] = [];
  valoracionesService = inject(ValoracionesService)
  novaValoracio: IValoraciones = {
    user:"",
    calendar: "",
    valoracion: 1,
    used: false,
  };
  ngOnInit(): void {
    const state = history.state;
    if (state?.valoraciones) {
      this.valoraciones = state.valoraciones;
      if (this.valoraciones.length === 0) alert("The user has no valoraciones");
    } else {
      console.error('No s\'han trobat valoraciones');
    }
    this.route.params.subscribe(params => {
    this.id = params['id']
    });
  }

  deleteValoracion(valoracionId: string | undefined){
    if(valoracionId === undefined){
      alert("Error, no Id found")
    }
    else{
      this.valoracionesService.deleteValoracion(valoracionId).subscribe({
        next: () => {
          alert("valoracion deleted");
        },
        error: (err: any) => {
          console.error('Error erasing valoraciones', err);
          if (err.status === 404) {
            alert("Valoracion not found");
          }
          else {
            alert("Server error");
          }
        },
      });
    }
  }

  modificaValoracion(valoracion: IValoraciones){
    if(valoracion._id === undefined || valoracion.novaValoracio === undefined){
      alert("Error, not enough inputs")
    }
    else{
      const valoracion2: IValoraciones = {
        user: valoracion.user,
        calendar: valoracion.calendar,
        valoracion: valoracion.novaValoracio,
        used: valoracion.used,
      }
      this.valoracionesService.updateValoracion(valoracion._id,valoracion2).subscribe({
        next: () => {
          alert("valoracion updated");
        },
        error: (err: any) => {
          console.error('Error updating valoraciones', err);
          if (err.status === 404) {
            alert("Valoracion not found");
          }
          else {
            alert("Server error");
          }
        },
      });
    }
  }

  afegirValoracio(){
    this.valoracionesService.createValoracion(this.novaValoracio).subscribe({
      next: () => {
        alert("valoracion creada");
      },
      error: (err: any) => {
        console.error('Error updating valoraciones', err);
        if (err.status === 404) {
          alert("User not found");
        }
        if (err.status === 405) {
          alert("Calendar not found");
        }
        else {
          alert("Server error");
        }
      },
    });
  }
}