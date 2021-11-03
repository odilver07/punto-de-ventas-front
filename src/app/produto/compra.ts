import { Item } from "./item";
import { Usuario } from '../login/usuario';

export class Compra{
    id:number;
    items:Item[] = [];
    totalCompra:number;
    usuario:Usuario;
    fecha:string;
    enviado:number;
}