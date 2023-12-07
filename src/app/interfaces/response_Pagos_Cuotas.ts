import { CuotaI } from "./cuota";
import { TransaccionI } from "./transaccion";

export interface ResponsePagosCuotasI {
    message: string;
    Transacciones: TransaccionI[];
    Cuotas: CuotaI[];
}
