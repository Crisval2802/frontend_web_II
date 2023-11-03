import { TransaccionI } from "./transaccion";

export interface ResponseTranSemanaI {
    message: string;
    Inicio: string;
    Final: string;
    Transacciones: TransaccionI[];
}
