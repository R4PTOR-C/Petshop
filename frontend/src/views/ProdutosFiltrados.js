import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function ProdutosFiltrados() {
    const [produtos, setProdutos] = useState([]);
    const [searchParams] = useSearchParams();

    const animal = searchParams.get('animal');
    const categoria = searchParams.get('categoria');

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const res = await axios.get('http://localhost:3001/produtos');
                // Filtra os produtos por categoria e animal (se houver)
                const filtrados = res.data.filter((produto) => {
                    const matchAnimal = animal ? produto.animal.toLowerCase() === animal.toLowerCase() : true;
                    const matchCategoria = categoria ? produto.categoria.toLowerCase() === categoria.toLowerCase() : true;
                    return matchAnimal && matchCategoria;
                });
                setProdutos(filtrados);
            } catch (err) {
                console.error('Erro ao buscar produtos:', err);
            }
        };

        fetchProdutos();
    }, [animal, categoria]);

    return (
        <div className="container mt-4">
            <h4 className="mb-4">
                Produtos {animal && `para ${animal}`} {categoria && `• ${categoria}`}
            </h4>

            <div className="row">
                {produtos.length === 0 ? (
                    <p>Nenhum produto encontrado.</p>
                ) : (
                    produtos.map((produto) => (
                        <div className="col-md-3 mb-4" key={produto.id}>
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={produto.imagem_url}
                                    alt={produto.nome}
                                    className="card-img-top"
                                    style={{ height: '150px', objectFit: 'contain' }}
                                />
                                <div className="card-body">
                                    <h6 className="card-title">{produto.nome}</h6>
                                    <p className="card-text">
                                        <strong>R$ {Number(produto.preco).toFixed(2)}</strong><br />
                                        <span className="text-muted">{produto.animal} • {produto.categoria}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProdutosFiltrados;
