import { Component, ViewChild } from '@angular/core';
import { Book } from '../../model/book';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BookService } from '../../services/book.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { RouterOutlet } from '@angular/router';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    RouterOutlet,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  dataSource: MatTableDataSource<Book>;

  columnsDefinitions = [
    { def: 'idBook', label: 'idBook', hide: true },
    { def: 'titulo', label: 'Title', hide: false },
    { def: 'subtitulo', label: 'Subtitle', hide: false },
    { def: 'description', label: 'Description', hide: false },
    { def: 'idCategory', label: 'Category', hide: true },
    { def: 'idPublisher', label: 'Publisher', hide: true },
    { def: 'actions', label: 'actions', hide: false }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private bookService: BookService, // inyecta el servicio
    private _dialog: MatDialog, // para abrir el modal
    private _snackBar: MatSnackBar // Notificaciones
  ) { }

  ngOnInit(): void {
    this.bookService.findAll().subscribe(data => {
      this.createTable(data);
    });

    this.bookService.getBookChange().subscribe(data => this.createTable(data));

    this.bookService.getMessageChange().subscribe(
      data =>
        this._snackBar.open(data, 'INFO',
          { duration: 2000, horizontalPosition: 'right', verticalPosition: 'bottom' }
        )
    );
  }

  // Método de creación de la tabla
  createTable(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Método para habilitar la búsqueda en la tabla
  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }

  // Método para mostrar solo las columnas que no tienen el atributo hide=true
  getDisplayedColumns() {
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  // Metodo para elimar
  delete(id: number) {
    this.bookService.delete(id)
      .pipe(switchMap(() => this.bookService.findAll()))
      .subscribe(data => {
        this.bookService.setBookChange(data);
        this.bookService.setMessageChange('Book DELETED!')
      })
  }

  // Metodo para abrir el modal
  openDialog(book?: Book) {
    this._dialog.open(BookDialogComponent, {
      width: '750px',
      data: book
    });
  }
}
