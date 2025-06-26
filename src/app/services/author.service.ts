import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Author } from '../model/author';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends GenericService<Author> {
  private authorChange: Subject<Author[]> = new Subject<Author[]>;
  private messageChange: Subject<string> = new Subject<string>;
  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/authors`
    );
  }

  ///////////////////////////////////
  setAuthorChange(data: Author[]) {
    this.authorChange.next(data);
  }

  getAuthorChange() {
    return this.authorChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
