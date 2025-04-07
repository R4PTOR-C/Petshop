import {Link, useNavigate, useLocation} from 'react-router-dom';
import '../styles/Navbar.css'; // o CSS que você já tem
import {FaTwitter} from 'react-icons/fa';
import {FiInstagram} from 'react-icons/fi';
import {FaWhatsapp} from 'react-icons/fa';
import React, { useState } from 'react';


function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    const [menuAberto, setMenuAberto] = useState(false);
    const [busca, setBusca] = useState('');


    const handleLogout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        navigate('/');


    };

    return (
        <>
            {menuAberto && <div className="dropdown-overlay" />}

            <nav className="navbar">
                {/* TOPO */}
                <div className="menu_superior_horizontal">
                    <div className="logo" onClick={() => navigate('/')}>
                        <img src="./petspot_dog.png" alt="logo_petspot" style={{height: '60px'}}/>
                    </div>

                    <div className="barra_pesquisa">
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                        <button onClick={() => navigate(`/busca?q=${encodeURIComponent(busca)}`)}>Buscar</button>
                    </div>

                    <div className="button_social">
                        <button className="btn_twitter"><FaTwitter/></button>
                        <button className="btn_whatsapp"><FaWhatsapp/></button>
                        <button className="btn_instagram"><FiInstagram/></button>
                    </div>

                    {/* LOGIN / USUÁRIO */}
                    <div className="d-flex align-items-center ms-4 gap-2">
                        {!usuarioLogado ? (
                            <>
                                <Link className="btn btn-outline-dark btn-sm" to="/login">Login</Link>
                                <Link className="btn btn-warning btn-sm" to="/criar-conta">Criar Conta</Link>
                            </>
                        ) : (
                            <>
                                <span style={{fontWeight: 'bold'}}>Olá, {usuarioLogado.nome}</span>
                                <button className="btn btn-outline-dark btn-sm" onClick={handleLogout}>Sair</button>
                            </>
                        )}
                    </div>
                </div>

                {/* MENU PRINCIPAL */}
                <div className="menu_horizontal">
                    <div className="itens_menu">
                        <ul>
                            <li className="item_menu"
                                onMouseEnter={() => setMenuAberto(true)}
                                onMouseLeave={() => setMenuAberto(false)}>
                                <Link to="/caes">Cachorros</Link>
                                <div className="dropdown">
                                    <ul>
                                        <li className="sub_itens_menu"><Link to="/caes/comida">Alimentação</Link></li>
                                        <li className="sub_itens_menu"><Link to="/caes/higiene">Higiene</Link></li>
                                        <li className="sub_itens_menu"><Link to="/caes/saude">Saude</Link></li>
                                        <li className="sub_itens_menu"><Link to="/caes/casa">Casa</Link></li>
                                        <li className="sub_itens_menu"><Link to="/caes/coleiras">Coleiras</Link>
                                        </li>
                                        <li className="sub_itens_menu"><Link to="/caes/roupas">Roupas</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="item_menu"
                                onMouseEnter={() => setMenuAberto(true)}
                                onMouseLeave={() => setMenuAberto(false)}>
                                <Link to="/gatos">Gatos</Link>
                                <div className="dropdown">
                                    <ul>
                                        <li className="sub_itens_menu"><Link to="/gatos/comida">Alimentação</Link></li>
                                        <li className="sub_itens_menu"><Link to="/gatos/higiene">Higiene</Link></li>
                                        <li className="sub_itens_menu"><Link to="/gatos/saude">Farmácia</Link></li>
                                        <li className="sub_itens_menu"><Link to="/gatos/casa">Acessórios</Link></li>
                                        <li className="sub_itens_menu"><Link to="/gatos/coleiras">Coleiras</Link>
                                        </li>
                                        <li className="sub_itens_menu"><Link to="/gatos/roupas">Roupas</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="item_menu"
                                onMouseEnter={() => setMenuAberto(true)}
                                onMouseLeave={() => setMenuAberto(false)}>
                                <Link to="/passaros">Passaros</Link>
                                <div className="dropdown">
                                    <ul>
                                        <li className="sub_itens_menu"><Link to="/passaros/comida">Alimentação</Link>
                                        </li>
                                        <li className="sub_itens_menu"><Link to="/passaros/saude">Farmácia</Link></li>
                                        <li className="sub_itens_menu"><Link to="/passaros/acessorios">Acessórios</Link>
                                        </li>
                                        <li className="sub_itens_menu"><Link to="/passaros/gaiola">Gaiolas</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="item_menu"
                                onMouseEnter={() => setMenuAberto(true)}
                                onMouseLeave={() => setMenuAberto(false)}>
                                <Link to="/peixes">Peixes</Link>
                                <div className="dropdown">
                                    <ul>
                                        <li className="sub_itens_menu"><Link to="/peixes/comida">Alimentação</Link></li>
                                        <li className="sub_itens_menu"><Link to="/peixes/agua">Tratamento de Água</Link>
                                        </li>
                                        <li className="sub_itens_menu"><Link to="/peixes/saude">Farmácia</Link></li>
                                        <li className="sub_itens_menu"><Link to="/peixes/acessorios">Acessórios</Link>
                                        </li>
                                        <li className="sub_itens_menu"><Link to="/peixes/brinquedos">Brinquedos</Link>
                                        </li>
                                        <li className="sub_itens_menu"><Link to="/peixes/aquarios">Aquários</Link></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="item_menu">
                                <Link to="/carrinho">Carrinho</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
