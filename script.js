// Configuración de contacto de Elite Boutique
const CONFIG = {
    phone: "505XXXXXXXX", // Reemplazar las X con el número real de WhatsApp de la tienda (sin el signo +)
    generalMessage: "Hola Elite Boutique, visité su landing page y me gustaría conocer los nuevos ingresos de esta semana.",
    queryPrefix: "Hola Elite Boutique, estoy interesado en ver estilos disponibles de la sección: "
};

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Configurar botón flotante e iconografía principal de WhatsApp
    const floatBtn = document.getElementById("whatsapp-floating");
    const mainBtn = document.getElementById("btn-main-whatsapp");
    
    if(floatBtn) {
        floatBtn.href = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(CONFIG.generalMessage)}`;
    }
    if(mainBtn) {
        mainBtn.href = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(CONFIG.generalMessage)}`;
    }

    // 2. Controlar botones de consultas específicas en las tarjetas de catálogo
    const queryButtons = document.querySelectorAll(".btn-whatsapp-query");
    
    queryButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Extraer la categoría desde el atributo HTML5 'data-item'
            const itemCategory = e.target.getAttribute("data-item");
            const fullMessage = `${CONFIG.queryPrefix}*${itemCategory}*.`;
            
            // Construir la URL e inmediatamente redirigir
            const whatsappUrl = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(fullMessage)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});