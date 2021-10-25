import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
//Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { ProductoComponent } from './produto/producto.component';
import {HttpClientModule} from '@angular/common/http';
// Services
import { ProductoService } from './produto/producto.service';
import { ProductoAdmonComponent } from './producto-admon/producto-admon.component';
import { FormComponent } from './producto-admon/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator/paginator.component';
import { VistaProductoComponent } from './vista-producto/vista-producto.component';
import { LoginComponent } from './login/login.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuscadorComponent } from './buscador/buscador.component';

// Rutas
const routes: Routes = [
  {path: '', redirectTo: '/productos', pathMatch: 'full'},
  {path: 'productos', component: ProductoComponent},
  {path: 'productos/admon/page/:page', component: ProductoAdmonComponent},
  {path: 'productos/form', component: FormComponent},
  {path: 'productos/form/:id', component: FormComponent},
  {path: 'producto/vista/:id', component: VistaProductoComponent },
  {path: 'login', component: LoginComponent},
  {path: 'productos/disponibles/:term', component: BuscadorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductoComponent,
    ProductoAdmonComponent,
    FormComponent,
    PaginatorComponent,
    VistaProductoComponent,
    LoginComponent,
    BuscadorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
