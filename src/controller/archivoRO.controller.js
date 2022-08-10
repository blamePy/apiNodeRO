import { getConnection } from "./../database/database";

const getArchivo = async (req, res) => {
    try {        
        console.log("peticion de archivo");
        const connection = await getConnection();
        const result = await connection.execute("select * from servi_pla.cancelacion");
        //var buff = new Buffer(JSON.stringify(result)).toString("base64");
        res.status(200).jsonp(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getArchivo
};
