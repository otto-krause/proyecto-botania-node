const router = require('express').Router();
const pool = require('../database');

router.get('/',async(req,res,next)=>{
    const propagaciones = await pool.query(`SELECT propRengItemTec.IdPPropagacion, ingAlta.Nombre, propRengItemTec.ApellidoTec, propRengItemTec.NombreTec, propRengItemTec.ApellidoAsist, propRengItemTec.NombreAsist, propRengItemTec.Objetivo, ingAlta.Metodo, ingAlta.idIngreso, ingAlta.Legado, ingAlta.FRecoleccion, propRengItemTec.Fecha, propRengItemTec.ItemCierre
    FROM (
            SELECT propRengItemAsist.IdPPropagacion, propRengItemAsist.Objetivo, propRengItemAsist.CodIngreso0, tecnico.Apellido AS ApellidoTec, tecnico.Nombre AS NombreTec, propRengItemAsist.ApellidoAsist, propRengItemAsist.NombreAsist, propRengItemAsist.CodPP, propRengItemAsist.Fecha, propRengItemAsist.ItemCierre
            FROM (
                    SELECT propRengItem.IdPPropagacion, propRengItem.Objetivo, propRengItem.CodIngreso0, propRengItem.CodTecnico, asistente.Nombre AS NombreAsist, asistente.Apellido AS ApellidoAsist, propRengItem.ItemCierre, propRengItem.Fecha, propRengItem.CodPP
                    FROM (
                            SELECT propagacion.IdPPropagacion, propagacion.Objetivo, propagacion.CodIngreso0, propagacion.CodTecnico, propagacion.CodAsistente, renglonItem.CodPP, renglonItem.Fecha, renglonItem.ItemCierre
                            FROM (
                                    SELECT IdPPropagacion, Objetivo, CodIngreso0, CodTecnico, CodAsistente
                                    FROM codppropagacion
                                    /*WHERE FAltaTP BETWEEN aca salame and */
                                 ) AS propagacion
                            INNER JOIN (
                                          SELECT renglon.CodPP, (CAST(renglon.Fecha AS DATE)) AS Fecha, item.ItemCierre
                                          FROM (
                                                  SELECT CodPP, CodItemPP, Fecha
                                                  FROM CodPPRenglon
                                               ) AS renglon
                                          INNER JOIN (
                                                        SELECT idItemPP, ItemCierre
                                                        FROM CodItemPP
                                                          WHERE ItemCierre = true /*Esto se codea si el tipo quiere ver todos o los en curso*/
                                                     ) AS item
                                          ON renglon.CodItemPP = item.idItemPP
                                       ) AS renglonItem
                            ON propagacion.IdPPropagacion = renglonItem.codPP
                         ) AS propRengItem
                    INNER JOIN (
                                  SELECT idTecnico, Apellido, Nombre FROM CodTecnico
                               ) AS asistente
                    ON propRengItem.CodAsistente = asistente.idTecnico
                 ) AS propRengItemAsist
            INNER JOIN (
                          SELECT idTecnico, Apellido, Nombre FROM CodTecnico
                       ) AS tecnico
            ON propRengItemAsist.CodTecnico = tecnico.idTecnico
         ) AS propRengItemTec
    INNER JOIN (
                  SELECT ingreso.idIngreso, ingreso.Nombre, alta.Nombre AS Metodo, ingreso.Legado, ingreso.FRecoleccion
                  FROM (
                            SELECT idIngreso, Nombre, CodTipoAlta, Legado, (CAST(FRecoleccion AS DATE)) AS FRecoleccion
                            FROM codingreso
                       ) AS ingreso
                  INNER JOIN (
                                  SELECT idAlta, Nombre
                                  FROM codAlta
                               ) AS alta
                  ON ingreso.CodTipoAlta = alta.idAlta
               ) AS ingAlta
    ON propRengItemTec.CodIngreso0 = ingAlta.idIngreso
    GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12,13`)
    .catch(err=> next(err));
    res.send(propagaciones);
});


module.exports = router;