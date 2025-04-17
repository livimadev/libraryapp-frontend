import { Component, inject } from '@angular/core';
import { PublisherService } from '../../services/publisher.service';
import { Publisher } from '../../model/publisher';

@Component({
  selector: 'app-publisher',
  imports: [],
  templateUrl: './publisher.component.html',
  styleUrl: './publisher.component.css'
})
export class PublisherComponent {
  publishers: Publisher[];

  //constructor(private publisherService: PublisherService){}
  publisherService = inject(PublisherService);

  ngOnInit():void{
    // this.publisherService.findAll().subscribe(data => console.log(data));
    this.publisherService.findAll().subscribe(data => this.publishers = data);
  }
}
