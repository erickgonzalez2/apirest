import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ClienteService } from '../cliente/cliente.service';
import { FacturasService } from '../facturas/services/facturas.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private apiService : ApiService,
    private router: Router,
    
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.apiService.getToken()){
      return true;
      }
  

      else{
        this.router.navigate(['login']);
        return false;
      }


  }
  
}
