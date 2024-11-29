import { Injectable } from '@angular/core';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [];
  private nextId: number = 1;
  constructor() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.books = JSON.parse(storedBooks);
      this.nextId =
        this.books.length > 0
          ? Math.max(...this.books.map((b) => b.id!)) + 1
          : 1;
    } else {
      this.books = [
        {
          id: 1,
          title: 'Cinderella',
          author: 'Shreya Ved',
          isbn: '82776363673728',
          availability: 'available',
        },
      ];

      this.nextId = 2;
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  getBooks(): Book[] {
    return [...this.books];
  }

  getBook(id: number): Book | undefined {
    return this.books.find((b) => b.id === id);
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((b) => b.id !== id);
    this.updateSerialNumbers();
    this.saveToLocalStorage();
  }

  private updateSerialNumbers(): void {
    this.books = this.books.map((book, index) => ({
      ...book,
      id: index + 1,
    }));
    this.nextId = this.books.length + 1;
    this.saveToLocalStorage();
  }

  editBook(editedBook: Book): void {
    const index = this.books.findIndex((b) => b.id === editedBook.id);
    if (index !== -1) {
      this.books[index] = editedBook;
      this.saveToLocalStorage();
    }
  }

  addBook(book: Book): Book {
    const { id, ...dataWithoutId } = book;
    const newBook: Book = { id: this.nextId++, ...dataWithoutId };
    this.books.push(newBook);
    this.saveToLocalStorage();
    return newBook;
  }
}
