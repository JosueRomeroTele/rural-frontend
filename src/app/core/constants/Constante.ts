export class Constante{
    //CODIGO RESPUESTA
    static RESPUESTA_OK      = '00';
    static RESPUESTA_ERROR   = '99';
    static RESPUESTA_MIL_UNO = '1001';
    static RESPUESTA_MIL_DOS = '1002';
    static RESPUESTA_MIL_TRES = '1003';
    static RESPUESTA_MIL_SEIS= '1006';
    static RESPUESTA_CAPTCHA_ERROR   = '88';
    static RESPUESTA_408   = '408';
    //ACCION SNACKBAR
    static OK = 'OK';
    static CERRAR = 'Cerrar';
    //Mensaje OK
    static MENSAJE_OK = 'Operación realizada correctamente'
    static MENSAJE_OK_ELIMINAR_USUARIO = 'Se ha eliminado el usuario correctamente.'

    //ARCHIVO DE MENSAJES
    static MESSAGE_ES_FILE = 'message.es.json';
    static MESSAGE_EN_FILE = 'message.en.json';
    static SEARCH_ES_FILE = 'es.json';
    static SEARCH_EN_FILE = 'en.json';
    //IDIOMAS
    static LANGUAGE_ES = 'es'
    static LANGUAGE_EN = 'en'
    //AUTORIZACION
    static MENU           = 'm.';
    static OPCION         = 'o.';
    static DETALLE = 'de';
    static EDITAR = 'ed';
    static NUEVO = 'nu';
    static TYPE_SERVICIO  = "servicio";
    //ESTADO USUARIO
    static CREADO = 'CREADO';
    static IMPORTADO = 'IMPORTADO';
    static HABILITADO = 'HABILITADO';
    static BLOQUEADO = 'BLOQUEADO';
    static RESETEADO = 'RESETEADO';
    static INHABILITADO = 'INHABILITADO';
    static REPORTADO = 'REPORTADO';

    //AUTENTICACION
    static PATH_LOGIN = 'login';
    static PATH_LOGOUT = 'logout';
    static PATH_EXPORTAR = 'exportar';
    static PATH_REPORTE = 'reporte';
    static PATH_CARGAR = 'cargar';
    static PATH_CARGA = 'carga';
    static PATH_IMPORTAR_XML = 'importarxml';
    static PATH_EXPORTAR_XML = 'exportarxml';
    static PATH_OLVIDE_CONTRASENA = 'olvideContrasena';
    static PATH_CAMBIAR_INI_CONTRASENA = 'cambiarIniPass';
    static PATH_LOAD_IMAGE = 'ServletResources';
    static PATH_SERVICIO = 'Servicio';
    static PATH_CAPTCHA = 'simple-captcha-endpoint';
    static PATH_PUBLICKEY = 'publickey';

    //COMBOS
    static APLICACION='APLICACION'
    static BLOQUEAR ='BLOQUEAR'
    static DESBLOQUEAR ='DESBLOQUEAR'

    // CLASES CSS
    static readonly BOTONES_CLASES = 'mat-raised-button mat-primary';
    static readonly HEADER_CLASES = 'mat-toolbar mat-primary';
    static readonly MENU_CLASES = 'active-link';

    static CODIGO_SELECCIONE=-10;

    static MENSAJE_ERROR_APARIENCIA='Error al guardar los cambios';


    static RPT_EXITOSA = true

    //TIPOS
    static TIPO_ELIMINAR_USUARIO='eliminar_usuario'
    static TIPO_ELIMINAR_DISPOSITIVO='eliminar_usuario'
    static TIPO_ELIMINAR_DATA_DISPOSITIVO='eliminar_data_dispositivo'
}
