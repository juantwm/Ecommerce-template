import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ProductList from "./pages/Products/productList";
import CreateProduct from "./pages/Products/createProduct";
import EditProduct from "./pages/Products/editProduct";
import CategoryList from "./pages/Categories/CategoryList";
import CreateCategory from "./pages/Categories/CreateCategory";
import EditCategory from "./pages/Categories/EditCategory";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
// Importamos al guardia de seguridad
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA: Login (Sin Sidebar) */}
        <Route path="/login" element={<Login />} />

        {/* RUTAS PRIVADAS (Protegidas por el Gorila) */}
        <Route element={<ProtectedRoute />}>
            <Route
              path="/*"
              element={
                <div className="flex min-h-screen bg-slate-50">
                  <Sidebar /> {/* El Sidebar solo aparece si entraste */}
                  <main className="flex-1 p-8">
                    <Routes>
                      <Route path="/" element={<ProductList />} />
                      
                      {/* Productos */}
                      <Route path="/products/new" element={<CreateProduct />} />
                      <Route path="/products/edit/:id" element={<EditProduct />} />
                      
                      {/* Categorías */}
                      <Route path="/categories" element={<CategoryList />} />
                      <Route path="/categories/new" element={<CreateCategory />} />
                      <Route path="/categories/edit/:id" element={<EditCategory />} />

                      {/* Ventas */}
                      <Route path="/orders" element={<Orders />} />
                    </Routes>
                  </main>
                </div>
              }
            />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;