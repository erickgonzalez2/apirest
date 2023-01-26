import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { FacturasService } from 'src/app/facturas/services/facturas.service';
import { Factura } from 'src/app/facturas/models/factura';
@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.sass']
})
export class DetalleComponent implements OnInit {


  @Input() cliente: Cliente;
  titulo = 'Detalle del cliente';

  public archivos: any[];
  public previsualizacion : string;
  public fotoSeleccionada : File;
  public factura : Factura;

  public progreso : number = 0;

  constructor(
    private clienteService: ClienteService,
    public modalService : ModalService,
    private sanitizer: DomSanitizer,
    private facturaService : FacturasService
    ) 
    
    {
    
    this.archivos = new Array();
    this.previsualizacion = '';
    this.fotoSeleccionada = new File([],'');
  }

  ngOnInit() {
  }

  seleccionarFoto(event: any) {
    const fotoSubida = event.target.files[0];
    this.extraerBase64(fotoSubida).then((imagen:any) => {
      this.previsualizacion = imagen.base;      
    })
    this.fotoSeleccionada = event.target.files[0];

    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error','Debes seleccionar una foto','error');    
    }

  }

  subirFoto(){

    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      Swal.fire('Error','Debes seleccionar una foto','error');      
    }
    else{
      this.clienteService.subirFoto(this.fotoSeleccionada,this.cliente.id)
    .subscribe(event => {

      if(event.type === HttpEventType.UploadProgress){

        if (event.total) {  
          this.progreso = Math.round((event.loaded / event.total)*100)
        }   
      }
      else if(event.type === HttpEventType.Response){                
        Swal.fire("Completado",'La foto se ha subido completamente','success');
        setTimeout(this.recargar,2000);
        
      }      
    })
    }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


  cerrarModal(){
    this.modalService.cerrarModal();
    this.progreso = 0;
  }

  recargar(){
    window.location.reload();
  }

  delete(factura : Factura):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Mensaje',
      text: "¿Desea eliminar la factura?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.facturaService.delete(factura.id).subscribe(
          response => {
            this.cliente.facturas= this.cliente.facturas.filter(cli => cli !== factura)
            swalWithBootstrapButtons.fire(
              'Mensaje',
              'Factura eliminada',
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
