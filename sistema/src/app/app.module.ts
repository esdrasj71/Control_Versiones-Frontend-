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
import { BillHeaderFormComponent } from './components/sales/bill-header-form/bill-header-form.component';
import { InventoryHomeComponent } from './components/inventory/inventory-home/inventory-home.component';
import { InventoryFormComponent } from './components/inventory/inventory-form/inventory-form.component';
import { FitradoproductPipe } from './pipes/fitradoproduct.pipe';
import { FiltradocustomersPipe } from './pipes/filtradocustomers.pipe';
import { CustomersHomeComponent } from './components/customers/customers-home/customers-home.component';
import { CustomersFormComponent } from './components/customers/customers-form/customers-form.component';


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

  {path: 'bill-header-form', component: BillHeaderFormComponent},
  {path: 'inventory-home', component: InventoryHomeComponent},
  {path: 'inventory-form', component: InventoryFormComponent},

  //customers
  {path: 'customer-home', component: CustomersHomeComponent},
  {path: 'customer-form', component: CustomersFormComponent},
  
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
    InventoryHomeComponent,
    InventoryFormComponent,
    FitradoproductPipe,
    FiltradocustomersPipe,
    CustomersHomeComponent,
    CustomersFormComponent

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
