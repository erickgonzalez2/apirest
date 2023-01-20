import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit{

  cliente = new Cliente(0, '', '', '', '')
  titulo = "Formulario";

  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute
    ) { }



  ngOnInit(): void {
    this.cargarCliente();
  }

 
cargarCliente():void{
  this.activatedRoute.params.subscribe(params => {
    let id = params['id']
    if(id){
      this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
    }
  })
}





 create() : void {

    this.clienteService.create(this.cliente).subscribe(
      response => Swal.fire('Mensaje', 'Cliente guardado', 'success')
    )
  }


  update() : void {
    this.clienteService.update(this.cliente)
    .subscribe( cliente => {
      Swal.fire('Mensaje','Cliente actualizado con exito', 'success')
    })
  }

}
