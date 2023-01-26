import { Producto } from "./producto";

export class ItemFactura {

    constructor(
        public producto : Producto,
        public cantidad : number = 1,
        public importe : number
    ){

    }

    public calcularImporte():number{
        return this.cantidad*this.producto.precio;
    }


}
