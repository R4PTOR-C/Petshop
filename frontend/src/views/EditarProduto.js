import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome: '',
        preco: '',
        animal: '',
        categoria: '',
        imagem_url: '',
    });

    const [novaImagem, setNovaImagem] = useState(null);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:3001/produtos/${id}`)
            .then((res) => setForm(res.data))
            .catch((err) => console.error('Erro ao buscar produto:', err));
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imagem') {
            setNovaImagem(files[0]);
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imagem_url = form.imagem_url;

            if (novaImagem) {
                const formData = new FormData();
                formData.append('file', novaImagem);
                formData.append('upload_preset', 'petspot_upload');

                const uploadRes = await axios.post(
                    'https://api.cloudinary.com/v1_1/dtyyrfo8e/image/upload',
                    formData
                );

                imagem_url = uploadRes.data.secure_url;
            }

            await axios.put(`http://localhost:3001/produtos/${id}`, {
                ...form,
                imagem_url,
            });

            setMensagem('Produto atualizado com sucesso!');
            setTimeout(() => navigate('/produtos'), 1500);
        } catch (err) {
            console.error('Erro ao atualizar produto:', err);
            setMensagem('Erro ao atualizar produto.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Editar Produto</h2>
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
                    <input type="text" className="form-control" name="animal" value={form.animal} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoria</label>
                    <input type="text" className="form-control" name="categoria" value={form.categoria} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagem atual</label><br />
                    <img src={form.imagem_url} alt="Imagem atual" className="img-thumbnail mb-2" style={{ maxHeight: '200px' }} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Nova imagem (opcional)</label>
                    <input type="file" className="form-control" name="imagem" accept="image/*" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-primary">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditarProduto;
