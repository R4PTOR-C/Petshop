import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const [form, setForm] = useState({ email: '', senha: '' });
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem('');
        setCarregando(true);

        try {
            const res = await axios.post('http://localhost:3001/usuarios/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

            setMensagem('Login realizado com sucesso!');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            console.error('Erro no login:', err);
            setMensagem(err.response?.data?.erro || 'Erro ao fazer login.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card shadow">
                <h2 className="mb-3 text-center">Bem-vindo de volta 🐾</h2>

                {mensagem && <div className="alert alert-info">{mensagem}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            name="senha"
                            value={form.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-warning w-100" disabled={carregando}>
                        {carregando ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
