import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './pages/Products/productList';
import CreateProduct from './pages/Products/createProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir la raíz a productos por ahora */}
        <Route path="/" element={<Navigate to="/products" />} />
        
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;