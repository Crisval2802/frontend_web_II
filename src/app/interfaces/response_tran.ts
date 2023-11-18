import { TransaccionI } from "./transaccion";

export interface ResponseTranI {
    message: string;
    Transacciones: TransaccionI[];
}
