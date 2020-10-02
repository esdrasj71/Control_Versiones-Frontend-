import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule} from '@angular/router';
import { BrandHomeComponent } from './components/brand/brand-home/brand-home.component';
import { BrandFormComponent } from './components/brand/brand-form/brand-form.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe, SortByPipe} from '../pipes';
import { ProvidersHomeComponent } from './components/providers/providers-home/providers-home.component';
import { ProvidersFormComponent } from './components/providers/providers-form/providers-form.component';
import { ProductHomeComponent } from './components/product/product-home/product-home.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { LotHomeComponent } from './components/lot/lot-home/lot-home.component';
import { LotFormComponent } from './components/lot/lot-form/lot-form.component';
import { ProductCategoryHomeComponent } from './components/product_category/product-category-home/product-category-home.component';
import { ProductCategoryFormComponent } from './components/product_category/product-category-form/product-category-form.component';
import { PresentationHomeComponent } from './components/presentation/presentation-home/presentation-home.component';
import { PresentationFormComponent } from './components/presentation/presentation-form/presentation-form.component';
import { PurchaseHeaderFormComponent } from './components/purchase/purchase-header-form/purchase-header-form.component';
import { FiltradoproviderPipe } from './pipes/filtradoprovider.pipe';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { BillHeaderFormComponent } from './components/sales/bill-header-form/bill-header-form.component';
import { InventoryHomeComponent } from './components/inventory/inventory-home/inventory-home.component';
import { InventoryFormComponent } from './components/inventory/inventory-form/inventory-form.component';
import { FitradoproductPipe } from './pipes/fitradoproduct.pipe';
import { FiltradopresentationPipe } from './pipes/filtradopresentation.pipe';

const routes: Route[]=[
  //Brand
  {path: 'brand-form', component:BrandFormComponent},
  {path: 'brand-home', component:BrandHomeComponent},
  {path: 'brand-home/:id', component: BrandHomeComponent},
  //Provider
  {path: 'providers-home', component: ProvidersHomeComponent},
  {path: 'providers-form', component: ProvidersFormComponent},
  {path: 'providers-form/:id', component: ProvidersFormComponent},
  //Product
  {path: 'product-home', component: ProductHomeComponent},
  {path: 'product-form', component: ProductFormComponent},
  //Presentation
  {path: 'presentation-home', component: PresentationHomeComponent},
  {path: 'presentation-form/:id', component: PresentationFormComponent},
  {path: 'presentation-form', component: PresentationFormComponent},
  {path: 'presentation-home/:id', component: LotHomeComponent},
  //Product Category
  {path: 'product-category-home', component: ProductCategoryHomeComponent},
  {path: 'product-category-form', component: ProductCategoryFormComponent},
  {path: 'product-category-form/:id', component: ProductCategoryFormComponent},
  //Lot
  {path: 'lot-home', component: LotHomeComponent},
  {path: 'lot-form/:id', component: LotFormComponent},
  {path: 'lot-form', component: LotFormComponent},
  //Purchase Header
  {path: 'purchase_header-form', component: PurchaseHeaderFormComponent},
  {path: 'product-form', component: ProductFormComponent},
  //Bill Header
  {path: 'bill-header-form', component: BillHeaderFormComponent},
  //Inventory
  {path: 'inventory-home', component: InventoryHomeComponent},
  {path: 'inventory-form', component: InventoryFormComponent},
  {path: 'inventory-form/:id', component: InventoryFormComponent},
  //Employee
  {path: 'employee-home', component: EmployeeHomeComponent},
  {path: 'employee-form', component: EmployeeFormComponent},

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
    ProductHomeComponent,
    ProductFormComponent,
    LotHomeComponent,
    LotFormComponent,
    ProductCategoryHomeComponent,
    ProductCategoryFormComponent,
    PresentationHomeComponent,
    PresentationFormComponent,
    LotHomeComponent,
    LotFormComponent,
    PurchaseHeaderFormComponent,
    FiltradoproviderPipe,
    BillHeaderFormComponent,
    EmployeeHomeComponent,
    EmployeeFormComponent,
    InventoryHomeComponent,
    InventoryFormComponent,
    FitradoproductPipe,
    FiltradopresentationPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
