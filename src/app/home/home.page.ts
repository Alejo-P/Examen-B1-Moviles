import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { DogsService } from '../services/dogs.service';
import { StorageService } from '../services/storage.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  elementos: any[] = [];
  isLoading = false;
  showModal = false;
  titleModal = '';
  textModal = '';

  constructor(
    private booksService: BooksService,
    private dogsService: DogsService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.getElements();
  }

  // Método para obtener los libros
  async getBooks(): Promise<any[]> {
    try {
      const response = await firstValueFrom(this.booksService.listBooks(10));
      return response.results || [];
    } catch (error) {
      console.error('Error al obtener libros:', error);
      return [];
    }
  }

  // Método para obtener una imagen aleatoria de perro
  async getRandomDog(): Promise<string> {
    try {
      const response = await firstValueFrom(this.dogsService.getRandomImage());
      return response.message || '';
    } catch (error) {
      console.error('Error al obtener imagen de perro:', error);
      return '';
    }
  }

  // Método para unificar la respuesta en la lista de elementos
  async getElements() {
    this.isLoading = true;
    try {
      const libros = await this.getBooks();
      this.elementos = await Promise.all(
        libros.map(async (libro: any) => {
          const image = await this.getRandomDog();
          return {
            title: libro.title,
            image,
          };
        })
      );
      console.log(this.elementos);
    } catch (error) {
      console.error('Error al obtener elementos:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Guardar en Firebase el elemento
  async saveElement(element: any) {
    try {
      const resultado = await this.storageService.addNote({
        title: element.title,
        text: element.image,
      });

      if (resultado) {
        this.showModalElement('Guardado', 'Elemento guardado correctamente');
      } else {
        this.showModalElement('Error', 'Error al guardar el elemento');
      }

      console.log('Resultado de guardar:', resultado);
    } catch (error) {
      console.error('Error al guardar elemento:', error);
      this.showModalElement('Error', 'Error al guardar el elemento');
    } finally {
      setTimeout(() => this.hideModal(), 4000);
    }
  }

  // Método para mostrar el modal
  showModalElement(title: string, text: string) {
    this.titleModal = title;
    this.textModal = text;
    this.showModal = true;
  }

  // Método para ocultar automáticamente el modal
  hideModal() {
    this.showModal = false;
  }
}

