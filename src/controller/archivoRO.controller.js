import { getConnection } from "./../database/database";

const getArchivo = async (req, res) => {
    try {               
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        //ARCHIVORO
        var objeto = {};
        var data  = {};
        var Deposito  = [];
        var Extracciones  = [];
        var Transferencia  = [];
        var Cancelacion  = [];
        var Tarjeta  = [];

        var cantDep = 0;
        var cantExt = 0;
        var cantTran = 0;
        var cantCan = 0;
        var cantTar = 0;
        
        //depositos
        const connection = await getConnection();
        const resultDep = await connection.execute(
            `SELECT t.item,
                    t.sucursal,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    t.numerocomprobante,
                    nvl(t.nombrerazonsocial, '') nombrerazonsocial,
                    t.numerodocumento,
                    nvl(t.monedaoperacion, 'PYG'),
                    t.monto,
                    nvl(t.numerocuenta, ''),
                    nvl(t.numerodocumentobeneficiario, ''),
                    nvl(t.nombrebeneficiario, ''),
                    nvl(t.tipodocumentodep, ''),
                    nvl(t.tipodocumentoben, ''),
                    nvl(t.codinstrumento, ''),
                    nvl(t.cotizacion, 1),
                    nvl(t.saldocuenta, 0),
                    nvl(t.numerocheque, ''),
                    nvl(t.bancoemisor, '')
            from servi_pla.depositos t`);
        resultDep.rows.forEach((resultDepObj) => {                
            cantDep = cantDep + 1 ;
            Deposito.push({ 
                "item" : (resultDepObj[0] === null) ? "" : resultDepObj[0],
                "sucursal" : (resultDepObj[1] === null) ? "" : resultDepObj[1],
                "fechaOperacion" : (resultDepObj[2] === null) ? "" : resultDepObj[2],
                "numeroComprobante" : (resultDepObj[3] === null) ? "" : resultDepObj[3],
                "nombreRazonSocial" : (resultDepObj[4] === null) ? "" : resultDepObj[4],
                "numeroDocumento" : (resultDepObj[5] === null) ? "" : resultDepObj[5],
                "monedaOperacion" : (resultDepObj[6] === null) ? "" : resultDepObj[6],
                "monto" : (resultDepObj[7] === null) ? "" : resultDepObj[7],
                "numeroCuenta" : (resultDepObj[8] === null) ? "" : resultDepObj[8],
                "numeroDocumentoBeneficiario" : (resultDepObj[9] === null) ? "" : resultDepObj[9],
                "nombreBeneficiario" : (resultDepObj[10] === null) ? "" : resultDepObj[10],
                "tipoDocumentoDep" : (resultDepObj[11] === null) ? "" : resultDepObj[11],
                "tipoDocumentoBen" : (resultDepObj[12] === null) ? "" : resultDepObj[12],
                "codInstrumento" : (resultDepObj[13] === null) ? "" : resultDepObj[13],
                "cotizacion" : (resultDepObj[14] === null) ? "" : resultDepObj[14],
                "saldoCuenta" : (resultDepObj[15] === null) ? "" : resultDepObj[15],
                "numeroCheque" : (resultDepObj[16] === null) ? "" : resultDepObj[16],
                "bancoEmisor" : (resultDepObj[17] === null) ? "" : resultDepObj[17]
            });    
    
        });        

        //extraccion
            const resultExt = await connection.execute(
                `SELECT t.item,
                        t.sucursal,
                        to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                        nvl(t.numerocomprobante, ''),
                        nvl(t.nombrerazonsocial, ''),
                        nvl(t.numerodocumento, ''),
                        nvl(t.monedaoperacion, 'PYG'),
                        nvl(t.monto, 0),
                        nvl(t.numerocuenta, ''),
                        nvl(t.numerodocumentobeneficiario, ''),
                        nvl(t.nombrebeneficiario, ''),
                        nvl(t.tipodocumento, ''),
                        nvl(t.tipodocumentoben, ''),
                        nvl(t.codinstrumento, ''),
                        nvl(t.cotizacion, 1),
                        nvl(t.saldocuenta, 0),
                        nvl(t.numerocheque, ''),
                        nvl(t.bancoemisor, '')
                from servi_pla.extraccion t`);
        resultExt.rows.forEach((resultExtObj) => {                
            cantExt = cantExt + 1 ;
            Extracciones.push({ 
                "item" : (resultExtObj[0] === null) ? "" : resultExtObj[0],
                "sucursal" : (resultExtObj[1] === null) ? "" : resultExtObj[1],
                "fechaOperacion" : (resultExtObj[2] === null) ? "" : resultExtObj[2],
                "numeroComprobante" : (resultExtObj[3] === null) ? "" : resultExtObj[3],
                "nombreRazonSocial" : (resultExtObj[4] === null) ? "" : resultExtObj[4],
                "numeroDocumento" : (resultExtObj[5] === null) ? "" : resultExtObj[5],
                "monedaOperacion" : (resultExtObj[6] === null) ? "" : resultExtObj[6],
                "monto" : (resultExtObj[7] === null) ? "" : resultExtObj[7],
                "numeroCuenta" : (resultExtObj[8] === null) ? "" : resultExtObj[8],
                "numeroDocumentoBeneficiario" : (resultExtObj[9] === null) ? "" : resultExtObj[9],
                "nombreBeneficiario" : (resultExtObj[10] === null) ? "" : resultExtObj[10],
                "tipoDocumento" : (resultExtObj[11] === null) ? "" : resultExtObj[11],
                "tipoDocumentoBen" : (resultExtObj[12] === null) ? "" : resultExtObj[12],
                "codInstrumento" : (resultExtObj[13] === null) ? "" : resultExtObj[13],
                "cotizacion" : (resultExtObj[14] === null) ? "" : resultExtObj[14],
                "saldoCuenta" : (resultExtObj[15] === null) ? "" : resultExtObj[15],
                "numeroCheque" : (resultExtObj[16] === null) ? "" : resultExtObj[16],
                "bancoEmisor" : (resultExtObj[17] === null) ? "" : resultExtObj[17]
            });
        }); 

        //transferencia
        const resultTrans = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursalorigen, ''),
                    NVL(t.numerocomprobante, ''),
                    NVL(t.nombrerazonsocial, ''),
                    NVL(t.numerodocumento, ''),
                    NVL(t.numerocuenta, ''),
                    NVL(t.monedaoperacion, 'PYG'),
                    NVL(t.monto, 0),
                    NVL(t.montooperacionengs, 0),
                    NVL(t.cotizacion, 1),
                    NVL(t.numerodocumentobeneficiario, ''),
                    NVL(t.nombrebeneficiario, ''),
                    NVL(t.numerocuentaotraentidad, ''),
                    NVL(t.tipodocumento, ''),
                    NVL(t.tipodocumentoben, ''),
                    NVL(t.codinstrumento, ''),
                    NVL(t.ciudad, ''),
                    NVL(t.motivo, ''),
                    NVL(t.entidadorigen, ''),
                    NVL(t.entidaddestino, '')
                from servi_pla.transferencia t`
        );
        resultTrans.rows.forEach((resultTransObj) => {                
            cantTran = cantTran + 1 ;
            Transferencia.push({ 
                "item" : (resultTransObj[0] === null) ? "" : resultTransObj[0],
                "fechaOperacion" : (resultTransObj[1] === null) ? "" : resultTransObj[1],
                "sucursalOrigen" : (resultTransObj[2] === null) ? "" : resultTransObj[2],
                "numeroComprobante" : (resultTransObj[3] === null) ? "" : resultTransObj[3],
                "nombreRazonSocial" : (resultTransObj[4] === null) ? "" : resultTransObj[4],
                "numeroDocumento" : (resultTransObj[5] === null) ? "" : resultTransObj[5],
                "numeroCuenta" : (resultTransObj[6] === null) ? "" : resultTransObj[6],
                "monedaOperacion" : (resultTransObj[7] === null) ? "" : resultTransObj[7],
                "monto" : (resultTransObj[8] === null) ? "" : resultTransObj[8],
                "montoOperacionEnGs" : (resultTransObj[9] === null) ? "" : resultTransObj[9],
                "cotizacion" : (resultTransObj[10] === null) ? "" : resultTransObj[10],
                "numeroDocumentoBeneficiario" : (resultTransObj[11] === null) ? "" : resultTransObj[11],
                "nombreBeneficiario" : (resultTransObj[12] === null) ? "" : resultTransObj[12],
                "numeroCuentaOtraEntidad" : (resultTransObj[13] === null) ? "" : resultTransObj[13],
                "tipoDocumento" : (resultTransObj[14] === null) ? "" : resultTransObj[14],
                "tipoDocumentoBen" : (resultTransObj[15] === null) ? "" : resultTransObj[15],
                "codInstrumento" : (resultTransObj[16] === null) ? "" : resultTransObj[16],
                "Ciudad" : (resultTransObj[17] === null) ? "" : resultTransObj[17],
                "motivo" : (resultTransObj[18] === null) ? "" : resultTransObj[18],
                "entidadOrigen" : (resultTransObj[19] === null) ? "" : resultTransObj[19],
                "entidadDestino" : (resultTransObj[20] === null) ? "" : resultTransObj[20]
            });
        }); 

        //cancelacion
        const resultCanc = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursal, ''),
                    NVL(t.numerocomprobante, ''),
                    NVL(t.nombrerazonsocialdeudor, ''),
                    NVL(t.numerodocumentodeudor, ''),
                    NVL(t.monedaoperacion, 'PYG'),
                    NVL(t.monto, 0),
                    NVL(t.cotizacion, 1),
                    NVL(t.montooperacionengs, ''),
                    NVL(t.numerodocumentoautorizado, ''),
                    NVL(t.nombreautorizado, ''),
                    NVL(t.tipodocumentodeu, ''),
                    NVL(t.tipodocumentoaut, ''),
                    NVL(t.cod_instrumento, ''),
                    NVL(t.motivo, ''),
                    NVL(t.numerocredito, '')
                from servi_pla.cancelacion t`);
        resultCanc.rows.forEach((resultCancObj) => {                
            cantCan = cantCan + 1 ;
            Cancelacion.push({ 
                "item" : (resultCancObj[0] === null) ? "" : resultCancObj[0],
                "fechaOperacion" : (resultCancObj[1] === null) ? "" : resultCancObj[1],
                "sucursal" : (resultCancObj[2] === null) ? "" : resultCancObj[2],
                "numeroComprobante" : (resultCancObj[3] === null) ? "" : resultCancObj[3],
                "nombreRazonSocialDeudor" : (resultCancObj[4] === null) ? "" : resultCancObj[4],
                "numeroDocumentoDeudor" : (resultCancObj[5] === null) ? "" : resultCancObj[5],
                "monedaOperacion" : (resultCancObj[6] === null) ? "" : resultCancObj[6],
                "monto" : (resultCancObj[7] === null) ? "" : resultCancObj[7],
                "cotizacion" : (resultCancObj[8] === null) ? "" : resultCancObj[8],
                "montoOperacionEnGs" : (resultCancObj[9] === null) ? "" : resultCancObj[9],
                "numeroDocumentoAutorizado" : (resultCancObj[10] === null) ? "" : resultCancObj[10],
                "nombreAutorizado" : (resultCancObj[11] === null) ? "" : resultCancObj[11],
                "tipoDocumentoDeu" : (resultCancObj[12] === null) ? "" : resultCancObj[12],
                "tipoDocumentoAut" : (resultCancObj[13] === null) ? "" : resultCancObj[13],
                "codInstrumento" : (resultCancObj[14] === null) ? "" : resultCancObj[14],
                "motivo" : (resultCancObj[15] === null) ? "" : resultCancObj[15],
                "numeroCredito" : (resultCancObj[16] === null) ? "" : resultCancObj[16]
            });
        }); 

        //tarjeta
        const resultTar = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursal, ''),
                    NVL(t.numerotarjeta, ''),
                    NVL(t.codinstrumento, ''),
                    NVL(t.nombretitular, ''),
                    NVL(t.numerodocumento, ''),
                    NVL(t.tipodocumento, ''),
                    NVL(t.montooperaciongs, 0),
                    NVL(t.lineacredito, '')
            FROM servi_pla.tarjeta t`);
        resultTar.rows.forEach((resultTarObj) => {                
            cantTar = cantTar + 1 ;
            Tarjeta.push({ 
                "item" : (resultTarObj[0] === null) ? "" : resultTarObj[0],
                "fechaOperacion" : (resultTarObj[1] === null) ? "" : resultTarObj[1],
                "sucursal" : (resultTarObj[2] === null) ? "" : resultTarObj[2],
                "numeroTarjeta" : (resultTarObj[3] === null) ? "" : resultTarObj[3],
                "codInstrumento" : (resultTarObj[4] === null) ? "" : resultTarObj[4],
                "nombreTitular" : (resultTarObj[5] === null) ? "" : resultTarObj[5],
                "numeroDocumento" : (resultTarObj[6] === null) ? "" : resultTarObj[6],
                "tipoDocumento" : (resultTarObj[7] === null) ? "" : resultTarObj[7],
                "montoOperacionGs" : (resultTarObj[8] === null) ? "" : resultTarObj[8],
                "lineaCredito" : (resultTarObj[9] === null) ? "" : resultTarObj[9]
            });
        });
           
        //CUERPO
        data.listaDeposito = Deposito;
        data.listaExtraccion = Extracciones;
        data.listaTransferencia = Transferencia;
        data.listaCancelacion = Cancelacion;
        data.listaTarjeta = Tarjeta;
        
        //CABECERA    
        objeto ={ 
            "cantidadRegDeposito"    : cantDep,
            "cantidadRegExtraccion"  : cantExt,
            "cantidadRegTransferencia"    : cantTran,
            "cantidadRegCancelacion"    : cantCan,
            "cantidadRegTarjeta"  : cantTar,
            "data" : data
        };    
        
        console.log("peticion de archivo");
        
        var buff = new Buffer(JSON.stringify(objeto)).toString("base64");
        res.status(200).jsonp(buff);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getArchivoUser = async (req, res) => {
    try {      
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        //ARCHIVORO
        var objeto = {};
        var data  = {};
        var Deposito  = [];
        var Extracciones  = [];
        var Transferencia  = [];
        var Cancelacion  = [];
        var Tarjeta  = [];

        var cantDep = 0;
        var cantExt = 0;
        var cantTran = 0;
        var cantCan = 0;
        var cantTar = 0;
        
        //depositos
        const connection = await getConnection();
        const resultDep = await connection.execute(
            `SELECT t.item,
                    t.sucursal,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    t.numerocomprobante,
                    nvl(t.nombrerazonsocial, '') nombrerazonsocial,
                    t.numerodocumento,
                    nvl(t.monedaoperacion, 'PYG'),
                    t.monto,
                    nvl(t.numerocuenta, ''),
                    nvl(t.numerodocumentobeneficiario, ''),
                    nvl(t.nombrebeneficiario, ''),
                    nvl(t.tipodocumentodep, ''),
                    nvl(t.tipodocumentoben, ''),
                    nvl(t.codinstrumento, ''),
                    nvl(t.cotizacion, 1),
                    nvl(t.saldocuenta, 0),
                    nvl(t.numerocheque, ''),
                    nvl(t.bancoemisor, '')
            from servi_pla.depositos t where usuario = :id`, [req.params.id]);
            resultDep.rows.forEach((resultDepObj) => {                
                cantDep = cantDep + 1 ;
                Deposito.push({ 
                    "item" : (resultDepObj[0] === null) ? "" : resultDepObj[0],
                    "sucursal" : (resultDepObj[1] === null) ? "" : resultDepObj[1],
                    "fechaOperacion" : (resultDepObj[2] === null) ? "" : resultDepObj[2],
                    "numeroComprobante" : (resultDepObj[3] === null) ? "" : resultDepObj[3],
                    "nombreRazonSocial" : (resultDepObj[4] === null) ? "" : resultDepObj[4],
                    "numeroDocumento" : (resultDepObj[5] === null) ? "" : resultDepObj[5],
                    "monedaOperacion" : (resultDepObj[6] === null) ? "" : resultDepObj[6],
                    "monto" : (resultDepObj[7] === null) ? "" : resultDepObj[7],
                    "numeroCuenta" : (resultDepObj[8] === null) ? "" : resultDepObj[8],
                    "numeroDocumentoBeneficiario" : (resultDepObj[9] === null) ? "" : resultDepObj[9],
                    "nombreBeneficiario" : (resultDepObj[10] === null) ? "" : resultDepObj[10],
                    "tipoDocumentoDep" : (resultDepObj[11] === null) ? "" : resultDepObj[11],
                    "tipoDocumentoBen" : (resultDepObj[12] === null) ? "" : resultDepObj[12],
                    "codInstrumento" : (resultDepObj[13] === null) ? "" : resultDepObj[13],
                    "cotizacion" : (resultDepObj[14] === null) ? "" : resultDepObj[14],
                    "saldoCuenta" : (resultDepObj[15] === null) ? "" : resultDepObj[15],
                    "numeroCheque" : (resultDepObj[16] === null) ? "" : resultDepObj[16],
                    "bancoEmisor" : (resultDepObj[17] === null) ? "" : resultDepObj[17]
                });    
        
            });  
        
        //extraccion
        const resultExt = await connection.execute(
            `SELECT t.item,
                    t.sucursal,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    nvl(t.numerocomprobante, ''),
                    nvl(t.nombrerazonsocial, ''),
                    nvl(t.numerodocumento, ''),
                    nvl(t.monedaoperacion, 'PYG'),
                    nvl(t.monto, 0),
                    nvl(t.numerocuenta, ''),
                    nvl(t.numerodocumentobeneficiario, ''),
                    nvl(t.nombrebeneficiario, ''),
                    nvl(t.tipodocumento, ''),
                    nvl(t.tipodocumentoben, ''),
                    nvl(t.codinstrumento, ''),
                    nvl(t.cotizacion, 1),
                    nvl(t.saldocuenta, 0),
                    nvl(t.numerocheque, ''),
                    nvl(t.bancoemisor, '')
            from servi_pla.extraccion t where usuario = :id`, [req.params.id]);
        
            resultExt.rows.forEach((resultExtObj) => {                
                cantExt = cantExt + 1 ;
                Extracciones.push({ 
                    "item" : (resultExtObj[0] === null) ? "" : resultExtObj[0],
                    "sucursal" : (resultExtObj[1] === null) ? "" : resultExtObj[1],
                    "fechaOperacion" : (resultExtObj[2] === null) ? "" : resultExtObj[2],
                    "numeroComprobante" : (resultExtObj[3] === null) ? "" : resultExtObj[3],
                    "nombreRazonSocial" : (resultExtObj[4] === null) ? "" : resultExtObj[4],
                    "numeroDocumento" : (resultExtObj[5] === null) ? "" : resultExtObj[5],
                    "monedaOperacion" : (resultExtObj[6] === null) ? "" : resultExtObj[6],
                    "monto" : (resultExtObj[7] === null) ? "" : resultExtObj[7],
                    "numeroCuenta" : (resultExtObj[8] === null) ? "" : resultExtObj[8],
                    "numeroDocumentoBeneficiario" : (resultExtObj[9] === null) ? "" : resultExtObj[9],
                    "nombreBeneficiario" : (resultExtObj[10] === null) ? "" : resultExtObj[10],
                    "tipoDocumento" : (resultExtObj[11] === null) ? "" : resultExtObj[11],
                    "tipoDocumentoBen" : (resultExtObj[12] === null) ? "" : resultExtObj[12],
                    "codInstrumento" : (resultExtObj[13] === null) ? "" : resultExtObj[13],
                    "cotizacion" : (resultExtObj[14] === null) ? "" : resultExtObj[14],
                    "saldoCuenta" : (resultExtObj[15] === null) ? "" : resultExtObj[15],
                    "numeroCheque" : (resultExtObj[16] === null) ? "" : resultExtObj[16],
                    "bancoEmisor" : (resultExtObj[17] === null) ? "" : resultExtObj[17]
                });
            });  

        //transferencia
        const resultTrans = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursalorigen, ''),
                    NVL(t.numerocomprobante, ''),
                    NVL(t.nombrerazonsocial, ''),
                    NVL(t.numerodocumento, ''),
                    NVL(t.numerocuenta, ''),
                    NVL(t.monedaoperacion, 'PYG'),
                    NVL(t.monto, 0),
                    NVL(t.montooperacionengs, 0),
                    NVL(t.cotizacion, 1),
                    NVL(t.numerodocumentobeneficiario, ''),
                    NVL(t.nombrebeneficiario, ''),
                    NVL(t.numerocuentaotraentidad, ''),
                    NVL(t.tipodocumento, ''),
                    NVL(t.tipodocumentoben, ''),
                    NVL(t.codinstrumento, ''),
                    NVL(t.ciudad, ''),
                    NVL(t.motivo, ''),
                    NVL(t.entidadorigen, ''),
                    NVL(t.entidaddestino, '')
                from servi_pla.transferencia t where usuario = :id`, [req.params.id]);
                resultTrans.rows.forEach((resultTransObj) => {                
                    cantTran = cantTran + 1 ;
                    Transferencia.push({ 
                        "item" : (resultTransObj[0] === null) ? "" : resultTransObj[0],
                        "fechaOperacion" : (resultTransObj[1] === null) ? "" : resultTransObj[1],
                        "sucursalOrigen" : (resultTransObj[2] === null) ? "" : resultTransObj[2],
                        "numeroComprobante" : (resultTransObj[3] === null) ? "" : resultTransObj[3],
                        "nombreRazonSocial" : (resultTransObj[4] === null) ? "" : resultTransObj[4],
                        "numeroDocumento" : (resultTransObj[5] === null) ? "" : resultTransObj[5],
                        "numeroCuenta" : (resultTransObj[6] === null) ? "" : resultTransObj[6],
                        "monedaOperacion" : (resultTransObj[7] === null) ? "" : resultTransObj[7],
                        "monto" : (resultTransObj[8] === null) ? "" : resultTransObj[8],
                        "montoOperacionEnGs" : (resultTransObj[9] === null) ? "" : resultTransObj[9],
                        "cotizacion" : (resultTransObj[10] === null) ? "" : resultTransObj[10],
                        "numeroDocumentoBeneficiario" : (resultTransObj[11] === null) ? "" : resultTransObj[11],
                        "nombreBeneficiario" : (resultTransObj[12] === null) ? "" : resultTransObj[12],
                        "numeroCuentaOtraEntidad" : (resultTransObj[13] === null) ? "" : resultTransObj[13],
                        "tipoDocumento" : (resultTransObj[14] === null) ? "" : resultTransObj[14],
                        "tipoDocumentoBen" : (resultTransObj[15] === null) ? "" : resultTransObj[15],
                        "codInstrumento" : (resultTransObj[16] === null) ? "" : resultTransObj[16],
                        "Ciudad" : (resultTransObj[17] === null) ? "" : resultTransObj[17],
                        "motivo" : (resultTransObj[18] === null) ? "" : resultTransObj[18],
                        "entidadOrigen" : (resultTransObj[19] === null) ? "" : resultTransObj[19],
                        "entidadDestino" : (resultTransObj[20] === null) ? "" : resultTransObj[20]
                    });
                }); 

        //cancelacion
        const resultCanc = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursal, ''),
                    NVL(t.numerocomprobante, ''),
                    NVL(t.nombrerazonsocialdeudor, ''),
                    NVL(t.numerodocumentodeudor, ''),
                    NVL(t.monedaoperacion, 'PYG'),
                    NVL(t.monto, 0),
                    NVL(t.cotizacion, 1),
                    NVL(t.montooperacionengs, ''),
                    NVL(t.numerodocumentoautorizado, ''),
                    NVL(t.nombreautorizado, ''),
                    NVL(t.tipodocumentodeu, ''),
                    NVL(t.tipodocumentoaut, ''),
                    NVL(t.cod_instrumento, ''),
                    NVL(t.motivo, ''),
                    NVL(t.numerocredito, '')
                from servi_pla.cancelacion t where usuario = :id`, [req.params.id]);
                resultCanc.rows.forEach((resultCancObj) => {                
                    cantCan = cantCan + 1 ;
                    Cancelacion.push({ 
                        "item" : (resultCancObj[0] === null) ? "" : resultCancObj[0],
                        "fechaOperacion" : (resultCancObj[1] === null) ? "" : resultCancObj[1],
                        "sucursal" : (resultCancObj[2] === null) ? "" : resultCancObj[2],
                        "numeroComprobante" : (resultCancObj[3] === null) ? "" : resultCancObj[3],
                        "nombreRazonSocialDeudor" : (resultCancObj[4] === null) ? "" : resultCancObj[4],
                        "numeroDocumentoDeudor" : (resultCancObj[5] === null) ? "" : resultCancObj[5],
                        "monedaOperacion" : (resultCancObj[6] === null) ? "" : resultCancObj[6],
                        "monto" : (resultCancObj[7] === null) ? "" : resultCancObj[7],
                        "cotizacion" : (resultCancObj[8] === null) ? "" : resultCancObj[8],
                        "montoOperacionEnGs" : (resultCancObj[9] === null) ? "" : resultCancObj[9],
                        "numeroDocumentoAutorizado" : (resultCancObj[10] === null) ? "" : resultCancObj[10],
                        "nombreAutorizado" : (resultCancObj[11] === null) ? "" : resultCancObj[11],
                        "tipoDocumentoDeu" : (resultCancObj[12] === null) ? "" : resultCancObj[12],
                        "tipoDocumentoAut" : (resultCancObj[13] === null) ? "" : resultCancObj[13],
                        "codInstrumento" : (resultCancObj[14] === null) ? "" : resultCancObj[14],
                        "motivo" : (resultCancObj[15] === null) ? "" : resultCancObj[15],
                        "numeroCredito" : (resultCancObj[16] === null) ? "" : resultCancObj[16]
                    });
                }); 
        //tarjeta
        const resultTar = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursal, ''),
                    NVL(t.numerotarjeta, ''),
                    NVL(t.codinstrumento, ''),
                    NVL(t.nombretitular, ''),
                    NVL(t.numerodocumento, ''),
                    NVL(t.tipodocumento, ''),
                    NVL(t.montooperaciongs, 0),
                    NVL(t.lineacredito, '')
            FROM servi_pla.tarjeta t where usuario = :id`, [req.params.id]);
            resultTar.rows.forEach((resultTarObj) => {                
                cantTar = cantTar + 1 ;
                Tarjeta.push({ 
                    "item" : (resultTarObj[0] === null) ? "" : resultTarObj[0],
                    "fechaOperacion" : (resultTarObj[1] === null) ? "" : resultTarObj[1],
                    "sucursal" : (resultTarObj[2] === null) ? "" : resultTarObj[2],
                    "numeroTarjeta" : (resultTarObj[3] === null) ? "" : resultTarObj[3],
                    "codInstrumento" : (resultTarObj[4] === null) ? "" : resultTarObj[4],
                    "nombreTitular" : (resultTarObj[5] === null) ? "" : resultTarObj[5],
                    "numeroDocumento" : (resultTarObj[6] === null) ? "" : resultTarObj[6],
                    "tipoDocumento" : (resultTarObj[7] === null) ? "" : resultTarObj[7],
                    "montoOperacionGs" : (resultTarObj[8] === null) ? "" : resultTarObj[8],
                    "lineaCredito" : (resultTarObj[9] === null) ? "" : resultTarObj[9]
                });
            });
        
        //CUERPO
        data.listaDeposito = Deposito;
        data.listaExtraccion = Extracciones;
        data.listaTransferencia = Transferencia;
        data.listaCancelacion = Cancelacion;
        data.listaTarjeta = Tarjeta;
        
        //CABECERA    
        objeto ={ 
            "cantidadRegDeposito"    : cantDep,
            "cantidadRegExtraccion"  : cantExt,
            "cantidadRegTransferencia"    : cantTran,
            "cantidadRegCancelacion"    : cantCan,
            "cantidadRegTarjeta"  : cantTar,
            "data" : data
        };    
        
        console.log("peticion de archivo");
        
        var buff = new Buffer(JSON.stringify(objeto)).toString("base64");
        res.status(200).jsonp(buff);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

