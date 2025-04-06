import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Categorias.css';

const categorias = ['comida', 'higiene', 'saude', 'casa', 'coleiras', 'roupas'];

function Categorias() {
    const navigate = useNavigate();

    const renderSecao = (animalLabel, animalPath) => (
        <div className="mb-4">
            <h5 className="mb-3">Tudo para {animalLabel}</h5>
            <div className="categorias-list">
                {categorias.map((cat) => (
                    <div
                        key={`${animalPath}-${cat}`}
                        className="categoria-item"
                        onClick={() => navigate(`/${animalPath}/${cat}`)}
                    >
                        <div className="categoria-img">
                            <img
                                src={`/img/categorias/${animalPath}/${cat}.png`}
                                alt={`${cat}-${animalPath}`}
                                className="categoria-icon"
                            />
                        </div>
                        <span className="categoria-nome">{formatarNome(cat)}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <section className="categorias-section">
            {renderSecao('cães', 'caes')}
            {renderSecao('gatos', 'gatos')}
        </section>
    );
}

const formatarNome = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default Categorias;
