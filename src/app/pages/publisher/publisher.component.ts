import { Component, inject, ViewChild } from '@angular/core';
import { PublisherService } from '../../services/publisher.service';
import { Publisher } from '../../model/publisher';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterLink, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publisher',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInput,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    RouterOutlet,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.css'
})
export class PublisherComponent {
  // displayedColumns: string[] = ['idPublisher', 'name', 'address'];
  dataSource: MatTableDataSource<Publisher>;
  // publishers: Publisher[];
  columnsDefinitions = [
    { def: 'idPublisher', label: 'idPublisher', hide: true },
    { def: 'name', label: 'name', hide: false },
    { def: 'address', label: 'address', hide: false },    
    { def: 'actions', label: 'actions', hide: false }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements: number = 0;

  constructor(
    private publisherService: PublisherService,
    private _snackBar: MatSnackBar
  ){}
  //publisherService = inject(PublisherService);

  ngOnInit():void{
    // this.publisherService.findAll().subscribe(data => console.log(data));
    // this.publisherService.findAll().subscribe(data => this.publishers = data);
    // this.publisherService.findAll().subscribe(data => {
    //   this.createTable(data);
    // });

    this.publisherService.listPageable(0, 10).subscribe(data => {
      this.createTable(data.content);
      this.totalElements = data.totalElements
    });

    this.publisherService.getPublisherChange().subscribe(data => this.createTable(data));

    // this._snackBar.open("Mensaje de prueba",'INFO', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'bottom'});

    this.publisherService.getMessageChange().subscribe(
      data => 
        this._snackBar.open(data,'INFO', 
          {duration: 2000, horizontalPosition: 'right', verticalPosition: 'bottom'}
        )
    );
  }

  // Método de creación de la tabla
  createTable(data){
    this.dataSource = new MatTableDataSource(data);
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Método para habilitar la búsqueda en la tabla
  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();
  }

  // Método para mostrar solo las columnas que no tienen el atributo hide=true
  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  // Metodo para elimar
  delete(id: number){
    this.publisherService.delete(id)
      .pipe(switchMap(() => this.publisherService.findAll()))
      .subscribe( data => {
        this.publisherService.setPublisherChange(data);
        this.publisherService.setMessageChange('Publisher DELETED!')
      })
  }

  showMore(e: any){
    this.publisherService.listPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.createTable(data.content)
      this.totalElements = data.totalElements;
    });
  }

}
