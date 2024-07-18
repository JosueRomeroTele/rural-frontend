import { DataAlerta } from "./IDataAlert";
import { DataIot } from "./IDataIot";
import { DataIotProm } from "./IDataIotProm";

export interface Dispositivo {
  nombre?:string;
  serie?:string;
  tipoDatos?: DataIot[];
  parametrosProm?:DataIotProm[]; // no lo usaria
  usuario?:string;
  cantAlertas?:number;
  descripcion?:string;
  alertas?: DataAlerta[];

  createdAt?:string;
  id?:string;
  updatedAt?:string;

}
