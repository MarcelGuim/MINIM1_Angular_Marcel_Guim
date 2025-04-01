import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CalendarMessage, Calendar } from '../models/calendar.model';
import { Observable } from 'rxjs';
import { IValoraciones } from '../models/valoraciones.mode';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {

  constructor(private http: HttpClient) { }
  createValoracion(valoracion: IValoraciones): Observable<any> {
    return this.http.post(AuthService.apiUrl + "valoraciones/", valoracion);
  }

  getAllValoracionesPaginated(userId: string, page: number, limit: number): Observable<any>{
    return this.http.get(AuthService.apiUrl + "valoraciones/", {
      params: {
        page: page,
        limit: limit,
        userId: userId
      }
    });
  }

  getValoracion(valoracionId: string): Observable<any> {
    return this.http.get(AuthService.apiUrl + "valoraciones/" + valoracionId);
  }

  updateValoracion(valoracionId: string, valoracion: IValoraciones): Observable<any> {
    return this.http.put(AuthService.apiUrl + "valoraciones/"+valoracionId,valoracion);
  }

  deleteValoracion(valoracionId: string): Observable<any> {
    return this.http.delete(AuthService.apiUrl + "valoraciones/"+valoracionId);
  }
}
