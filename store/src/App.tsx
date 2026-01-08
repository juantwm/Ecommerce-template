import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail"; // (Para el futuro)
import CartPage from './pages/Cart';
import Checkout from "./pages/Checkout";


function App() {
  return (
    <BrowserRouter>
      {/* Contenedor principal: min-h-screen asegura que el footer baje si hay poco contenido */}
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        
        {/* Área principal de contenido */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Aquí agregaremos más rutas luego: */}
            { <Route path="/product/:id" element={<ProductDetail />} /> }
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main> 

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;