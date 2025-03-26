import React, { useEffect, useState } from 'react';

function TabelaProdutos() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/produtos')
            .then(res => res.json())
            .then(data => setProdutos(data))
            .catch(err => console.error('Erro ao buscar produtos:', err));
    }, []);

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
                    <th>imagem_url</th>
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
                        <td>{produto.imagem_url}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaProdutos;
