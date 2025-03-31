import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaDog } from 'react-icons/fa';
import { GiDogHouse } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-petspot">
            <div className="container-fluid d-flex align-items-center">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <div className="d-flex align-items-center position-relative">
                        <GiDogHouse size={30} style={{ color: '#0056b3' }} />
                        <div style={{ width: 28, height: 30, position: 'relative', marginLeft: '6px' }}>
                            <AnimatePresence mode="wait">
                                {!isHome && (
                                    <motion.div
                                        key="dog"
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 30, opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                        style={{ position: 'absolute', top: 4 }}
                                    >
                                        <FaDog size={22} style={{ color: '#0056b3' }} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <span className="ms-2">Pet Spot</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Início</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/produtos">Produtos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/novo_produto">Novo Produto</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3 ms-auto">
                        {!usuarioLogado ? (
                            <>
                                <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
                                <Link className="btn btn-warning btn-sm" to="/criar-conta">Criar Conta</Link>
                            </>
                        ) : (
                            <>
                                <span className="text-white">Olá, {usuarioLogado.nome} 👋</span>
                                <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Sair</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
