const express = require('express');
const mysql = require('mysql2');
const app = express();
const porta = 3000;
const cors = require('cors');

app.use(express.json());
app.use(express.static('.'));
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gourmetify'
});

db.connect((err)=>{
    if (err) {
        console.log('erro ao conectar no banco:', err);
        return;
    }
    console.log('conectado ao banco ')
})

app.post('/candidatura', (req, res) => {
    const {nome, email, telefone, assunto, mensagem} = req.body;

    const sql = `INSERT INTO candidatos (nome, email, telefone, assunto, mensagem) 
                 VALUES (?, ?, ?, ?, ?)`;
    
    db.query(sql, [nome, email, telefone, assunto, mensagem], (err) => {
        if (err) return res.json({success: false});
        res.json({success: true});
    });
});

app.listen(3000, () => console.log('Servidor rodando!'));