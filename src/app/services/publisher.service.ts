import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Publisher } from '../model/publisher';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PublisherService extends GenericService<Publisher> {
  //private url: string=`${environment.HOST}/publishers`;
  private publisherChange: Subject<Publisher[]> = new Subject<Publisher[]>;
  private messageChange: Subject<string> = new Subject<string>;

  constructor(){
    super(
      inject(HttpClient),
      `${environment.HOST}/publishers`
    );
  }

  //constructor(private http: HttpClient) { }

  /*findAll(){
    return this.http.get<Publisher[]>(this.url);
  }

  findById(id: number){
    return this.http.get<Publisher>(`${this.url}/${id}`);
  }

  save(publisher: Publisher){
    return this.http.post(this.url, publisher);
  }

  update(id:number, publisher: Publisher){ // this.url + "/" + id
    return this.http.put(`${this.url}/${id}`, publisher);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }*/

  ///////////////////////////////////
  setPublisherChange(data: Publisher[]){
    this.publisherChange.next(data);
  }

  getPublisherChange(){
    return this.publisherChange.asObservable();
  }

  setMessageChange(data: string){
    this.messageChange.next(data);
  }

  getMessageChange(){
    return this.messageChange.asObservable();
  }
}
