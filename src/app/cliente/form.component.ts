import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Region } from './region';
import { Factura } from '../facturas/models/factura';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit{

  cliente : Cliente;
  titulo = "Formulario";
  regiones : Region[];
  rg : Region;
  factura : Factura;
  private errores : string[];

  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private _router : Router
    ) {      
      this.errores = new Array();
      this.cliente = new Cliente(0,'','','','','',this.rg)
     }



  ngOnInit(): void {
    this.cargarCliente();
  }

 
cargarCliente():void{
  this.activatedRoute.params.subscribe(params => {
    let id = params['id'];
    
    if(id){      
      this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
    }
  })
  this.clienteService.getRegiones().subscribe(
    regiones => this.regiones = regiones);
    
    
}

 create() : void {

    this.clienteService.create(this.cliente).subscribe(
      response => {
        this._router.navigate(['/navegacion/dashboard/pagina/','0']); 
        Swal.fire('Mensaje', 'Cliente guardado', 'success') 
      },
      error => {
        this.errores = error.error.Errores as string[];
        console.log(error.error.Errores);
        
      }

    )
  }


  update() : void {
    this.cliente.facturas = this.cliente.facturas;
    
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      Swal.fire('Mensaje','Cliente actualizado con exito', 'success')
    }) 
  }

  compararRegion(o1:Region,o2:Region){

    if(o1 === undefined && o2 === undefined){
      return true;
    }

    return o1 == null || o2 == null ? false: o1.id===o2.id;
  }

}
