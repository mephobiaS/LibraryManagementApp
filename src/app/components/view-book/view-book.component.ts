import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../model/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.css',
})
export class ViewBookComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.book = this.bookService.getBook(id);
    if (!this.book) {
      alert('Book not found');
      this.router.navigate(['/books']);
    }
  }

  back() {
    this.router.navigate(['/books']);
  }
}
