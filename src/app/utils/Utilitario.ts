import { MatSnackBar, SimpleSnackBar } from "@angular/material/snack-bar";


export class Utilitario {



  public static getRoleName(role: number): string {
    const roleMap: { [key: number]: string } = {
      0: 'SuperAdmin',
      1: 'Admin',
      2: 'Investigador',
      3: 'Estudiante',
    };
    return roleMap[role] || "SIN ROL";
  };

  public static mostrarSnackbar(
    snackBar: MatSnackBar,
    mensaje: string,
    tipo: string='success',
    duracion: number = 3200,
    accion?: string,
) {
    snackBar.open(
        mensaje,
        accion, {
        duration: duracion,
        panelClass: tipo,
        horizontalPosition: "center",
        verticalPosition: "top",
    });
}


}
