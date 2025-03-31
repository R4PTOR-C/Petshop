const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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


// POST /usuarios/login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ erro: 'Usuário não encontrado' });
        }

        const usuario = result.rows[0];

        // Verifica a senha
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        }

        // Gera token
        const token = jwt.sign(
            { id: usuario.id, nome: usuario.nome, email: usuario.email },
            'segredo-petspot', // substitua por uma variável de ambiente no futuro
            { expiresIn: '2h' }
        );

        // Retorna token e dados
        res.json({
            mensagem: 'Login realizado com sucesso',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ erro: 'Erro ao realizar login' });
    }
});

module.exports = router;
