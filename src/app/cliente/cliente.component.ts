
import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente'
import { ClienteService } from './cliente.service';
import { CLIENTES } from './clientes.json';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavegacionComponent } from '../navegacion/navegacion.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.sass']
})
export class ClienteComponent implements OnInit {

clientes : Cliente[];




  constructor(private clienteService: ClienteService,
   ){
    
    this.clientes = new Array();
  }

  ngOnInit(): void {
   
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
    
  }


  delete( cliente : Cliente) : void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Mensaje',
      text: "¿Desea eliminar al cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Mensaje',
              'Registro eliminado',
              'success'
            )

          }
        )
   
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
       
      }
    })
    
  }

}


