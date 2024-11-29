import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../model/book.model';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-edit-book',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-book.component.html',
  styleUrl: './add-edit-book.component.css',
})
export class AddEditBookComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    author: new FormControl('', [Validators.required, Validators.minLength(2)]),
    isbn: new FormControl('', [Validators.required, Validators.minLength(10)]),
    availability: new FormControl('', [Validators.required]),
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}
  isEditMode: boolean = false;
  bookId: number | null = null;

  ngOnInit(): void {
    // Check if for editing
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.bookId = +id;
        const book = this.bookService.getBook(this.bookId);
        if (book) {
          this.bookForm.patchValue(book);
        } else {
          console.error('Book not found');
          this.router.navigate(['/books']);
        }
      }
    });
  }

  onAdding(): void {
    if (this.bookForm.valid) {
      const { title, author, isbn, availability } = this.bookForm.value;
      if (this.isEditMode && this.bookId !== null) {
        const updatedBook: Book = {
          id: this.bookId,
          title,
          author,
          isbn,
          availability,
        };
        this.bookService.editBook(updatedBook);
      } else {
        const newBook: Omit<Book, 'id'> = { title, author, isbn, availability };
        this.bookService.addBook(newBook);
      }
      this.router.navigate(['/books']);
    } else {
      console.log('Form is invalid');
    }
  }
}
