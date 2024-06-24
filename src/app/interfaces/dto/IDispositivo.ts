import { DataAlerta } from "./IDataAlert";
import { DataIot } from "./IDataIot";

export interface Dispositivo {
  nombre:string;
  serie:string;
  parametros: DataIot[];
  alertas: DataAlerta[];
}
