const express = require('express');
const bp = require('body-parser');
const mysql = require('mysql');
const vistas = express.Router();
const auth = require('../middleware/check-auth');


vistas.use(bp.json());
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mads',
    database: 'adinode'
});

db.connect();

vistas.post('/usuario/:id',auth, function(req, res){

    var vista = req.body;
    let sql = 'Insert into vistas(usuario, pelicula) values (?, ?);'
    db.query(sql, [req.params.id, vista.pelicula], function (err, rows, fields) {
        if (err) {
            res.status(400).send(err)
        }
        res.status(201).send('Pelicula añadida a vistas');
    });

})

vistas.get('/usuario/:id',auth, function(req, res){

    let sql = 'Select pelicula from vistas where usuario=?'
    db.query(sql, [req.params.id], function (err, results) {
        if (err) {
            res.status(400).send(err)
        }
        res.status(200).send(results);
    });

})

vistas.delete('/usuario/:id',auth, function(req,res){
    let sql = 'delete from vistas where usuario= ? and pelicula = ?';
    var borrar = req.body;
    db.query(sql,[req.params.id, borrar.pelicula],(err, results) => {
        if (err) {
            res.status(400).send('Solicitud incorrecta.')
        }

        res.status(200).send('Pelicula eliminada de vistas');
    })   
})

module.exports = vistas;