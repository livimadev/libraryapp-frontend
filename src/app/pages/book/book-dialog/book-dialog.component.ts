import { Component, Inject } from '@angular/core';
import { Book } from '../../../model/book';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BookService } from '../../../services/book.service';
import { switchMap } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Publisher } from '../../../model/publisher';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { PublisherService } from '../../../services/publisher.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-book-dialog',
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.css'
})
export class BookDialogComponent {
  book: Book;
  publishers: Publisher[];
  categories: Category[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Book,
    private _dialogRef: MatDialogRef<BookDialogComponent>,
    private bookService: BookService,
    private publisherService: PublisherService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.book = { ... this.data }; //spread operator
    this.publisherService.findAll().subscribe(data => this.publishers = data);
    this.categoryService.findAll().subscribe(data => this.categories = data);
  }

  close() {
    this._dialogRef.close();
  }

  operate() {
    if (this.book != null && this.book.idBook > 0) {
      //UPDATE
      this.bookService.update(this.book.idBook, this.book)
        .pipe(switchMap(() => this.bookService.findAll()))
        .subscribe(data => {
          this.bookService.setBookChange(data);
          this.bookService.setMessageChange('UPDATED!');
        });
    } else {
      //INSERT
      this.bookService.save(this.book)
        .pipe(switchMap(() => this.bookService.findAll()))
        .subscribe(data => {
          this.bookService.setBookChange(data);
          this.bookService.setMessageChange('CREATED!');
        });
    }

    this.close();
  }
}
