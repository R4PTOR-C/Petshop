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
                        <div className="categoria-img categoria-color--" style={{ backgroundColor: corDaCategoria(cat) }}>
                            <span className="categoria-placeholder">📦</span>
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

// Cores temáticas para cada categoria (opcional)
const corDaCategoria = (categoria) => {
    switch (categoria) {
        case 'comida': return '#FFD100';
        case 'higiene': return '#A3D9FF';
        case 'saude': return '#FFA3A3';
        case 'casa': return '#D5C9F5';
        case 'coleiras': return '#FFDEAD';
        case 'roupas': return '#B3FFC1';
        default: return '#EEE';
    }
};

// Capitaliza primeira letra
const formatarNome = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default Categorias;
