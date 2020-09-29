import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule} from '@angular/router';
import { BrandHomeComponent } from './components/brand/brand-home/brand-home.component';
import { BrandFormComponent } from './components/brand/brand-form/brand-form.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { FilterPipe, SortByPipe} from '../pipes';
import { ProvidersHomeComponent } from './components/providers/providers-home/providers-home.component';
import { ProvidersFormComponent } from './components/providers/providers-form/providers-form.component';
import { ProductCategoryHomeComponent } from './components/product_category/product-category-home/product-category-home.component';
import { ProductCategoryFormComponent } from './components/product_category/product-category-form/product-category-form.component';
import { InventoryHomeComponent } from './components/inventory/inventory-home/inventory-home.component';
import { InventoryFormComponent } from './components/inventory/inventory-form/inventory-form.component';

const routes: Route[]=[
  //Brand
  {path: 'brand-form', component:BrandFormComponent},
  {path: 'brand-home', component:BrandHomeComponent},
  {path: 'brand-home/:id', component: BrandHomeComponent},

  //Provider
  {path: 'providers-home', component: ProvidersHomeComponent},
  {path: 'providers-form', component: ProvidersFormComponent},
  {path: 'providers-form/:id', component: ProvidersFormComponent},

  //Product_Category
  {path: 'product-category-home', component: ProductCategoryHomeComponent},
  {path: 'product-category-form', component: ProductCategoryFormComponent},
  {path: 'product-category-form/:id', component: ProductCategoryFormComponent},

  //Inventory
  {path: 'inventory-home', component: InventoryHomeComponent},
  {path: 'inventory-form', component: InventoryFormComponent},

  //Product
  {path: 'product-category-home', component: ProductCategoryHomeComponent},
  {path: 'product-category-form', component: ProductCategoryFormComponent},
  {path: 'product-category-form/:id', component: ProductCategoryFormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    BrandHomeComponent,
    BrandFormComponent,
    FilterPipe,
    SortByPipe,
    ProvidersHomeComponent,
    ProvidersFormComponent,
    ProductCategoryHomeComponent,
    ProductCategoryFormComponent,
    InventoryHomeComponent,
    InventoryFormComponent,
    ProductCategoryHomeComponent,
    ProductCategoryFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
