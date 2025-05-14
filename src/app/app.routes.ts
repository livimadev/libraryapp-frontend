import { Routes } from '@angular/router';
import { PublisherComponent } from './pages/publisher/publisher.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [
    { path:'pages/publisher', component: PublisherComponent },
    { path: 'pages/category', component: CategoryComponent }
];
