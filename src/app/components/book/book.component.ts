import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../model/book.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  books: Book[] = [
    {
      id: 1,
      title: 'Cinderella',
      author: 'Shreya Ved',
      isbn: '82776363673728',
      availability: 'available',
    },
  ];

  constructor(
    private bookService: BookService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  onEdit(id: number): void {
    this.router.navigate([`/edit/${id}`]);
  }

  onAdd() {
    this.router.navigate(['/add']);
  }

  confirmDelete(id: number) {
    this.bookService.deleteBook(id);
    this.books = this.bookService.getBooks();
  }

  onLogout() {
    this.authService.logout();
  }

  checkout(bookId: number): void {
    const book = this.bookService.getBook(bookId);
    if (book) {
      let checkoutList = JSON.parse(
        localStorage.getItem('checkoutList') || '[]'
      );
      checkoutList.push(book);
      localStorage.setItem('checkoutList', JSON.stringify(checkoutList));

      alert(`Book: ${book.title} added to checkout!`);
    }
  }
  onCheckout() {
    this.router.navigate(['/checkout']);
  }

  viewBook(bookId: number): void {
    this.router.navigate([`/view/${bookId}`]);
  }
}
