const router = require('express').Router();
const pool = require('../database');

router.get('/BuscadorAvanzado',async(req,res,next)=>{
    const propagaciones = await pool.query('SELECT * FROM Propagacion WHERE idPropagacion = ?',4) //Acá va la consulta que va a hacer Guille
    .catch(err=> next(err));
    res.send(propagaciones);
});


module.exports = router;