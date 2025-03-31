import React, { useState } from 'react';
import axios from 'axios';

function NovoProduto() {
    const [form, setForm] = useState({
        nome: '',
        preco: '',
        animal: '',
        categoria: '',
        imagem: null,
    });

    const [carregando, setCarregando] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setMensagem('');

        try {
            const formData = new FormData();
            formData.append('file', form.imagem);
            formData.append('upload_preset', 'petspot_upload');

            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/dtyyrfo8e/image/upload',
                formData
            );

            const imagem_url = uploadRes.data.secure_url;

            await axios.post('http://localhost:3001/produtos', {
                nome: form.nome,
                preco: form.preco,
                animal: form.animal,
                categoria: form.categoria,
                imagem_url
            });

            setMensagem('Produto cadastrado com sucesso!');
            setForm({ nome: '', preco: '', animal: '', categoria: '', imagem: null });
        } catch (err) {
            console.error('Erro:', err);
            setMensagem('Erro ao cadastrar produto.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Cadastrar Novo Produto</h2>
            {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}

            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" name="nome" value={form.nome} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Preço</label>
                    <input type="number" step="0.01" className="form-control" name="preco" value={form.preco} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Animal</label>
                    <select className="form-select" name="animal" value={form.animal} onChange={handleChange} required>
                        <option value="">Selecione o animal</option>
                        <option value="cães">Cães</option>
                        <option value="gatos">Gatos</option>
                        <option value="pássaros">Pássaros</option>
                        <option value="peixes">Peixes</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <select className="form-select" name="categoria" value={form.categoria} onChange={handleChange} required>
                        <option value="">Selecione a categoria</option>
                        <option value="comida">Comida</option>
                        <option value="higiene">Higiene</option>
                        <option value="saúde">Saúde</option>
                        <option value="casa">Casa</option>
                        <option value="coleiras">Coleiras</option>
                        <option value="roupas">Roupas</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagem</label>
                    <input type="file" className="form-control" name="imagem" accept="image/*" onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary" disabled={carregando}>
                    {carregando ? 'Enviando...' : 'Cadastrar Produto'}
                </button>
            </form>
        </div>
    );
}

export default NovoProduto;
