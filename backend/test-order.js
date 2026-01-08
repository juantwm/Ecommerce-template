// backend/test-order.js

async function probarCompra() {
    console.log("🛒 Intentando comprar...");
  
    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          guestName: "Juan Test Cursor",
          guestEmail: "juan@cursor.test",
          items: [
            { productId: 1, quantity: 1 } // Asegúrate que el ID 1 exista
          ]
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("✅ ¡ÉXITO! Orden Creada:");
        console.log(JSON.stringify(data, null, 2));
      } else {
        console.log("❌ ERROR del Servidor:");
        console.log(data);
      }
    } catch (error) {
      console.log("🔥 ERROR de Conexión (¿Está prendido el server?):");
      console.error(error);
    }
  }
  
  probarCompra();