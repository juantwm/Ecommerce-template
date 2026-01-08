// src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Layers } from "lucide-react";
import { Package, LayoutList } from "lucide-react";


export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 hidden md:block">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
      </div>
      <nav className="space-y-2">
        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors">
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>
        {/* Este link es el tuyo 👇 */}
        <Link to="/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-blue-300">
          <Layers className="h-5 w-5" />
          <span>Categorías</span>
        </Link>
        <Link to="/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-blue-300">
          <Package className="h-5 w-5"/>
          <span>Productos</span>
        </Link>
      </nav>
    </aside>
  );
}