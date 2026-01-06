import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import "./App.css"

function Dashboard() {
  return (
    <h1 className="p-10 text-3xl font-bold">🏠 Bienvenido al Dashboard</h1>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
