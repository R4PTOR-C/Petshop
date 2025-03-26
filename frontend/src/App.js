import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Produtos from './views/TabelaProdutos';
import Navbar from './components/Navbar';
import NovoProduto from './views/NovoProduto';
import Home from './views/Home';
import EditarProduto from './views/EditarProduto';

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
                  <Route path="/produtos" element={<Produtos />} />
                  <Route path="/novo_produto" element={<NovoProduto />} />
                  <Route path="/produtos/:id/editar" element={<EditarProduto />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
