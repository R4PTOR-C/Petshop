const express = require('express');
const cors = require('cors');
const db = require('./db');
const produtosRoutes = require('./routes/produtos');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
