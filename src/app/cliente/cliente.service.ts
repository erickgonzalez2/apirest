import { Injectable } from "@angular/core";
import { DatePipe, formatDate} from "@angular/common";
import { Router } from "@angular/router";
import { Cliente } from "./cliente";
import {Observable, map, catchError, throwError, tap} from 'rxjs'
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import Swal from "sweetalert2";
import { Region } from "./region";



@Injectable()
export class ClienteService{

    private url : string = "http://localhost:8080/api/clientes";

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http : HttpClient,
        private _router : Router){
        
    }


    getClientes(page : string ): Observable<any>{
     
        return this.http.get(this.url+'/page/'+page).pipe(
            
            tap((response : any) => {
                (response.content as Cliente[]).forEach(cliente => {                        
                })                
            }),
            map( (response : any) => {    
                (response.content as Cliente[]).map(cliente =>{
                    cliente.nombre = cliente.nombre.toUpperCase();                                                        
                    cliente.createAt = formatDate(cliente.createAt, 'EEEE dd MMMM yyyy','es-MX');
                    

                return cliente;
                });  
                return response;     
            }),
            tap(response => {
                (response.content as Cliente []).forEach(cliente => {
                    
                })
            })
        )
    }


    create(cliente: Cliente) : Observable<Cliente> {
         return this.http.post<Cliente>(this.url,cliente,{headers:this.httpHeaders}).pipe(
            catchError(e =>{
                
                if(e.status == 400){
                    return throwError (() => {
                        return e;
                    })
                }


                Swal.fire('Error', e.error.Exception, 'error');
                return throwError (() => {
                    return e.error.Exception;
                })
            })
         )
    }


    getCliente(id:string):Observable<Cliente>{
        return this.http.get<Cliente>(this.url+'/id/'+id).pipe(
            
            catchError(e => {
                
                Swal.fire('Error', e.error.Exception,'error');
                return throwError (() => {
                    return e.error.Exception;
                })

                
            })
        )
    }


    update(cliente : Cliente) : Observable<Cliente>{
        return this.http.put<Cliente>(this.url+'/'+cliente.id, cliente, {headers: this.httpHeaders}).pipe(
            catchError(e => {

                if(e.status == 400){
                    return throwError (() => {
                        return e;
                    })
                }
                
                Swal.fire('Error',e.error.Exception,'error');
                return throwError (() => {
                    return e.error.Exception;
                })
            })
        )            
    }

    delete(id : number) : Observable<Cliente>{
        return this.http.delete<Cliente>(this.url+'/id/'+id, {headers: this.httpHeaders}).pipe(
            catchError(e => {
                
                Swal.fire('Error',e.error.Exception,'error');
                return throwError (() => {
                    return e.error.Exception;
                })
            })
        )
    }

subirFoto(archivo : File , id : number) : Observable <HttpEvent<{}>>{

    let formData = new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id.toString());

    const req = new HttpRequest('POST', this.url+'/upload', formData, {
        reportProgress: true
      });



    return this.http.request(req);
    
}


    getRegiones(): Observable<Region[]>{
        return this.http.get<Region[]>(this.url+'/regiones');
    }

}