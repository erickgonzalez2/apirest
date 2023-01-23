import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { DetalleComponent } from './cliente/detalle/detalle.component';
import { FormComponent } from './cliente/form.component';
import { LoginComponent } from './login/login.component';
import { NavegacionComponent } from './navegacion/navegacion.component';

const routes: Routes = [    
  {path: '', component:LoginComponent},
  {path: 'navegacion', component: NavegacionComponent,
  children: [
    {path : 'dashboard/pagina/:page', component : ClienteComponent},
    {path : 'formulario', component : FormComponent},
    {path : 'formulario/:id', component : FormComponent},

  ]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
