const express = require('express');
const bp = require('body-parser');
const mysql = require('mysql');
const usuarios = express.Router();
const auth = require('../middleware/check-auth');

usuarios.use(bp.json());
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mads',
    database: 'adinode'
});

db.connect();

//Mostrar todos lo usuarios
usuarios.get('/',auth, function (pet, res) {
    let sql = 'Select * from usuario';
    db.query(sql, (err, results) => {

        if (err) {
            res.status(400).send('Solicitud incorrecta.')
        }

        res.status(200).send(results);
    })    

});

//Crear usuario
usuarios.post('/', function (pet, res) {

    var nuevo = pet.body
    console.log('Creando usuario...')
    let buscar = 'SELECT COUNT(username) AS cantidad FROM usuario where username="' + nuevo.username + '";';
    let insertar = 'Insert into usuario(username, email, password) values (?, ?, ?);';

    //Debe contener el usuario y contrase�a.
    if (nuevo.username && nuevo.password) {
        //Comprobamos si el usuario ya existe en la base de datos
        db.query(buscar, function (err, rows, fields) {
            if (err) {
                res.status(400).send(err);
            }
            //Si ya existe no lo insertamos
            if (rows[0].cantidad == 1) {
                res.status(200).send('El usuario ya existe.');
            } else {
                //Si no existe lo insertamos
                db.query(insertar, [nuevo.username, nuevo.email, nuevo.password], function (err, rows, fields) {
                    if (err) {
                        res.status(400).send(err);
                    }
                    res.status(201).send('Usuario creado con exito');
                });
            }
        });
    }
    else {
        resp.status(400).send('Falta el username o la contraseña');
    }
})

//Mostrar el usuario con cierto id
usuarios.get('/:id',auth, function (pet, res) {
    var ident = pet.params.id
    let sql = 'SELECT id, username, email FROM usuario where id=?';
        //Comprobamos si el usuario existe
        db.query(sql,[ident], function (err, rows, fields) {
            if (err) {
                res.status(400).send(err);
            }
            var user = rows[0];
            if (user) {
                res.status(200).send(user);
            }
            else {
                res.status(404).send('Usuario no encontrado.')
            }
        });
       
})

//Borrar un usario
usuarios.delete('/:id',auth, function(req,res){
    let sql = 'delete from usuario where id= ?';
    db.query(sql,[req.params.id],(err, results) => {
        if (err) {
            res.status(400).send('Solicitud incorrecta.')
        }

        res.status(200).send('Usuario eliminado');
    })   
})

//Actualizar un usario
usuarios.put('/:id',auth, function(req,res){
    var email = req.body.email;
    let sql = 'update usuario set email= ? where id= ?';
    
    db.query(sql,[email,req.params.id],(err, results) => {
        if (err) {
            res.status(400).send('Solicitud incorrecta.')
        }

        res.status(200).send('Usuario actualizado');
    })   
})
module.exports = usuarios;