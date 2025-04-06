import React, { useEffect, useState } from 'react';

function TabelaProdutos() {
    const [produtos, setProdutos] = useState([]);

    const buscarProdutos = () => {
        fetch('http://localhost:3001/produtos')
            .then(res => res.json())
            .then(data => setProdutos(data))
            .catch(err => console.error('Erro ao buscar produtos:', err));
    };

    useEffect(() => {
        buscarProdutos();
    }, []);

    const excluirProduto = async (id) => {
        const confirmar = window.confirm("Tem certeza que deseja excluir este produto?");
        if (!confirmar) return;

        try {
            const res = await fetch(`http://localhost:3001/produtos/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setProdutos(prev => prev.filter(prod => prod.id !== id));
            } else {
                alert('Erro ao excluir produto.');
            }
        } catch (err) {
            console.error('Erro ao excluir produto:', err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Lista de Produtos</h2>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço (R$)</th>
                    <th>Animal</th>
                    <th>Categoria</th>
                    <th>Imagem</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {produtos.map(produto => (
                    <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.nome}</td>
                        <td>{Number(produto.preco).toFixed(2)}</td>
                        <td>{produto.animal}</td>
                        <td>{produto.categoria}</td>
                        <td>
                            <a href={produto.imagem_url} target="_blank" rel="noreferrer">Ver imagem</a>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => excluirProduto(produto.id)}
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaProdutos;
