import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { BrandHomeComponent } from './components/brand/brand-home/brand-home.component';
import { BrandFormComponent } from './components/brand/brand-form/brand-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe, SortByPipe } from '../pipes';
import { ProvidersHomeComponent } from './components/providers/providers-home/providers-home.component';
import { ProvidersFormComponent } from './components/providers/providers-form/providers-form.component';
import { ProductHomeComponent } from './components/product/product-home/product-home.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { LotHomeComponent } from './components/lot/lot-home/lot-home.component';
import { LotFormComponent } from './components/lot/lot-form/lot-form.component';
import { ProductCategoryHomeComponent } from './components/product_category/product-category-home/product-category-home.component';
import { ProductCategoryFormComponent } from './components/product_category/product-category-form/product-category-form.component';
import { PurchaseHeaderFormComponent } from './components/purchase/purchase-header-form/purchase-header-form.component';
import { FiltradoproviderPipe } from './pipes/filtradoprovider.pipe';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeHomeComponent } from './components/employee/employee-home/employee-home.component';
import { BillHeaderFormComponent } from './components/sales/bill-header-form/bill-header-form.component';
import { InventoryHomeComponent } from './components/inventory/inventory-home/inventory-home.component';
import { InventoryFormComponent } from './components/inventory/inventory-form/inventory-form.component';
import { FitradoproductPipe } from './pipes/fitradoproduct.pipe';
import { EmployeePositionHomeComponent } from './components/employee_position/employee-position-home/employee-position-home.component';
import { EmployeePositionFormComponent } from './components/employee_position/employee-position-form/employee-position-form.component';
import { FiltradocustomersPipe } from './pipes/filtradocustomers.pipe';
import { FiltradopresentationPipe } from './pipes/filtradopresentation.pipe';
import { CustomersHomeComponent } from './components/customers/customers-home/customers-home.component';
import { CustomersFormComponent } from './components/customers/customers-form/customers-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaymentHomeComponent } from './components/payment/payment-home/payment-home.component';
import { PaymentFormComponent } from './components/payment/payment-form/payment-form.component';
import { PaymentTypeComponent } from './components/payment_type_detail/payment-type-home/payment-type.component';
import { PaymentTypeFormComponent } from './components/payment_type_detail/payment-type-form/payment-type-form.component';
import { PaymentPurchaseHomeComponent } from './components/payment_purchase/payment-purchase-home/payment-purchase-home.component';
import { PaymentPurchaseFormComponent } from './components/payment_purchase/payment-purchase-form/payment-purchase-form.component';
import { PaymentDetailHomeComponent } from './components/payment_detail_purchase/payment-detail-home/payment-detail-home.component';
import { PaymentDetailFormComponent } from './components/payment_detail_purchase/payment-detail-form/payment-detail-form.component';
import { FiltradoEmpleadosPipe } from './pipes/filtrado-empleados.pipe';
import { FilterEmployeePosPipe } from './pipes/filter-employee-pos.pipe';
import { FilterProvidersPipe } from './pipes/filter-providers.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterProductCatPipe } from './pipes/filter-product-cat.pipe';
import { FilterLotPipe } from './pipes/filter-lot.pipe';
import { FiltradoinventoryPipe } from './pipes/filtradoinventory.pipe';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { CheckloginGuard } from './guards/checklogin.guard';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { AccountsReceivableComponent } from './components/accounts_receivable/accounts-receivable/accounts-receivable.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DebsToPayHomeComponent } from './components/debs_to_pay/debs-to-pay-home/debs-to-pay-home.component';
import { PurchaseReportsHomeComponent } from './components/purchase_reports/purchase-reports-home/purchase-reports-home.component';
import { DebsPayHomeComponent } from './components/purchase_reports/debs-pay-home/debs-pay-home.component';
import { InventoryReportsHomeComponent } from './components/inventory_reports/inventory-reports-home/inventory-reports-home.component';

