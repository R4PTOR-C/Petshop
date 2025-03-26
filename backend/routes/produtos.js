const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /produtos
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM produtos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar produtos');
    }
});

// POST /produtos
router.post('/', async (req, res) => {
    const { nome, preco, animal, categoria, imagem_url } = req.body;

    try {
        const query = `
      INSERT INTO produtos (nome, preco, animal, categoria, imagem_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
        const values = [nome, preco, animal, categoria, imagem_url];
        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao cadastrar produto:', err);
        res.status(500).send('Erro ao cadastrar produto');
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Produto não encontrado');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao buscar produto por ID:', err);
        res.status(500).send('Erro no servidor');
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, preco, animal, categoria, imagem_url } = req.body;

    try {
        const result = await db.query(
            `UPDATE produtos SET nome = $1, preco = $2, animal = $3, categoria = $4, imagem_url = $5 WHERE id = $6 RETURNING *`,
            [nome, preco, animal, categoria, imagem_url, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).send('Produto não encontrado');
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send('Erro ao atualizar produto');
    }
});



module.exports = router;
