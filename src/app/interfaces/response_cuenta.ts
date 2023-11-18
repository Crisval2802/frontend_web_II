import { CuentaI } from "./cuentas";

export interface ResponseCuentaI {
    message: string;
    cuentas: CuentaI[];
}
