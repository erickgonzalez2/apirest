import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente/cliente';
import { ClienteService } from '../cliente/cliente.service';
import { Factura } from './models/factura';
import { ItemFactura } from './models/item-factura';
import { FormControl } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { map, mergeMap, startWith } from 'rxjs/operators';
import { FacturasService } from './services/facturas.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.sass']
})
export class FacturasComponent implements OnInit {


  titulo: string = 'Nueva Factura';
  cliente: Cliente;
  descripcion: string;
  observacion: string;
  rutaActual: string;

  itemFactura: ItemFactura[];
  factura: Factura;

  autocompleteControl = new FormControl();

  productosFiltrados: Observable<Producto[]>;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturasService,
    private router : Router
  ) {

    this.factura = new Factura(0, '', '', this.itemFactura, this.cliente, 0, '');

  }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      let clienteId = params['clienteId'];
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.cliente = cliente);
      this.rutaActual = localStorage.getItem('ruta');
    });

    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        mergeMap(value => this._filter(value)),
      );
  }


  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }


  seleccionarProducto(event: MatAutocompleteSelectedEvent) {
    let producto = event.option.value as Producto;    

    if(this.existeItem(producto.id)){
      this.incrementaCantidad(producto.id);
    }
    else{
      let nuevoItem = new ItemFactura(producto, 1, producto.precio);
    this.factura.items.push(nuevoItem);
    }

    

    this.autocompleteControl.setValue('');

    event.option.focus();
    event.option.deselect();
  }


  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if(cantidad == 0){
      return this.eliminarItem(id)
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;

    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    })
    return existe;
  }

  incrementaCantidad(id: number): void {

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItem(id : number):void{
    this.factura.items = this.factura.items.filter((item : ItemFactura) => id != item.producto.id);
  }

  create():void{  
    

    if(!this.descripcion){
      Swal.fire('Mensaje','La factura debe de llevar una descripcion','error');
      return;
    }

    if(this.factura.items.length == 0){
      Swal.fire('Mensaje','Debe agregarse al menos un producto','error');
      return;
    }

    this.factura.descripcion = this.descripcion;
    this.factura.observacion = this.observacion;
    this.factura.cliente = this.cliente;    

    this.facturaService.create(this.factura).subscribe(
      factura => {
        Swal.fire('Mensaje','Nueva factura creada con éxito','success');
        this.router.navigate([this.rutaActual]);
      }
    );
  }

}
