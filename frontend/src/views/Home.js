import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/produtos')
            .then(res => setProdutos(res.data))
            .catch(err => console.error('Erro ao buscar produtos:', err));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">🐾 Produtos em destaque</h2>

            <div className="row">
                {produtos.map(produto => (
                    <div className="col-md-3 mb-4" key={produto.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="d-flex align-items-center justify-content-center" style={{ height: '180px', overflow: 'hidden' }}>
                                <img
                                    src={produto.imagem_url}
                                    alt={produto.nome}
                                    className="img-fluid"
                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            <div className="card-body p-2">
                                <h6 className="card-title mb-1">{produto.nome}</h6>
                                <p className="card-text mb-1" style={{ fontSize: '14px' }}>
                                    <strong>R$ {Number(produto.preco).toFixed(2)}</strong><br />
                                    <span className="text-muted" style={{ fontSize: '12px' }}>
          {produto.animal} • {produto.categoria}
        </span>
                                </p>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default Home;
