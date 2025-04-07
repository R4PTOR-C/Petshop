import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "../styles/Home.css"
import Categorias from "../components/Categorias";
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { Link } from 'react-router-dom';



function Home() {
    const [produtos, setProdutos] = useState([]);


    const { animal, categoria } = useParams();


    // 1. Primeiro defina as setas personalizadas:
    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow next" onClick={onClick}>
                <FaChevronRight />
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow prev" onClick={onClick}>
                <FaChevronLeft />
            </div>
        );
    };

// 2. Agora pode definir os settings (depois das funções acima)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '30px', // mostra a beiradinha dos lados
                    arrows: false
                }
            }
        ]
    };

    const traduzirAnimal = (valorUrl) => {
        if (valorUrl === 'caes') return 'cães';
        if (valorUrl === 'gatos') return 'gatos';
        return valorUrl;
    };

    const traduzirCategoria = (valorUrl) => {
        if (valorUrl === 'saude') return 'saúde';
        return valorUrl;
    };

    useEffect(() => {
        axios.get('http://localhost:3001/produtos')
            .then(res => {
                let lista = res.data;

                const traduzirAnimal = (valorUrl) => {
                    switch (valorUrl) {
                        case 'caes': return 'cães';
                        case 'gatos': return 'gatos';
                        case 'passaros': return 'pássaros';
                        case 'peixes': return 'peixes';
                        default: return valorUrl;
                    }
                };


                const traduzirCategoria = (valorUrl) => {
                    switch (valorUrl) {
                        case 'saude': return 'saúde';
                        case 'agua': return 'água';
                        default: return valorUrl;
                    }
                };


                const animalReal = animal ? traduzirAnimal(animal) : null;
                const categoriaReal = categoria ? traduzirCategoria(categoria) : null;

                if (animal && categoria) {
                    lista = lista.filter(prod =>
                        prod.animal.toLowerCase() === animalReal &&
                        prod.categoria.toLowerCase() === categoriaReal
                    );
                } else if (animal) {
                    lista = lista.filter(prod =>
                        prod.animal.toLowerCase() === animalReal
                    );
                }

                setProdutos(lista);
            })
            .catch(err => console.error('Erro ao buscar produtos:', err));
    }, [animal, categoria]);




    const renderCard = (produto) => (
        <Link to={`/produtos/${produto.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

        <div key={produto.id} className="carousel-card-wrapper">
            <div className="card produto-card">
                <div className="produto-card-img">
                    <img
                        src={produto.imagem_url}
                        alt={produto.nome}
                        className="img-fluid"
                    />
                </div>
                <div className="card-body p-2">
                    <h6 className="card-title mb-1">{produto.nome}</h6>
                    <p className="card-text mb-1 preco-info">
                        <strong>R$ {Number(produto.preco).toFixed(2)}</strong><br/>
                        <span className="text-muted categoria-info">
          {produto.animal} • {produto.categoria}
        </span>
                    </p>
                </div>
            </div>
        </div>
        </Link>

    );

    return (

        <div className="container mt-4">

            <h2 className="mb-4">🐾 Produtos em destaque</h2>

            {(animal || categoria) ? (
                <>
                    <Breadcrumb animal={animal} categoria={categoria} />
                    <div className="row">
                        {produtos.length > 0 ? (
                            produtos.map(produto => (
                                <div className="col-md-3 mb-4" key={produto.id}>
                                    {renderCard(produto)}
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">Nenhum produto encontrado.</p>
                        )}
                    </div>
                </>
            ) : (
                produtos.length > 4 ? (
                    <Slider {...settings}>
                        {produtos.map(produto => renderCard(produto))}
                    </Slider>
                ) : (
                    <div className="row">
                        {produtos.map(produto => (
                            <div className="col-md-3 mb-4" key={produto.id}>
                                {renderCard(produto)}
                            </div>
                        ))}
                    </div>
                )
            )}



            {!animal && !categoria &&
                <div className="w-100">
                <Categorias/>
            </div>}

        </div>
    );
}

export default Home;
