import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { DetalleComponent } from './cliente/detalle/detalle.component';
import { FormComponent } from './cliente/form.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { NavegacionComponent } from './navegacion/navegacion.component';

const routes: Routes = [    
  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'navegacion', component: NavegacionComponent,
  children: [
    {path : 'dashboard/pagina/:page', component : ClienteComponent, canActivate: [AuthGuard]},
    {path : 'formulario', component : FormComponent , canActivate: [AuthGuard]},
    {path : 'formulario/:id', component : FormComponent , canActivate: [AuthGuard]},
    {path : 'facturas/:id', component : DetalleFacturaComponent , canActivate: [AuthGuard]},
    {path : 'facturasForm/:clienteId', component : FacturasComponent , canActivate: [AuthGuard]},
  ], canActivate: [AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
