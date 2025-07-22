const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'aTlas102030##',
    database: 'cadastro_usuarios'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

app.post('/cadastro', (req, res) => {
    const { nome, email, senha, telefone } = req.body;
    console.log("Dados recebidos:", nome, email, senha, telefone);

    const query = 'INSERT INTO usuarios (nome, email, senha, telefone) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, email, senha, telefone], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).json({ sucesso: false, erro: err.message });
        }
        console.log('Dados inseridos com sucesso, ID:', result.insertId);
        return res.json({ sucesso: true });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
