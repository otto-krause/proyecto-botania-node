const router = require('express').Router();
const pool = require('../database');
const {IsLoggedIn, NotLoggedIn} = require('../autenticacion');

//  --GET--  //

//enviar alumno con ID
router.get('/:idPropagacion',async(req,res,next)=>{
    const {idPropagacion} = req.params;
    const propagaciones = await pool.query('SELECT * FROM Propagacion WHERE idPropagacion = ?',[idPropagacion]) //Acá va la consulta que va a hacer Guille
    .catch(err=> next(err));
});


module.exports = router;