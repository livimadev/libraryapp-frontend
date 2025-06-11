import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Author } from '../../../model/author';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthorService } from '../../../services/author.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-author-dialog',
  imports: [
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './author-dialog.component.html',
  styleUrl: './author-dialog.component.css'
})
export class AuthorDialogComponent {
  author: Author;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Author,
    private _dialogRef: MatDialogRef<AuthorDialogComponent>,
    private authorService: AuthorService
  ){}

  ngOnInit(): void {
    this.author = {... this.data}; //spread operator
    //this.author = this.data;
    /*this.author = new Author();
    this.author.idMedic = this.data.idAuthor;
    this.author.lastName = this.data.lastName;
    this.author.firstName = this.data.firstName;
    this.author.birthdate = this.data.birthdate;
    this.author.placeBirthdate = this.data.placeBirthdate;*/
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.author != null && this.author.idAuthor > 0){
      //UPDATE
      this.authorService.update(this.author.idAuthor, this.author)
        .pipe(switchMap ( () => this.authorService.findAll()))
        .subscribe(data => {
          this.authorService.setAuthorChange(data);
          this.authorService.setMessageChange('UPDATED!');
        });
    }else{
      //INSERT
      this.authorService.save(this.author)
        .pipe(switchMap ( () => this.authorService.findAll()))
        .subscribe(data => {
          this.authorService.setAuthorChange(data);
          this.authorService.setMessageChange('CREATED!');
        });
    }

    this.close();
  }
}
