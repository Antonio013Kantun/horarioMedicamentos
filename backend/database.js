const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'mysql-medicamento.alwaysdata.net',
    user: '336848_medi',
    password: 'medi123',
    database: 'medicamento_app',
});

connection.connect((error)=>{
    if (error){
        console.error(" Error al conectar la base de datos",error);
    }else{
        console.log("Conexion exitosa");
    }
});

module.exports = connection;