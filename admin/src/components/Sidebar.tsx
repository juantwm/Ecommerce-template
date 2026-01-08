import { Package, LayoutList } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Layers, LogOut, DollarSign } from "lucide-react"; // 1. Importamos LogOut

export default function Sidebar() {
  const navigate = useNavigate();

  // 2. Función para cerrar sesión
  const handleLogout = () => {
    
     localStorage.removeItem("token"); 
     localStorage.removeItem("user");
    
    // Redirigir al Login
    navigate("/");
  };

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 hidden md:flex flex-col justify-between">
      {/* PARTE SUPERIOR: Logo y Menú */}
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
        </div>
        
        <nav className="space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>


          <Link to="/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-blue-300">
            <Layers className="h-5 w-5" />
            <span>Categorías</span>
          </Link>

          <Link to="/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-blue-300">
            <Package className="h-5 w-5"/>
            <span>Productos</span>
          </Link>

          <Link to="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-blue-300">
          <DollarSign className="h-5 w-5" />
          <span>Ventas</span>
          </Link>
        </nav>
      </div>
      <nav className="space-y-2">
        <div className="border-t border-slate-700 pt-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}