import { inject, Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Book } from '../model/book';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookService extends GenericService<Book> {
  private bookChange: Subject<Book[]> = new Subject<Book[]>;
    private messageChange: Subject<string> = new Subject<string>;
    constructor() {
      super(
        inject(HttpClient),
        `${environment.HOST}/books`
      );
    }
  
    ///////////////////////////////////
    setBookChange(data: Book[]) {
      this.bookChange.next(data);
    }
  
    getBookChange() {
      return this.bookChange.asObservable();
    }
  
    setMessageChange(data: string) {
      this.messageChange.next(data);
    }
  
    getMessageChange() {
      return this.messageChange.asObservable();
    }
}
