const { Pool } = require('pg');

const pool = new Pool({
    user: 'petshop_visj_user',
    host: 'dpg-cvhuqbdds78s73ehnnig-a.oregon-postgres.render.com',
    database: 'petshop_visj',
    password: 'sPU2YoFQZulixjLgBiLOpHW3xRnlV4EM',
    port: 5432,
    ssl: {
        rejectUnauthorized: false // necessário para o Render
    }
});

module.exports = pool;
