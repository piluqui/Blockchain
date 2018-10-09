var express = require('express');
var router = express.Router();
//https://www.npmjs.com/package/url-parse
var url = require('url-parse')

var Blockchain = require('../BlockChain/blockchain');
var Block = require('../BlockChain/Block');
var transaccion=require('../BlockChain/Transaccion');

var b = new Blockchain();

router.get('/', function(req, res, next) {  
    res.json(b);
});

router.get('/formulario', function(req, res, next) {
    let query = url(req.url, true).query;
    res.render('formulario', {
      title: 'Respuesta',
      nombre: query.nombre,
      apellido: query.apellido,
      email: query.email,

      materia: query.materia,
      profesor: query.profesor,

      fecha: query.fecha,
      hora: query.hora
    });
});

router.get('/last', function(req, res, next) {  
    res.json(b.getLatestBlock());
});


router.post("/formulario/respuesta", function(req, res, next) {
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let email = req.body.email;

    let materia = req.body.materia;
    let profesor = req.body.profesor;

    let fecha = req.body.fecha;
    let hora = req.body.hora;

    var trans = new transaccion(nombre, apellido, email, materia, profesor, fecha, hora);

    b.addBlock(new Block(trans));
    //res.json(b);
    res.render('respuesta', {});
});

module.exports = router;