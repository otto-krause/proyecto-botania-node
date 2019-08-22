const router = require('express').Router();
const path = require('path');

//No sé cómo funciona VUE con esto así que por ahora lo dejo así xdxdDXXDDX
router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../public/Privado.html'));
});

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../public/Privado.html'));
});

module.exports = router;