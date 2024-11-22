import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DogsService {
  API = "https://dog.ceo/api/breed";
  API_random = "https://dog.ceo/api/breeds/image/random";
  constructor(
    private http: HttpClient
  ) { }

  // Metodo para listar todos lo0s breeds
  listBreeds(): Observable<any> {
    return this.http.get(`${this.API}s/list/all`);
  }

  // Metodo para obtener una imagen de un breed
  getBreedImage(breed: string): Observable<any> {
    return this.http.get(`${this.API}/${breed}/image/random`);
  }

  // Metodo para obtener una imagen aleatoria
  getRandomImage(): Observable<any> {
    return this.http.get(this.API_random);
  }
}
