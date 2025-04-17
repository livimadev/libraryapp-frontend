import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publisher } from '../model/publisher';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  private url: string=`${environment.HOST}/publishers`;

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Publisher[]>(this.url);
  }
}
