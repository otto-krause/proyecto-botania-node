const router = require('express').Router();
const pool = require('../database');

router.get('/',async(req,res,next)=>{
    //const {idPropagacion} = req.params;
    const propagaciones = await pool.query('SELECT * FROM CodPPropagacion JOIN (SELECT CodPP, CodPPRenglon, Fecha, Nombre, CodPPRenglon.Des FROM (CodPPRenglon JOIN CodItemPP ON (CodPPRenglon.CodItemPP = CodItemPP.IdItemPP))) AS A ON (CodPPropagacion.IdPPropagacion = CodPP)')
    //const propagaciones = await pool.query('SELECT CodPPRenglon, Fecha, Nombre, CodPPRenglon.Des FROM (CodPPRenglon JOIN CodItemPP ON (CodPPRenglon.CodItemPP = CodItemPP.IdItemPP)) WHERE (CodPP IN (SELECT IdPPropagacion FROM CodPPropagacion) AND CodPP = ?)')
    .catch(err=> next(err));
    res.json(propagaciones);
});

module.exports = router;