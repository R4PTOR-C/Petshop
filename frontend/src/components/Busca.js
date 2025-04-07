import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function Busca() {
    const [produtos, setProdutos] = useState([]);
    const [resultados, setResultados] = useState([]);
    const location = useLocation();

    // Captura o termo da URL (ex: /busca?q=ração)
    const query = new URLSearchParams(location.search);
    const termo = query.get('q')?.toLowerCase() || '';

    useEffect(() => {
        axios.get('http://localhost:3001/produtos')
            .then(res => {
                const filtrados = res.data.filter(prod =>
                    prod.nome.toLowerCase().includes(termo) ||
                    prod.categoria.toLowerCase().includes(termo) ||
                    prod.animal.toLowerCase().includes(termo)
                );
                setProdutos(filtrados);
            })
            .catch(err => console.error('Erro ao buscar produtos:', err));
    }, [termo]);

    return (
        <div className="container mt-4">
            <h2>🔍 Resultados para: <em>{termo}</em></h2>

            {produtos.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                <div className="row mt-3">
                    {produtos.map(produto => (
                        <div className="col-md-3 mb-4" key={produto.id}>
                            <Link to={`/produtos/${produto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="card h-100">
                                    <img src={produto.imagem_url} alt={produto.nome} className="card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
                                    <div className="card-body">
                                        <h6>{produto.nome}</h6>
                                        <p className="text-muted">{produto.animal} • {produto.categoria}</p>
                                        <strong>R$ {Number(produto.preco).toFixed(2)}</strong>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Busca;
