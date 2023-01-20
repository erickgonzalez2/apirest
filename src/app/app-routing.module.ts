import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { FormComponent } from './cliente/form.component';
import { LoginComponent } from './login/login.component';
import { NavegacionComponent } from './navegacion/navegacion.component';

const routes: Routes = [    
  {path: '', component:LoginComponent}  ,
  {path: 'navegacion/:componente', component:NavegacionComponent},
  {path: 'navegacion/:componente/:id', component:NavegacionComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
