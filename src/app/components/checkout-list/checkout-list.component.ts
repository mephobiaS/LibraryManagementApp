import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout-list.component.html',
  styleUrl: './checkout-list.component.css',
})
export class CheckoutListComponent implements OnInit {
  checkoutBooks: Book[] = [];

  ngOnInit(): void {
    this.checkoutBooks = JSON.parse(
      localStorage.getItem('checkoutList') || '[]'
    );
  }

  removeBook(bookId: number): void {
    const updatedList = this.checkoutBooks.filter((book) => book.id !== bookId);
    this.checkoutBooks = updatedList;
    localStorage.setItem('checkoutList', JSON.stringify(updatedList));
    alert(`Book returned!!`);
  }
}
