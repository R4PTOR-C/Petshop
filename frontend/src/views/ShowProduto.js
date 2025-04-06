import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShowProduto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState(null);
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/produtos/${id}`)
            .then(res => setProduto(res.data))
            .catch(err => console.error('Erro ao buscar produto:', err));
    }, [id]);

    const adicionarAoCarrinho = () => {
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinhoAtual.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
        setMensagem('Produto adicionado ao carrinho!');
        setTimeout(() => setMensagem(''), 2000);
    };

    if (!produto) return <div className="container mt-4">Carregando...</div>;

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>← Voltar</button>

            {mensagem && <div className="alert alert-success">{mensagem}</div>}

            <div className="row">
                <div className="col-md-5">
                    <img src={produto.imagem_url} alt={produto.nome} className="img-fluid rounded shadow" />
                </div>

                <div className="col-md-7">
                    <h2>{produto.nome}</h2>
                    <h4 className="text-success">R$ {Number(produto.preco).toFixed(2)}</h4>
                    <p><strong>Animal:</strong> {produto.animal}</p>
                    <p><strong>Categoria:</strong> {produto.categoria}</p>

                    {usuarioLogado && (
                        <button className="btn btn-warning mt-3" onClick={adicionarAoCarrinho}>
                            🛒 Adicionar ao Carrinho
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowProduto;
