import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { FacturasService } from './services/facturas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.sass']
})
export class DetalleFacturaComponent implements OnInit{

  factura : Factura;
  titulo : string = 'Factura';
  public rutaActual = '';

  constructor(
    private facturaService : FacturasService,
    private activatedRoute : ActivatedRoute
  ){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.facturaService.getFactura(id).subscribe(factura => {
        this.factura = factura;
        this.rutaActual = localStorage.getItem('ruta');
      } )
    })
  }



}