const routes: Route[] = [
  //Brand
  { path: 'brand-form', component: BrandFormComponent ,canActivate:[CheckloginGuard] },
  { path: 'brand-home', component: BrandHomeComponent ,canActivate:[CheckloginGuard] },
  { path: 'brand-form/:id', component: BrandFormComponent ,canActivate:[CheckloginGuard] }, 
  //Provider
  { path: 'providers-home', component: ProvidersHomeComponent,canActivate:[CheckloginGuard] },
  { path: 'providers-form', component: ProvidersFormComponent ,canActivate:[CheckloginGuard] },
  { path: 'providers-form/:id', component: ProvidersFormComponent ,canActivate:[CheckloginGuard] },
  //Product
  { path: 'product-home', component: ProductHomeComponent ,canActivate:[CheckloginGuard] },
  { path: 'product-form', component: ProductFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'product-form/:id', component: ProductFormComponent,canActivate:[CheckloginGuard]  },
  //Product Category
  { path: 'product-category-home', component: ProductCategoryHomeComponent,canActivate:[CheckloginGuard]  },
  { path: 'product-category-form', component: ProductCategoryFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'product-category-form/:id', component: ProductCategoryFormComponent,canActivate:[CheckloginGuard]  },
  //Lot
  { path: 'lot-home', component: LotHomeComponent,canActivate:[CheckloginGuard]  },
  { path: 'lot-form/:id', component: LotFormComponent,canActivate:[CheckloginGuard] },
  { path: 'lot-form', component: LotFormComponent,canActivate:[CheckloginGuard]  },
  //Purchase Header
  { path: 'purchase_header-form', component: PurchaseHeaderFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'product-form', component: ProductFormComponent,canActivate:[CheckloginGuard]  },
  //Bill Header
  { path: 'bill-header-form', component: BillHeaderFormComponent,canActivate:[CheckloginGuard]  },
  //Inventory
  { path: 'inventory-home', component: InventoryHomeComponent,canActivate:[CheckloginGuard]  },
  { path: 'inventory-form', component: InventoryFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'inventory-form/:id', component: InventoryFormComponent,canActivate:[CheckloginGuard]  },
  //Employee
  { path: 'employee-home', component: EmployeeHomeComponent,canActivate:[CheckloginGuard]  },
  { path: 'employee-form', component: EmployeeFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'employee-form/:id', component: EmployeeFormComponent,canActivate:[CheckloginGuard]  },
  //Employee Position
  { path: 'employee-position-home', component: EmployeePositionHomeComponent,canActivate:[CheckloginGuard]  },
  { path: 'employee-position-form', component: EmployeePositionFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'employee-position-form/:id', component: EmployeePositionFormComponent,canActivate:[CheckloginGuard]  },
  //Customers
  { path: 'customers-home', component: CustomersHomeComponent,canActivate:[CheckloginGuard]  },
  { path: 'customers-form', component: CustomersFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'customers-form/:id', component: CustomersFormComponent,canActivate:[CheckloginGuard]  },
  //Payment
  { path: 'payment-home', component: PaymentHomeComponent,canActivate:[CheckloginGuard]  },
  { path: 'payment-form', component: PaymentFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'payment-form/:id', component: PaymentFormComponent,canActivate:[CheckloginGuard]  },
   //Payment type detail
  { path: 'payment-type-home', component: PaymentTypeComponent,canActivate:[CheckloginGuard]  },
  { path: 'payment-type-form', component: PaymentTypeFormComponent,canActivate:[CheckloginGuard] },
  { path: 'payment-type-form/:id', component: PaymentTypeFormComponent,canActivate:[CheckloginGuard]  },
  //Payment purchase
  { path: 'payment-purchase-home', component: PaymentPurchaseHomeComponent,canActivate:[CheckloginGuard]  },
  { path: 'payment-purchase-form', component: PaymentPurchaseFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'payment-purchase-form/:id', component: PaymentPurchaseFormComponent,canActivate:[CheckloginGuard]  },
  //Payment Detail Purchase
  { path: 'payment-detail-purchase-home', component: PaymentDetailHomeComponent,canActivate:[CheckloginGuard]  },
  { path: 'payment-detail-purchase-form', component: PaymentDetailFormComponent,canActivate:[CheckloginGuard]  },
  { path: 'payment-detail-purchase-form/:id', component: PaymentDetailFormComponent,canActivate:[CheckloginGuard]  },
  //Login
  { path: 'login', component: LoginFormComponent},
  //Login design
  { path: 'login2', component: LoginComponent},
  //user
  {path: 'user',component:UserFormComponent,canActivate:[CheckloginGuard]},
  //accounts receivable
  { path: 'accounts-receivable', component: AccountsReceivableComponent,canActivate:[CheckloginGuard]},
  { path: 'home', component: HomeComponent,canActivate:[CheckloginGuard] },
  //Debs to Pay
  { path: 'debs-to-pay-home', component: DebsToPayHomeComponent,canActivate:[CheckloginGuard] },
  //Purchase Reports
  { path: 'purchase-reports-home', component: PurchaseReportsHomeComponent,canActivate:[CheckloginGuard] },
  { path: 'debs-pay-home', component: DebsPayHomeComponent,canActivate:[CheckloginGuard] },
   //Inventory Reports
   { path: 'inventory-reports-home', component: InventoryReportsHomeComponent,canActivate:[CheckloginGuard] },
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
    EmployeePositionHomeComponent,
    EmployeePositionFormComponent,
    FiltradocustomersPipe,
    FiltradopresentationPipe,
    CustomersHomeComponent,
    CustomersFormComponent,
    PaymentHomeComponent,
    PaymentFormComponent,
    PaymentTypeComponent,
    PaymentTypeFormComponent,
    PaymentPurchaseHomeComponent,
    PaymentPurchaseFormComponent,
    PaymentDetailHomeComponent,
    PaymentDetailFormComponent,
    FiltradoEmpleadosPipe,
    FilterEmployeePosPipe,
    FilterProvidersPipe,
    FilterBrandPipe,
    FilterProductCatPipe,
    FilterLotPipe,
    FiltradoinventoryPipe,
    AccountsReceivableComponent,
    HomeComponent,
    LoginFormComponent,
    DebsToPayHomeComponent,
    UserFormComponent,
    PurchaseReportsHomeComponent,
    DebsPayHomeComponent,
    InventoryReportsHomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
