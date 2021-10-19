import { Marca } from './marca';
export class Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    foto: string;
    marca:Marca;
    cantidad: number = 1;
}
