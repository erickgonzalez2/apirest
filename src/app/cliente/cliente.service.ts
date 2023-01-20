import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Cliente } from "./cliente";
import {Observable, map, catchError, throwError} from 'rxjs'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";

@Injectable()
export class ClienteService{

    private url : string = "http://localhost:8080/api/clientes"

    constructor(private http : HttpClient,
        private _router : Router){

    }

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    getClientes(): Observable<Cliente[]>{
     
        //return of (CLIENTES);
        return this.http.get<Cliente[]>(this.url);
    }


    create(cliente: Cliente) : Observable<Cliente> {
         return this.http.post<Cliente>(this.url,cliente,{headers:this.httpHeaders}).pipe(
            catchError(e =>{
                this._router.navigate(['/navegacion']);
                Swal.fire('Error', e.error.Mensaje, 'error');
                return throwError (() => {
                    return e.error.Exception;
                })
            })
         )
    }


    getCliente(id:string):Observable<Cliente>{
        return this.http.get<Cliente>(this.url+'/'+id).pipe(
            catchError(e => {
                this._router.navigate(['/navegacion/formulario']);
                Swal.fire('Error', e.error.Mensaje,'error');
                return throwError (() => {
                    return e.error.Exception;
                })

                
            })
        )
    }


    update(cliente : Cliente) : Observable<Cliente>{
        return this.http.put<Cliente>(this.url+'/'+cliente.id, cliente, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                this._router.navigate(['navegacion/formulario']);
                Swal.fire('Error',e.error.Mensaje,'error');
                return throwError (() => {
                    return e.error.Exception;
                })
            })
        )            
    }

    delete(id : number) : Observable<Cliente>{
        return this.http.delete<Cliente>(this.url+'/'+id, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                this._router.navigate(['navegacion/formulario']);
                Swal.fire('Error',e.error.Mensaje,'error');
                return throwError (() => {
                    return e.error.Exception;
                })
            })
        )
    }
}