const getArchivoDes = async (req, res) => {
    try {      
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');          
        //ARCHIVORO
        var objeto = {};
        var data  = {};
        var Deposito  = [];
        var Extracciones  = [];
        var Transferencia  = [];
        var Cancelacion  = [];
        var Tarjeta  = [];

        var cantDep = 0;
        var cantExt = 0;
        var cantTran = 0;
        var cantCan = 0;
        var cantTar = 0;
        
        //depositos
        const connection = await getConnection();
        const resultDep = await connection.execute(
            `SELECT t.item,
                    t.sucursal,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    t.numerocomprobante,
                    nvl(t.nombrerazonsocial, '') nombrerazonsocial,
                    t.numerodocumento,
                    nvl(t.monedaoperacion, 'PYG'),
                    t.monto,
                    nvl(t.numerocuenta, ''),
                    nvl(t.numerodocumentobeneficiario, ''),
                    nvl(t.nombrebeneficiario, ''),
                    nvl(t.tipodocumentodep, ''),
                    nvl(t.tipodocumentoben, ''),
                    nvl(t.codinstrumento, ''),
                    nvl(t.cotizacion, 1),
                    nvl(t.saldocuenta, 0),
                    nvl(t.numerocheque, ''),
                    nvl(t.bancoemisor, '')
            from servi_pla.depositos t`);
        resultDep.rows.forEach((resultDepObj) => {                
            cantDep = cantDep + 1 ;
            Deposito.push({ 
                "item" : (resultDepObj[0] === null) ? "" : resultDepObj[0],
                "sucursal" : (resultDepObj[1] === null) ? "" : resultDepObj[1],
                "fechaOperacion" : (resultDepObj[2] === null) ? "" : resultDepObj[2],
                "numeroComprobante" : (resultDepObj[3] === null) ? "" : resultDepObj[3],
                "nombreRazonSocial" : (resultDepObj[4] === null) ? "" : resultDepObj[4],
                "numeroDocumento" : (resultDepObj[5] === null) ? "" : resultDepObj[5],
                "monedaOperacion" : (resultDepObj[6] === null) ? "" : resultDepObj[6],
                "monto" : (resultDepObj[7] === null) ? "" : resultDepObj[7],
                "numeroCuenta" : (resultDepObj[8] === null) ? "" : resultDepObj[8],
                "numeroDocumentoBeneficiario" : (resultDepObj[9] === null) ? "" : resultDepObj[9],
                "nombreBeneficiario" : (resultDepObj[10] === null) ? "" : resultDepObj[10],
                "tipoDocumentoDep" : (resultDepObj[11] === null) ? "" : resultDepObj[11],
                "tipoDocumentoBen" : (resultDepObj[12] === null) ? "" : resultDepObj[12],
                "codInstrumento" : (resultDepObj[13] === null) ? "" : resultDepObj[13],
                "cotizacion" : (resultDepObj[14] === null) ? "" : resultDepObj[14],
                "saldoCuenta" : (resultDepObj[15] === null) ? "" : resultDepObj[15],
                "numeroCheque" : (resultDepObj[16] === null) ? "" : resultDepObj[16],
                "bancoEmisor" : (resultDepObj[17] === null) ? "" : resultDepObj[17]
            });    
    
        });        

        //extraccion
            const resultExt = await connection.execute(
                `SELECT t.item,
                        t.sucursal,
                        to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                        nvl(t.numerocomprobante, ''),
                        nvl(t.nombrerazonsocial, ''),
                        nvl(t.numerodocumento, ''),
                        nvl(t.monedaoperacion, 'PYG'),
                        nvl(t.monto, 0),
                        nvl(t.numerocuenta, ''),
                        nvl(t.numerodocumentobeneficiario, ''),
                        nvl(t.nombrebeneficiario, ''),
                        nvl(t.tipodocumento, ''),
                        nvl(t.tipodocumentoben, ''),
                        nvl(t.codinstrumento, ''),
                        nvl(t.cotizacion, 1),
                        nvl(t.saldocuenta, 0),
                        nvl(t.numerocheque, ''),
                        nvl(t.bancoemisor, '')
                from servi_pla.extraccion t`);
        resultExt.rows.forEach((resultExtObj) => {                
            cantExt = cantExt + 1 ;
            Extracciones.push({ 
                "item" : (resultExtObj[0] === null) ? "" : resultExtObj[0],
                "sucursal" : (resultExtObj[1] === null) ? "" : resultExtObj[1],
                "fechaOperacion" : (resultExtObj[2] === null) ? "" : resultExtObj[2],
                "numeroComprobante" : (resultExtObj[3] === null) ? "" : resultExtObj[3],
                "nombreRazonSocial" : (resultExtObj[4] === null) ? "" : resultExtObj[4],
                "numeroDocumento" : (resultExtObj[5] === null) ? "" : resultExtObj[5],
                "monedaOperacion" : (resultExtObj[6] === null) ? "" : resultExtObj[6],
                "monto" : (resultExtObj[7] === null) ? "" : resultExtObj[7],
                "numeroCuenta" : (resultExtObj[8] === null) ? "" : resultExtObj[8],
                "numeroDocumentoBeneficiario" : (resultExtObj[9] === null) ? "" : resultExtObj[9],
                "nombreBeneficiario" : (resultExtObj[10] === null) ? "" : resultExtObj[10],
                "tipoDocumento" : (resultExtObj[11] === null) ? "" : resultExtObj[11],
                "tipoDocumentoBen" : (resultExtObj[12] === null) ? "" : resultExtObj[12],
                "codInstrumento" : (resultExtObj[13] === null) ? "" : resultExtObj[13],
                "cotizacion" : (resultExtObj[14] === null) ? "" : resultExtObj[14],
                "saldoCuenta" : (resultExtObj[15] === null) ? "" : resultExtObj[15],
                "numeroCheque" : (resultExtObj[16] === null) ? "" : resultExtObj[16],
                "bancoEmisor" : (resultExtObj[17] === null) ? "" : resultExtObj[17]
            });
        }); 

        //transferencia
        const resultTrans = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursalorigen, ''),
                    NVL(t.numerocomprobante, ''),
                    NVL(t.nombrerazonsocial, ''),
                    NVL(t.numerodocumento, ''),
                    NVL(t.numerocuenta, ''),
                    NVL(t.monedaoperacion, 'PYG'),
                    NVL(t.monto, 0),
                    NVL(t.montooperacionengs, 0),
                    NVL(t.cotizacion, 1),
                    NVL(t.numerodocumentobeneficiario, ''),
                    NVL(t.nombrebeneficiario, ''),
                    NVL(t.numerocuentaotraentidad, ''),
                    NVL(t.tipodocumento, ''),
                    NVL(t.tipodocumentoben, ''),
                    NVL(t.codinstrumento, ''),
                    NVL(t.ciudad, ''),
                    NVL(t.motivo, ''),
                    NVL(t.entidadorigen, ''),
                    NVL(t.entidaddestino, '')
                from servi_pla.transferencia t`
        );
        resultTrans.rows.forEach((resultTransObj) => {                
            cantTran = cantTran + 1 ;
            Transferencia.push({ 
                "item" : (resultTransObj[0] === null) ? "" : resultTransObj[0],
                "fechaOperacion" : (resultTransObj[1] === null) ? "" : resultTransObj[1],
                "sucursalOrigen" : (resultTransObj[2] === null) ? "" : resultTransObj[2],
                "numeroComprobante" : (resultTransObj[3] === null) ? "" : resultTransObj[3],
                "nombreRazonSocial" : (resultTransObj[4] === null) ? "" : resultTransObj[4],
                "numeroDocumento" : (resultTransObj[5] === null) ? "" : resultTransObj[5],
                "numeroCuenta" : (resultTransObj[6] === null) ? "" : resultTransObj[6],
                "monedaOperacion" : (resultTransObj[7] === null) ? "" : resultTransObj[7],
                "monto" : (resultTransObj[8] === null) ? "" : resultTransObj[8],
                "montoOperacionEnGs" : (resultTransObj[9] === null) ? "" : resultTransObj[9],
                "cotizacion" : (resultTransObj[10] === null) ? "" : resultTransObj[10],
                "numeroDocumentoBeneficiario" : (resultTransObj[11] === null) ? "" : resultTransObj[11],
                "nombreBeneficiario" : (resultTransObj[12] === null) ? "" : resultTransObj[12],
                "numeroCuentaOtraEntidad" : (resultTransObj[13] === null) ? "" : resultTransObj[13],
                "tipoDocumento" : (resultTransObj[14] === null) ? "" : resultTransObj[14],
                "tipoDocumentoBen" : (resultTransObj[15] === null) ? "" : resultTransObj[15],
                "codInstrumento" : (resultTransObj[16] === null) ? "" : resultTransObj[16],
                "Ciudad" : (resultTransObj[17] === null) ? "" : resultTransObj[17],
                "motivo" : (resultTransObj[18] === null) ? "" : resultTransObj[18],
                "entidadOrigen" : (resultTransObj[19] === null) ? "" : resultTransObj[19],
                "entidadDestino" : (resultTransObj[20] === null) ? "" : resultTransObj[20]
            });
        }); 

        //cancelacion
        const resultCanc = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursal, ''),
                    NVL(t.numerocomprobante, ''),
                    NVL(t.nombrerazonsocialdeudor, ''),
                    NVL(t.numerodocumentodeudor, ''),
                    NVL(t.monedaoperacion, 'PYG'),
                    NVL(t.monto, 0),
                    NVL(t.cotizacion, 1),
                    NVL(t.montooperacionengs, ''),
                    NVL(t.numerodocumentoautorizado, ''),
                    NVL(t.nombreautorizado, ''),
                    NVL(t.tipodocumentodeu, ''),
                    NVL(t.tipodocumentoaut, ''),
                    NVL(t.cod_instrumento, ''),
                    NVL(t.motivo, ''),
                    NVL(t.numerocredito, '')
                from servi_pla.cancelacion t`);
        resultCanc.rows.forEach((resultCancObj) => {                
            cantCan = cantCan + 1 ;
            Cancelacion.push({ 
                "item" : (resultCancObj[0] === null) ? "" : resultCancObj[0],
                "fechaOperacion" : (resultCancObj[1] === null) ? "" : resultCancObj[1],
                "sucursal" : (resultCancObj[2] === null) ? "" : resultCancObj[2],
                "numeroComprobante" : (resultCancObj[3] === null) ? "" : resultCancObj[3],
                "nombreRazonSocialDeudor" : (resultCancObj[4] === null) ? "" : resultCancObj[4],
                "numeroDocumentoDeudor" : (resultCancObj[5] === null) ? "" : resultCancObj[5],
                "monedaOperacion" : (resultCancObj[6] === null) ? "" : resultCancObj[6],
                "monto" : (resultCancObj[7] === null) ? "" : resultCancObj[7],
                "cotizacion" : (resultCancObj[8] === null) ? "" : resultCancObj[8],
                "montoOperacionEnGs" : (resultCancObj[9] === null) ? "" : resultCancObj[9],
                "numeroDocumentoAutorizado" : (resultCancObj[10] === null) ? "" : resultCancObj[10],
                "nombreAutorizado" : (resultCancObj[11] === null) ? "" : resultCancObj[11],
                "tipoDocumentoDeu" : (resultCancObj[12] === null) ? "" : resultCancObj[12],
                "tipoDocumentoAut" : (resultCancObj[13] === null) ? "" : resultCancObj[13],
                "codInstrumento" : (resultCancObj[14] === null) ? "" : resultCancObj[14],
                "motivo" : (resultCancObj[15] === null) ? "" : resultCancObj[15],
                "numeroCredito" : (resultCancObj[16] === null) ? "" : resultCancObj[16]
            });
        }); 

        //tarjeta
        const resultTar = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursal, ''),
                    NVL(t.numerotarjeta, ''),
                    NVL(t.codinstrumento, ''),
                    NVL(t.nombretitular, ''),
                    NVL(t.numerodocumento, ''),
                    NVL(t.tipodocumento, ''),
                    NVL(t.montooperaciongs, 0),
                    NVL(t.lineacredito, '')
            FROM servi_pla.tarjeta t`);
        resultTar.rows.forEach((resultTarObj) => {                
            cantTar = cantTar + 1 ;
            Tarjeta.push({ 
                "item" : (resultTarObj[0] === null) ? "" : resultTarObj[0],
                "fechaOperacion" : (resultTarObj[1] === null) ? "" : resultTarObj[1],
                "sucursal" : (resultTarObj[2] === null) ? "" : resultTarObj[2],
                "numeroTarjeta" : (resultTarObj[3] === null) ? "" : resultTarObj[3],
                "codInstrumento" : (resultTarObj[4] === null) ? "" : resultTarObj[4],
                "nombreTitular" : (resultTarObj[5] === null) ? "" : resultTarObj[5],
                "numeroDocumento" : (resultTarObj[6] === null) ? "" : resultTarObj[6],
                "tipoDocumento" : (resultTarObj[7] === null) ? "" : resultTarObj[7],
                "montoOperacionGs" : (resultTarObj[8] === null) ? "" : resultTarObj[8],
                "lineaCredito" : (resultTarObj[9] === null) ? "" : resultTarObj[9]
            });
        }); 
           
        //CUERPO
        data.listaDeposito = Deposito;
        data.listaExtraccion = Extracciones;
        data.listaTransferencia = Transferencia;
        data.listaCancelacion = Cancelacion;
        data.listaTarjeta = Tarjeta;
        
        //CABECERA    
        objeto ={ 
            "cantidadRegDeposito"    : cantDep,
            "cantidadRegExtraccion"  : cantExt,
            "cantidadRegTransferencia"    : cantTran,
            "cantidadRegCancelacion"    : cantCan,
            "cantidadRegTarjeta"  : cantTar,
            "data" : data
        };    
        
        console.log("peticion de archivo");
        
        res.status(200).jsonp(objeto);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getArchivoUserDes = async (req, res) => {
    try {      
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        //ARCHIVORO
        var objeto = {};
        var data  = {};
        var Deposito  = [];
        var Extracciones  = [];
        var Transferencia  = [];
        var Cancelacion  = [];
        var Tarjeta  = [];

        var cantDep = 0;
        var cantExt = 0;
        var cantTran = 0;
        var cantCan = 0;
        var cantTar = 0;
        
        //depositos
        const connection = await getConnection();
        const resultDep = await connection.execute(
            `SELECT t.item,
                    t.sucursal,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    t.numerocomprobante,
                    nvl(t.nombrerazonsocial, '') nombrerazonsocial,
                    t.numerodocumento,
                    nvl(t.monedaoperacion, 'PYG'),
                    t.monto,
                    nvl(t.numerocuenta, ''),
                    nvl(t.numerodocumentobeneficiario, ''),
                    nvl(t.nombrebeneficiario, ''),
                    nvl(t.tipodocumentodep, ''),
                    nvl(t.tipodocumentoben, ''),
                    nvl(t.codinstrumento, ''),
                    nvl(t.cotizacion, 1),
                    nvl(t.saldocuenta, 0),
                    nvl(t.numerocheque, ''),
                    nvl(t.bancoemisor, '')
            from servi_pla.depositos t where usuario = :id`, [req.params.id]);
            resultDep.rows.forEach((resultDepObj) => {                
                cantDep = cantDep + 1 ;
                Deposito.push({ 
                    "item" : (resultDepObj[0] === null) ? "" : resultDepObj[0],
                    "sucursal" : (resultDepObj[1] === null) ? "" : resultDepObj[1],
                    "fechaOperacion" : (resultDepObj[2] === null) ? "" : resultDepObj[2],
                    "numeroComprobante" : (resultDepObj[3] === null) ? "" : resultDepObj[3],
                    "nombreRazonSocial" : (resultDepObj[4] === null) ? "" : resultDepObj[4],
                    "numeroDocumento" : (resultDepObj[5] === null) ? "" : resultDepObj[5],
                    "monedaOperacion" : (resultDepObj[6] === null) ? "" : resultDepObj[6],
                    "monto" : (resultDepObj[7] === null) ? "" : resultDepObj[7],
                    "numeroCuenta" : (resultDepObj[8] === null) ? "" : resultDepObj[8],
                    "numeroDocumentoBeneficiario" : (resultDepObj[9] === null) ? "" : resultDepObj[9],
                    "nombreBeneficiario" : (resultDepObj[10] === null) ? "" : resultDepObj[10],
                    "tipoDocumentoDep" : (resultDepObj[11] === null) ? "" : resultDepObj[11],
                    "tipoDocumentoBen" : (resultDepObj[12] === null) ? "" : resultDepObj[12],
                    "codInstrumento" : (resultDepObj[13] === null) ? "" : resultDepObj[13],
                    "cotizacion" : (resultDepObj[14] === null) ? "" : resultDepObj[14],
                    "saldoCuenta" : (resultDepObj[15] === null) ? "" : resultDepObj[15],
                    "numeroCheque" : (resultDepObj[16] === null) ? "" : resultDepObj[16],
                    "bancoEmisor" : (resultDepObj[17] === null) ? "" : resultDepObj[17]
                });    
        
            });  
        
        //extraccion
        const resultExt = await connection.execute(
            `SELECT t.item,
                    t.sucursal,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    nvl(t.numerocomprobante, ''),
                    nvl(t.nombrerazonsocial, ''),
                    nvl(t.numerodocumento, ''),
                    nvl(t.monedaoperacion, 'PYG'),
                    nvl(t.monto, 0),
                    nvl(t.numerocuenta, ''),
                    nvl(t.numerodocumentobeneficiario, ''),
                    nvl(t.nombrebeneficiario, ''),
                    nvl(t.tipodocumento, ''),
                    nvl(t.tipodocumentoben, ''),
                    nvl(t.codinstrumento, ''),
                    nvl(t.cotizacion, 1),
                    nvl(t.saldocuenta, 0),
                    nvl(t.numerocheque, ''),
                    nvl(t.bancoemisor, '')
            from servi_pla.extraccion t where usuario = :id`, [req.params.id]);
        
            resultExt.rows.forEach((resultExtObj) => {                
                cantExt = cantExt + 1 ;
                Extracciones.push({ 
                    "item" : (resultExtObj[0] === null) ? "" : resultExtObj[0],
                    "sucursal" : (resultExtObj[1] === null) ? "" : resultExtObj[1],
                    "fechaOperacion" : (resultExtObj[2] === null) ? "" : resultExtObj[2],
                    "numeroComprobante" : (resultExtObj[3] === null) ? "" : resultExtObj[3],
                    "nombreRazonSocial" : (resultExtObj[4] === null) ? "" : resultExtObj[4],
                    "numeroDocumento" : (resultExtObj[5] === null) ? "" : resultExtObj[5],
                    "monedaOperacion" : (resultExtObj[6] === null) ? "" : resultExtObj[6],
                    "monto" : (resultExtObj[7] === null) ? "" : resultExtObj[7],
                    "numeroCuenta" : (resultExtObj[8] === null) ? "" : resultExtObj[8],
                    "numeroDocumentoBeneficiario" : (resultExtObj[9] === null) ? "" : resultExtObj[9],
                    "nombreBeneficiario" : (resultExtObj[10] === null) ? "" : resultExtObj[10],
                    "tipoDocumento" : (resultExtObj[11] === null) ? "" : resultExtObj[11],
                    "tipoDocumentoBen" : (resultExtObj[12] === null) ? "" : resultExtObj[12],
                    "codInstrumento" : (resultExtObj[13] === null) ? "" : resultExtObj[13],
                    "cotizacion" : (resultExtObj[14] === null) ? "" : resultExtObj[14],
                    "saldoCuenta" : (resultExtObj[15] === null) ? "" : resultExtObj[15],
                    "numeroCheque" : (resultExtObj[16] === null) ? "" : resultExtObj[16],
                    "bancoEmisor" : (resultExtObj[17] === null) ? "" : resultExtObj[17]
                });
            });  

        //transferencia
        const resultTrans = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursalorigen, ''),
                    NVL(t.numerocomprobante, ''),
                    NVL(t.nombrerazonsocial, ''),
                    NVL(t.numerodocumento, ''),
                    NVL(t.numerocuenta, ''),
                    NVL(t.monedaoperacion, 'PYG'),
                    NVL(t.monto, 0),
                    NVL(t.montooperacionengs, 0),
                    NVL(t.cotizacion, 1),
                    NVL(t.numerodocumentobeneficiario, ''),
                    NVL(t.nombrebeneficiario, ''),
                    NVL(t.numerocuentaotraentidad, ''),
                    NVL(t.tipodocumento, ''),
                    NVL(t.tipodocumentoben, ''),
                    NVL(t.codinstrumento, ''),
                    NVL(t.ciudad, ''),
                    NVL(t.motivo, ''),
                    NVL(t.entidadorigen, ''),
                    NVL(t.entidaddestino, '')
                from servi_pla.transferencia t where usuario = :id`, [req.params.id]);
                resultTrans.rows.forEach((resultTransObj) => {                
                    cantTran = cantTran + 1 ;
                    Transferencia.push({ 
                        "item" : (resultTransObj[0] === null) ? "" : resultTransObj[0],
                        "fechaOperacion" : (resultTransObj[1] === null) ? "" : resultTransObj[1],
                        "sucursalOrigen" : (resultTransObj[2] === null) ? "" : resultTransObj[2],
                        "numeroComprobante" : (resultTransObj[3] === null) ? "" : resultTransObj[3],
                        "nombreRazonSocial" : (resultTransObj[4] === null) ? "" : resultTransObj[4],
                        "numeroDocumento" : (resultTransObj[5] === null) ? "" : resultTransObj[5],
                        "numeroCuenta" : (resultTransObj[6] === null) ? "" : resultTransObj[6],
                        "monedaOperacion" : (resultTransObj[7] === null) ? "" : resultTransObj[7],
                        "monto" : (resultTransObj[8] === null) ? "" : resultTransObj[8],
                        "montoOperacionEnGs" : (resultTransObj[9] === null) ? "" : resultTransObj[9],
                        "cotizacion" : (resultTransObj[10] === null) ? "" : resultTransObj[10],
                        "numeroDocumentoBeneficiario" : (resultTransObj[11] === null) ? "" : resultTransObj[11],
                        "nombreBeneficiario" : (resultTransObj[12] === null) ? "" : resultTransObj[12],
                        "numeroCuentaOtraEntidad" : (resultTransObj[13] === null) ? "" : resultTransObj[13],
                        "tipoDocumento" : (resultTransObj[14] === null) ? "" : resultTransObj[14],
                        "tipoDocumentoBen" : (resultTransObj[15] === null) ? "" : resultTransObj[15],
                        "codInstrumento" : (resultTransObj[16] === null) ? "" : resultTransObj[16],
                        "Ciudad" : (resultTransObj[17] === null) ? "" : resultTransObj[17],
                        "motivo" : (resultTransObj[18] === null) ? "" : resultTransObj[18],
                        "entidadOrigen" : (resultTransObj[19] === null) ? "" : resultTransObj[19],
                        "entidadDestino" : (resultTransObj[20] === null) ? "" : resultTransObj[20]
                    });
                }); 

        //cancelacion
        const resultCanc = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursal, ''),
                    NVL(t.numerocomprobante, ''),
                    NVL(t.nombrerazonsocialdeudor, ''),
                    NVL(t.numerodocumentodeudor, ''),
                    NVL(t.monedaoperacion, 'PYG'),
                    NVL(t.monto, 0),
                    NVL(t.cotizacion, 1),
                    NVL(t.montooperacionengs, ''),
                    NVL(t.numerodocumentoautorizado, ''),
                    NVL(t.nombreautorizado, ''),
                    NVL(t.tipodocumentodeu, ''),
                    NVL(t.tipodocumentoaut, ''),
                    NVL(t.cod_instrumento, ''),
                    NVL(t.motivo, ''),
                    NVL(t.numerocredito, '')
                from servi_pla.cancelacion t where usuario = :id`, [req.params.id]);
                resultCanc.rows.forEach((resultCancObj) => {                
                    cantCan = cantCan + 1 ;
                    Cancelacion.push({ 
                        "item" : (resultCancObj[0] === null) ? "" : resultCancObj[0],
                        "fechaOperacion" : (resultCancObj[1] === null) ? "" : resultCancObj[1],
                        "sucursal" : (resultCancObj[2] === null) ? "" : resultCancObj[2],
                        "numeroComprobante" : (resultCancObj[3] === null) ? "" : resultCancObj[3],
                        "nombreRazonSocialDeudor" : (resultCancObj[4] === null) ? "" : resultCancObj[4],
                        "numeroDocumentoDeudor" : (resultCancObj[5] === null) ? "" : resultCancObj[5],
                        "monedaOperacion" : (resultCancObj[6] === null) ? "" : resultCancObj[6],
                        "monto" : (resultCancObj[7] === null) ? "" : resultCancObj[7],
                        "cotizacion" : (resultCancObj[8] === null) ? "" : resultCancObj[8],
                        "montoOperacionEnGs" : (resultCancObj[9] === null) ? "" : resultCancObj[9],
                        "numeroDocumentoAutorizado" : (resultCancObj[10] === null) ? "" : resultCancObj[10],
                        "nombreAutorizado" : (resultCancObj[11] === null) ? "" : resultCancObj[11],
                        "tipoDocumentoDeu" : (resultCancObj[12] === null) ? "" : resultCancObj[12],
                        "tipoDocumentoAut" : (resultCancObj[13] === null) ? "" : resultCancObj[13],
                        "codInstrumento" : (resultCancObj[14] === null) ? "" : resultCancObj[14],
                        "motivo" : (resultCancObj[15] === null) ? "" : resultCancObj[15],
                        "numeroCredito" : (resultCancObj[16] === null) ? "" : resultCancObj[16]
                    });
                }); 
        //tarjeta
        const resultTar = await connection.execute(
            `SELECT t.item,
                    to_char(t.fechaoperacion, 'dd-mm-yyyy hh24:mi:ss') fechaoperacion,
                    NVL(t.sucursal, ''),
                    NVL(t.numerotarjeta, ''),
                    NVL(t.codinstrumento, ''),
                    NVL(t.nombretitular, ''),
                    NVL(t.numerodocumento, ''),
                    NVL(t.tipodocumento, ''),
                    NVL(t.montooperaciongs, 0),
                    NVL(t.lineacredito, '')
            FROM servi_pla.tarjeta t where usuario = :id`, [req.params.id]);
            resultTar.rows.forEach((resultTarObj) => {                
                cantTar = cantTar + 1 ;
                Tarjeta.push({ 
                    "item" : (resultTarObj[0] === null) ? "" : resultTarObj[0],
                    "fechaOperacion" : (resultTarObj[1] === null) ? "" : resultTarObj[1],
                    "sucursal" : (resultTarObj[2] === null) ? "" : resultTarObj[2],
                    "numeroTarjeta" : (resultTarObj[3] === null) ? "" : resultTarObj[3],
                    "codInstrumento" : (resultTarObj[4] === null) ? "" : resultTarObj[4],
                    "nombreTitular" : (resultTarObj[5] === null) ? "" : resultTarObj[5],
                    "numeroDocumento" : (resultTarObj[6] === null) ? "" : resultTarObj[6],
                    "tipoDocumento" : (resultTarObj[7] === null) ? "" : resultTarObj[7],
                    "montoOperacionGs" : (resultTarObj[8] === null) ? "" : resultTarObj[8],
                    "lineaCredito" : (resultTarObj[9] === null) ? "" : resultTarObj[9]
                });
            });
        
        //CUERPO
        data.listaDeposito = Deposito;
        data.listaExtraccion = Extracciones;
        data.listaTransferencia = Transferencia;
        data.listaCancelacion = Cancelacion;
        data.listaTarjeta = Tarjeta;
        
        //CABECERA    
        objeto ={ 
            "cantidadRegDeposito"    : cantDep,
            "cantidadRegExtraccion"  : cantExt,
            "cantidadRegTransferencia"    : cantTran,
            "cantidadRegCancelacion"    : cantCan,
            "cantidadRegTarjeta"  : cantTar,
            "data" : data
        };    
        
        console.log("peticion de archivo");
        
        res.status(200).jsonp(objeto);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
};

export const methods = {
    getArchivo,
    getArchivoUser,
    getArchivoDes,    
    getArchivoUserDes
};
