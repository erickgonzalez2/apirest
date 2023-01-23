
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cliente } from './cliente'
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from './detalle/modal.service';
import { Region } from './region';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.sass']
})
export class ClienteComponent implements OnInit, OnChanges {

  clientes: Cliente[];
  totalPaginas: number;
  paginas: number[];
  paginaActual: number;
  paginaSiguiente: number;
  region : Region;
  clienteSeleccionado: Cliente;


  constructor(private clienteService: ClienteService,
    private _activatedRoute: ActivatedRoute,
    private modalService: ModalService) {

    this.clientes = new Array();
    this.totalPaginas = 0;
    this.paginas = new Array();
    this.paginaActual = 0;
    this.paginaSiguiente = 0;

  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  ngOnChanges(): void {

  }


  delete(cliente: Cliente): void {

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


  cargarClientes(): void {

    this._activatedRoute.params.subscribe(params => {

      let page = params['page'];
      this.paginaActual = +page;
      this.paginaSiguiente = (this.paginaActual + 1);
      if (page) {
        this.clienteService.getClientes(page).pipe(
          tap(response => {
            this.totalPaginas = response.totalPages

            this.paginas = Array(this.totalPaginas).fill(0).map((x, i) => i);

          })

        )
          .subscribe(
            response => this.clientes = response.content as Cliente[]
          );
      }
    })
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }


}


