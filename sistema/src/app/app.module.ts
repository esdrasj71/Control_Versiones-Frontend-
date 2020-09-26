import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Route, RouterModule} from '@angular/router';
import { BrandHomeComponent } from './components/brand/brand-home/brand-home.component';
import { BrandFormComponent } from './components/brand/brand-form/brand-form.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {FilterPipe, SortByPipe} from '../pipes';
import { ProvidersHomeComponent } from './components/providers/providers-home/providers-home.component';
import { ProvidersFormComponent } from './components/providers/providers-form/providers-form.component';

const routes: Route[]=[
  {path: 'brand-form', component:BrandFormComponent},
  {path: 'brand-home', component:BrandHomeComponent},
  {path: 'brand-home/:id', component: BrandHomeComponent},
  {path: 'providers-home', component: ProvidersHomeComponent},
  {path: 'providers-form', component: ProvidersFormComponent},
  {path: 'providers-form/:id', component: ProvidersFormComponent}
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
