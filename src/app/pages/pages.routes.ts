import { Routes } from "@angular/router";
import { CategoryComponent } from "./category/category.component";
import { PublisherComponent } from "./publisher/publisher.component";
import { PublisherEditComponent } from "./publisher/publisher-edit/publisher-edit.component";
import { AuthorComponent } from "./author/author.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BookComponent } from "./book/book.component";

export const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    {
        path: 'publisher', component: PublisherComponent,
        children: [
            { path: 'new', component: PublisherEditComponent }, // pages/publisher/new
            { path: 'edit/:id', component: PublisherEditComponent },// pages/publisher/edit/3
        ]
    },
    { path: 'author', component: AuthorComponent }, // pages/author
    { path: 'category', component: CategoryComponent },
    { path: 'book', component: BookComponent },
]