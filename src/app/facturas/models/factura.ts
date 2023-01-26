import { Cliente } from "src/app/cliente/cliente";
import { ItemFactura } from "./item-factura";

export class Factura {

constructor(
    public id :number,
    public descripcion:string,
    public observacion:string,
    public items:Array<ItemFactura>=[],
    public cliente: Cliente,
    public total :number,
    public createAt: string
){

}


calcularGranTotal():number{
    this.total = 0;
    this.items.forEach((item:ItemFactura)=> {
        this.total += item.calcularImporte();
    })

    return this.total;
}

}
