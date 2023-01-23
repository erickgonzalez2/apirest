import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'

import  {HttpClientModule} from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ClienteComponent } from './cliente/cliente.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { formatDate, registerLocaleData } from "@angular/common";
import localEs from '@angular/common/locales/es-MX'
import { LoginComponent } from './login/login.component';
import { NavegacionComponent} from './navegacion/navegacion.component';
import { MatIconModule } from '@angular/material/icon';
import { ClienteService } from './cliente/cliente.service';
import { FormComponent } from './cliente/form.component';
import { FormsModule } from '@angular/forms';
import { DetalleComponent } from './cliente/detalle/detalle.component';

registerLocaleData(localEs,'es-MX');

@NgModule({
  declarations: [
     AppComponent,
     ClienteComponent,
     LoginComponent,
     NavegacionComponent,
     FormComponent,
     DetalleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ],
  providers: [ClienteService, {provide: LOCALE_ID, useValue: 'es-MX' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
