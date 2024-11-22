import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  API= "https://gutendex.com/books"

  private ids: String = ""

  constructor(
    private http: HttpClient
  ) { }

  // Metodo para listar todos los libros por ids
  listBooks(limite: number = 1): Observable<any> {
    this.ids = ""
    for (let i = 0; i <= limite; i++) {
      this.ids += i + ","
    }
    this.ids = this.ids.slice(0, -1)
    
    return this.http.get(`${this.API}//?ids=${this.ids}`);
  }
}
