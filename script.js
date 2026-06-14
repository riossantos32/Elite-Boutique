// Configuración de contacto de Elite Boutique
const CONFIG = {
    phone: "505XXXXXXXX", // Reemplazar las X con el número real de WhatsApp de la tienda (sin el signo +)
    generalMessage: "Hola Elite Boutique, visité su landing page y me gustaría conocer los nuevos ingresos de esta semana. ¿Qué tienen disponible?",
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
    
    // 3. Agregar animación suave al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar tarjetas de colecciones y características
    document.querySelectorAll('.feature-card, .collection-item').forEach(card => {
        observer.observe(card);
    });
    
    // 4. Agregar efecto ripple a botones
    document.querySelectorAll('button, a.btn-primary, a.btn-whatsapp').forEach(element => {
        element.addEventListener('click', function(e) {
            if (this.classList.contains('btn-whatsapp-query') || this.classList.contains('btn-whatsapp') || this.classList.contains('btn-primary')) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.pointerEvents = 'none';
                ripple.style.animation = 'ripple 0.6s ease-out';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });
});

// Agregar animación de ripple al CSS dinámicamente si no existe
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}
