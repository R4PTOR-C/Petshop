import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Breadcrumb.css';

function Breadcrumb({ animal, categoria }) {
    const navigate = useNavigate();

    // Funções para exibir nomes bonitos
    const nomeAnimal = animal === 'caes' ? 'Cachorro' : 'Gato';
    const nomeCategoria = categoria.charAt(0).toUpperCase() + categoria.slice(1);

    return (
        <nav className="breadcrumb-nav mb-3">
      <span className="breadcrumb-item" onClick={() => navigate('/')}>
        Pet Spot
      </span>
            {animal && (
                <span className="breadcrumb-separator">›</span>
            )}
            {animal && (
                <span className="breadcrumb-item" onClick={() => navigate(`/${animal}`)}>
          {nomeAnimal}
        </span>
            )}
            {categoria && (
                <>
                    <span className="breadcrumb-separator">›</span>
                    <span className="breadcrumb-current">{nomeCategoria}</span>
                </>
            )}
        </nav>
    );
}

export default Breadcrumb;
