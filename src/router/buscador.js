const router = require('express').Router();
const pool = require('../database');

router.get('/Buscador',async(req,res,next)=>{
    const {idPropagacion} = req.params;
    const propagaciones = await pool.query('SELECT CodPPRenglon, Fecha, Nombre, CodPPRenglon.Des FROM (CodPPRenglon JOIN CodItemPP ON (CodPPRenglon.CodItemPP = CodItemPP.IdItemPP)) WHERE (CodPP IN (SELECT IdPPropagacion FROM CodPPropagacion) AND CodPP = ?);',[idPropagacion]) //Acá va la consulta que va a hacer Guille
    .catch(err=> next(err));
    res.send(propagaciones);
});


module.exports = router;