const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');


// GET /usuarios - listar todos os usuários (sem mostrar a senha)
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT id, nome, idade, email FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar usuários:', err);
        res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
});

// POST /usuarios - cadastro
router.post('/', async (req, res) => {
    const { nome, idade, email, senha } = req.body;

    try {
        // Verifica se o email já existe
        const existe = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (existe.rows.length > 0) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
        }

        // Criptografar a senha
        const senhaHash = await bcrypt.hash(senha, 10); // 10 rounds de salt

        // Inserir no banco
        const result = await db.query(
            'INSERT INTO usuarios (nome, idade, email, senha) VALUES ($1, $2, $3, $4) RETURNING id, nome, email',
            [nome, idade, email, senhaHash]
        );

        res.status(201).json({ mensagem: 'Usuário criado com sucesso', usuario: result.rows[0] });
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).json({ erro: 'Erro interno ao cadastrar' });
    }
});

module.exports = router;
