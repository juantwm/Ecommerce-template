// backend/create-admin.js
async function crearAdmin() {
    console.log("👤 Creando primer administrador...");
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Super Admin",
          email: "admin@tienda.com",  // 👈 CAMBIO: "email" para coincidir con el controller
          password: "1234password",
          role: "ADMIN"               // 👈 NUEVO: Pedimos ser Admin
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("✅ ¡ÉXITO! Admin creado. Ahora intenta loguearte en el frontend.");
      } else {
        console.log("❌ Error:", data);
      }
    } catch (error) {
      console.error("🔥 Error de conexión:", error);
    }
  }
  
  crearAdmin();