import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

            // Salva o token e dados do usuário no localStorage
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

            setMensagem('Login realizado com sucesso!');
            setTimeout(() => navigate('/'), 1500); // Redireciona para a home ou dashboard
        } catch (err) {
            console.error('Erro no login:', err);
            setMensagem(err.response?.data?.erro || 'Erro ao fazer login.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Login</h2>
            {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}

            <form onSubmit={handleSubmit} className="mt-3">
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

                <button type="submit" className="btn btn-primary" disabled={carregando}>
                    {carregando ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
}

export default Login;
