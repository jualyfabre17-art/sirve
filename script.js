document.addEventListener('DOMContentLoaded', () => {
    
    // --- TEXTO DE LA TERMINAL ---
    // \n significa salto de línea.
    const textToType = `> ZOE!\n. . .\n> HOY ES TU CUMPLEAÑOS\n. . .\n> ASI QUE HICE ESTE REGALO PARA TI\n. . .\n>٩(◕‿◕｡)۶ ٩(◕‿◕｡)۶ `;
    
    const typingSpeed = 50; // Velocidad de escritura
    const transitionDelay = 2000; // Tiempo de espera antes de cambiar pantalla

    // Elementos
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.querySelector('.cursor');
    const terminalScreen = document.getElementById('terminal-screen');
    const cakeScreen = document.getElementById('cake-screen');
    
    // Elementos de la carta
    const letterTrigger = document.getElementById('letter-trigger');
    const modal = document.getElementById('message-modal');
    const closeBtn = document.querySelector('.close-btn');

    let charIndex = 0;

    // --- FUNCIÓN ESCRIBIR ---
    function typeWriter() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Escritura terminada
            cursorElement.style.animation = 'none'; 
            
            // Iniciar transición a la fiesta
            setTimeout(startTransition, transitionDelay);
        }
    }

    // --- FUNCIÓN CAMBIO DE ESCENA ---
    function startTransition() {
        // Desvanecer terminal
        terminalScreen.style.opacity = '0';

        setTimeout(() => {
            terminalScreen.style.display = 'none'; // Quitar terminal
            cakeScreen.style.display = 'block';    // Poner pastel (pero invisible aún)
            
            // Pequeño delay para que el navegador procese el display:block antes de la opacidad
            setTimeout(() => {
                cakeScreen.classList.add('visible'); // Hacer visible suavemente
            }, 50);
        }, 1000);
    }
    function startTransition() {
    // 1. Desvanecer terminal
    terminalScreen.style.opacity = '0';

    setTimeout(() => {
        terminalScreen.style.display = 'none';
        cakeScreen.style.display = 'block';
        
        setTimeout(() => {
            cakeScreen.classList.add('visible');

            // --- ¡LANZAR CONFETI AQUÍ! ---
            lanzarConfeti();
        }, 50);
    }, 1000);
}

// Nueva función para el efecto de confeti
function lanzarConfeti() {
    // Configuración del confeti
    var duration = 5 * 1000; // 5 segundos
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Intervalo para que el confeti caiga continuamente por unos segundos
    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      
      // Lanzar desde dos puntos laterales
      confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
      }));
      confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
      }));
    }, 250);
}

    // --- INTERACCIÓN DE LA CARTA ---
    letterTrigger.addEventListener('click', () => {
        modal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Cerrar si tocas fuera del papel
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    letterTrigger.addEventListener('click', () => {
    modal.classList.add('show');
    
    // Confeti tipo "cañón" desde el centro
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

    // Iniciar todo
    setTimeout(typeWriter, 1000);
});