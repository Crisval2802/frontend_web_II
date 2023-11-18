import { Limites_ObjetivosI } from "./Limites_Objetivos";
import { TransaccionI } from "./transaccion";

export interface ResponseLimObjI {
    message: string;
    datos: Limites_ObjetivosI[];
}
