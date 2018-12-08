var express = require('express');
var jwt = require('jwt-simple');
var bp = require('body-parser');
var mysql = require('mysql');
var app = express();
var secret = 'practicaadi';

var cors = require('cors');
app.use(cors());

const usuarios = require('./routes/usuarios');
app.use('/usuarios', usuarios);

const pelicula = require('./routes/pelicula');
app.use('/pelicula', pelicula);

const vistas = require('./routes/vistas');
app.use('/vistas', vistas);

app.use(bp.json())

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mads',
    database: 'adinode'
});
//Conectar a la b
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Base de datos conectada.')
})

//Loguearse
app.post('/login', function (pet, resp) {
    var user = pet.body;
    let sql = 'SELECT COUNT(username) AS cantidad FROM usuario where username=? and password=?;';
    //Comprobamos si el usuario existe
    db.query(sql,[user.username,user.password], function (err, rows, fields) {
        if (err) {
            resp.status(400).send('Solicitud incorrecta.')
        }
        //Si ya existe no lo insertamos
        if (rows[0].cantidad < 1) {
            resp.status(401).send('Autenticación fallida')
            
        }else{
            var token = jwt.encode(user, secret);
            resp.status(200).json({token: token})
            console.log('Usuario logeado.');
        }

    });     
});

app.listen(3000, function () {
    console.log("El servidor express está en el puerto 3000");
});