import { Region } from "./region";


export class Cliente{
  

   constructor(
    public id:number,
    public nombre: string,
    public apellido: string,
   public createAt : string,
   public email : string,
   public foto : string,
   public region : Region
   ){

   }
}