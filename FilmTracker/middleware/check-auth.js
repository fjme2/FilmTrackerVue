var jwt = require('jwt-simple');
var secret = 'practicaadi';
const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mads',
    database: 'adinode'
});


module.exports = (req, res, next) =>   {
    
    var prueba = req.get('Authorization');
    var buf = new Buffer(prueba, 'base64');
    var token = buf.toString();
    try{
        var decoded = jwt.decode(token, secret);
        let buscar = 'SELECT COUNT(username) AS cantidad FROM usuario where username=? and password=?;';

        db.query(buscar,[decoded.username,decoded.password],function (err, rows, fields) {
            if (err) {
                res.status(400).send(err);
            }
            //Si existe, seguimos
            if (rows[0].cantidad < 1) {
                res.status(401).send('No autorizado');
            }
        });

        next();

    }catch(error){
        console.log(error)
        res.status(401).send('No autorizado');
    }
    
};