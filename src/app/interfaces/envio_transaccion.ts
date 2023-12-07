export interface EnvioTransaccionI {
    tipo: string;
    categoria_gasto: number;
    categoria_ingreso: number;
    subcategoria_gasto: number;
    subcategoria_ingreso: number;
    cuenta: number;
    cantidad: number;
    comentarios: string;
    divisa: string;
    imagen: File;
}
