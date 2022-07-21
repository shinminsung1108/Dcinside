const port = 3001
const mysql = require('mysql');
const express = require('express')
const app = express()

app.get('/', (req,res) => res.send('hello'));

app.listen(port, () => console.log(`민성이의 포뚜번호눈? ${port}`))

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'dcinside',
});

con.connect(function(err) {
    if(err) throw err;
    console.log('연결 ㅋ');

    const sql = 'select * from users'
    con.query(sql, function(err, result, field) {
        if (err) throw err;
        console.log(result);
    })
});

