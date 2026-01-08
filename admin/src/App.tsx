import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// 1. TUS COMPONENTES (Activos)
import Login from "./pages/Login"; 
import CategoryList from "./pages/Categories/CategoryList";
import CreateCategory from "./pages/Categories/CreateCategory";
import Sidebar from "./components/Sidebar"; 
import ProductList from './pages/Products/productList';
import CreateProduct from './pages/Products/createProduct';
import EditProduct from "./pages/Products/editProduct";
import EditCategory from "./pages/Categories/EditCategory";
import Orders from "./pages/Orders";

// 3. LAYOUT (Tu estructura nueva)
function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}

function Dashboard() {
  return <h1 className="text-3xl font-bold">🏠 Dashboard</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA */}
        <Route path="/" element={<Login />} />

        {/* RUTAS PRIVADAS (Con Sidebar) */}
        <Route element={<AdminLayout />}>
          
          <Route path="/dashboard" element={<Dashboard />} />

          {/* --- TUS RUTAS (CATEGORÍAS) --- */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/create" element={<CreateCategory />} />
          <Route path="/categories/edit/:id" element={<EditCategory />} />
          <Route path="/orders" element={<Orders />} />
        
          <Route path="/products" element={<ProductList />} />          {/* La lista */}
          <Route path="/products/create" element={<CreateProduct />} /> {/* El formulario */}
          <Route path="/products/edit/:id" element={<EditProduct />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;