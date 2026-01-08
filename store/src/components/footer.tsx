export default function Footer() {
    return (
      <footer className="bg-slate-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Desarrollado por GEPI SOFTWARE. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    );
  }