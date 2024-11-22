import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { DogsService } from '../services/dogs.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  elementos: any[] = [];
  isLoading = false;

  
  constructor(
    private booksService: BooksService,
    private dogsService: DogsService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getElements();
  }

  // Metodo para obtener los libros
  async getBooks(){
    const response = await this.booksService.listBooks(10).toPromise();
    const books = response.results;
    return books;
  }

  // Metodo para obtener una lista de razas de perros
  async getRandomDog() {
    const response =  await this.dogsService.getRandomImage().toPromise();  
    const imageDog = response.message;
    return imageDog;
  }

  // Unificar la respuesta en la lista de elementos
  async getElements() {
    this.isLoading = true;
    const libros = await this.getBooks();
    const elemento = {}

    libros.forEach((libro:any) => {
      this.elementos.push({
        title: libro.title,
        image: ""
      });
    });

    for (let i = 0; i < this.elementos.length; i++) {
      const image = await this.getRandomDog();
      this.elementos[i].image = image;
    }
    console.log(this.elementos);
    this.isLoading = false;
  }

  // Guardar en firebase el elemento
  async saveElement(element: any) {
    const resultado = await this.storageService.addNote({
      title: element.title,
      text: element.image
    });

    console.log(resultado);
    
  }
}
