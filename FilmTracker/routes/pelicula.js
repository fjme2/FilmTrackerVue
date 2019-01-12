const express = require('express');
const bp = require('body-parser');
const pelicula = express.Router();
const apikey = '5e707316bcf71fd34ccee6b7ce9c7fb8';
const request = require('request');
const mysql = require('mysql');
const auth = require('../middleware/check-auth');

var cors = require('cors')
pelicula.use(cors())

pelicula.use(bp.json());
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mads',
  database: 'adinode'
});

db.connect();

//información de la pelicula pasada por id
pelicula.get('/:id', function(req,res){
  let buscar = 'SELECT COUNT(id) AS cantidad FROM pelicula where id="' + req.params.id + '";';
  let sql = 'SELECT id, titulo, fecha, overview FROM pelicula where id=?';
  let insertar = 'Insert into pelicula(id,titulo,fecha, overview) values (?, ?, ?, ?);';
  db.query(buscar, function (err, rows, fields) {
    if (err) {
        res.status(400).send(err);   
    }
    //Si ya existe no lo insertamos
    if (rows[0].cantidad == 1) {
      db.query(sql,[req.params.id], function (err, rows, fields) {
        if (err) {
            res.status(400).send(err);
        }
        var pelicula = rows[0]
        if (pelicula) {
          console.log(pelicula)
            res.status(200).send(pelicula);
        }
    });
    } else {
      peli = 'https://api.themoviedb.org/3/movie/' + req.params.id;
      var options = { method: 'GET',
      url: peli,
      qs: 
       { language: 'es-es',
         api_key: apikey },
      body: '{}' };
    
    request(options, function (error, response, body) {
      var data = JSON.parse(body);
      if (error) throw new Error(error);
      db.query(insertar, [data.id, data.title, data.release_date, data.overview], function (err, rows, fields) {
        if (err) {
            res.status(400).send(err);
        }
      });
      res.status(200).send(body)
    });

    }
  });

})

pelicula.get('/',auth, function (pet, res) {
  let sql = 'Select * from pelicula';
  db.query(sql, (err, results) => {

      if (err) {
          res.status(400).send('Solicitud incorrecta.')
      }

      res.status(200).send(results);
  })    

});

pelicula.post('/', auth,function (pet, res){
  var nuevo = pet.body
  let buscar = 'SELECT COUNT(id) AS cantidad FROM pelicula where id="' + nuevo.id + '";';
  let sql = 'SELECT id, titulo, fecha, overview FROM pelicula where id=?';
  let insertar = 'Insert into pelicula(id,titulo,fecha, overview) values (?, ?, ?, ?);';
  db.query(buscar, function (err, rows, fields) {
    if (err) {
        res.status(400).send(err);
    }
    //Si ya existe no lo insertamos
    if (rows[0].cantidad == 1) {
      res.status(200).send('Ya existe una pelicula con ese id');
      console.log('Ya existe una pelicula con ese id')
    }else{

      db.query(insertar, [nuevo.id, nuevo.titulo, nuevo.fecha, nuevo.overview], function (err, rows, fields) {
        if (err) {
          res.status(400).send(err);
        }else{
          res.status(201).send(nuevo)
          console.log('Pelicula Añadida')
        }
      });
      
  }
  });

})

//Borrar un usario
pelicula.delete('/',auth, function(req,res){
  let sql = 'delete from pelicula where id= ?';
  db.query(sql,[req.body.id],(err, results) => {
      if (err) {
          res.status(400).send('Solicitud incorrecta.')
      }

      res.status(200).send('Usuario eliminado');
  })   
})

module.exports = pelicula;