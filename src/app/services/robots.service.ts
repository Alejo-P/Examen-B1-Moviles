import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class RobotsService {
  API = "https://robohash.org/"; // https://robohash.
  constructor(
    private http: HttpClient
  ) { }


  // Metodo para obtener la lista de robots
  getRobot(cadena: string): Observable<any> {
    return this.http.get(`${this.API}${cadena}`);
  }

}
