import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Produtos from './views/TabelaProdutos';
import Navbar from './components/Navbar';
import NovoProduto from './views/NovoProduto';
import Home from './views/Home';
import EditarProduto from './views/EditarProduto';
import CriarConta from "./views/CriarConta";
import Login from './views/Login';
import ProdutosFiltrados from './views/ProdutosFiltrados';



<Routes>
    {/* outras rotas */}
    <Route path="/produtos/:id/editar" element={<EditarProduto />} />
</Routes>


function App() {
  return (
      <Router>
          <Navbar />
          <div className="container mt-4">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/:animal/:categoria" element={<Home />} />
                  <Route path="/produtos" element={<Produtos />} />
                  <Route path="/novo_produto" element={<NovoProduto />} />
                  <Route path="/produtos/:id/editar" element={<EditarProduto />} />
                  <Route path="/criar-conta" element={<CriarConta />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/produtos" element={<ProdutosFiltrados />} />

              </Routes>
          </div>
      </Router>
  );
}

export default App;
