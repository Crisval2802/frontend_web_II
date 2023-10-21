export interface TransaccionI {
    id: number;
    clave_cuenta_id: number;
    clave_categoria_id: number;
    clave_subcategoria_id: number;
    cantidad: number;
    tipo: string;
    divisa: string;
    fecha: string;
    comentarios: string;
    nombre_cuenta: string;
    nombre_categoria: string;
    nombre_subcategoria: string;
}
