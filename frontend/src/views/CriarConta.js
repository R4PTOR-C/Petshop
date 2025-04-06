import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css'; // reutiliza o mesmo CSS da tela de login

function CriarConta() {
    const [form, setForm] = useState({
        nome: '',
        idade: '',
        email: '',
        senha: ''
    });

    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setMensagem('');

        try {
            const res = await axios.post('http://localhost:3001/usuarios', form);
            setMensagem('Conta criada com sucesso!');
            setForm({ nome: '', idade: '', email: '', senha: '' });
        } catch (err) {
            console.error('Erro ao criar conta:', err);
            setMensagem(err.response?.data?.erro || 'Erro ao criar conta.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card shadow">
                <h2 className="mb-3 text-center">Criar Conta 🐶</h2>

                {mensagem && <div className="alert alert-info">{mensagem}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Idade</label>
                        <input
                            type="number"
                            className="form-control"
                            name="idade"
                            value={form.idade}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

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

                    <button type="submit" className="btn btn-success w-100" disabled={carregando}>
                        {carregando ? 'Criando...' : 'Criar Conta'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CriarConta;
