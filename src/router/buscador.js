const router = require('express').Router();
const pool = require('../database');

router.get('/',async(req,res,next)=>{
    //const {idPropagacion} = req.params;
    const propagaciones = await pool.query(`SELECT PropTecAsist.IdPPropagacion, PropTecAsist.CodIngreso0, PropTecAsist.CodTecnico, PropTecAsist.CodAsistente, PropTecAsist.Objetivo, PropTecAsist.Metodo, PropTecAsist.CreadoUsuario, PropTecAsist.CreadoFecha, PropTecAsist.ModFecha, PropTecAsist.FAltaTP, PropTecAsist.ApellidoTec, PropTecAsist.NombreTec, PropTecAsist.ApellidoAsist, PropTecAsist.NombreAsist, Ingreso0.Nombre, Ingreso0.FLegado, Ingreso0.Legado, Ingreso0.LugarRecoleccion, Ingreso0.Cantidad
    FROM (
        SELECT PropTecnicos.IdPPropagacion, PropTecnicos.CodIngreso0, PropTecnicos.CodTecnico, PropTecnicos.CodAsistente, PropTecnicos.Objetivo, PropTecnicos.Metodo, PropTecnicos.CreadoUsuario, PropTecnicos.CreadoFecha, PropTecnicos.ModFecha, PropTecnicos.FAltaTP, PropTecnicos.ApellidoTec, PropTecnicos.NombreTec, Asistentes.ApellidoAsist, Asistentes.NombreAsist
        FROM (
            SELECT Propagacion.IdPPropagacion, Propagacion.CodIngreso0, Propagacion.CodTecnico, Propagacion.CodAsistente, Propagacion.Objetivo, Propagacion.Metodo, Propagacion.CreadoUsuario, Propagacion.CreadoFecha, Propagacion.ModFecha, Propagacion.FAltaTP, Tecnicos.ApellidoTec, Tecnicos.NombreTec
            FROM (
                SELECT IdPPropagacion, CodIngreso0, CodTecnico, CodAsistente, Objetivo, Metodo, CreadoUsuario, CreadoFecha, ModFecha, FAltaTP
                FROM CodPPropagacion
            ) AS Propagacion
            INNER JOIN (
                SELECT IdTecnico, (Apellido) AS ApellidoTec, (Nombre) AS NombreTec
                FROM CodTecnico
            ) AS Tecnicos
            ON Propagacion.CodTecnico = Tecnicos.idTecnico
        ) AS PropTecnicos
        INNER JOIN (
            SELECT IdTecnico, (Apellido) AS ApellidoAsist, (Nombre) AS NombreAsist
            FROM CodTecnico
        ) AS Asistentes
        ON PropTecnicos.CodAsistente = Asistentes.idTecnico
    ) AS PropTecAsist
    INNER JOIN (
        SELECT IdIngreso, Nombre, FLegado, Legado, LugarRecoleccion, Cantidad
        FROM CodIngreso
    ) AS Ingreso0
    ON PropTecAsist.CodIngreso0 = Ingreso0.IdIngreso`)
    //const propagaciones = await pool.query('SELECT CodPPRenglon, Fecha, Nombre, CodPPRenglon.Des FROM (CodPPRenglon JOIN CodItemPP ON (CodPPRenglon.CodItemPP = CodItemPP.IdItemPP)) WHERE (CodPP IN (SELECT IdPPropagacion FROM CodPPropagacion) AND CodPP = ?)')
    .catch(err=> next(err));
    res.json(propagaciones);
});

module.exports = router;