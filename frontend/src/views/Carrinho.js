import React, { useEffect, useState } from 'react';

function Carrinho() {
    const [itens, setItens] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        setItens(carrinho);
        calcularTotal(carrinho);
    }, []);

    const calcularTotal = (lista) => {
        const valorTotal = lista.reduce((acc, item) => acc + Number(item.preco), 0);
        setTotal(valorTotal);
    };

    const removerItem = (index) => {
        const novoCarrinho = [...itens];
        novoCarrinho.splice(index, 1);
        setItens(novoCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        calcularTotal(novoCarrinho);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">🛒 Carrinho de Compras</h2>

            {itens.length === 0 ? (
                <p className="text-muted">Seu carrinho está vazio.</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {itens.map((item, index) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                <div className="d-flex align-items-center gap-3">
                                    <img src={item.imagem_url} alt={item.nome} width={60} height={60} className="rounded" />
                                    <div>
                                        <strong>{item.nome}</strong><br />
                                        <span className="text-muted">R$ {Number(item.preco).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="btn btn-sm btn-danger" onClick={() => removerItem(index)}>
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>

                    <h4>Total: <span className="text-success">R$ {total.toFixed(2)}</span></h4>

                    {/* Botão para futura finalização */}
                    <button className="btn btn-primary mt-3" disabled>
                        Finalizar Compra (em breve)
                    </button>
                </>
            )}
        </div>
    );
}

export default Carrinho;
