import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCategoryHomeComponent } from './product-category-home/product-category-home.component';
import { ProductCategoryFormComponent } from './product-category-form/product-category-form.component';
import {Route, RouterModule} from '@angular/router';
import { BrandHomeComponent } from './brand-home/brand-home.component';
import { BrandFormComponent } from './brand-form/brand-form.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FilterPipe, SortByPipe} from '../pipes';

const routes: Route[]=[
  {path: '', component: ProductCategoryHomeComponent},
  {path: 'product-category-home', component:ProductCategoryHomeComponent},
  {path: 'product-category-form', component:ProductCategoryFormComponent},
  {path: 'brand-form', component:BrandFormComponent},
  {path: 'brand-home', component:BrandHomeComponent},
  {path: 'brand-home/:id', component: BrandHomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryHomeComponent,
    ProductCategoryFormComponent,
    BrandHomeComponent,
    BrandFormComponent,
    FilterPipe,
    SortByPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
