// Matrix Background Animation
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix Animation Variables
const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';
const fontSize = 18;
let columns = canvas.width / fontSize;
const drops = [];
const colors = ["#32ff32", "#00ffff"];

// Initialize drops
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Matrix Draw Function
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Start Matrix Animation
setInterval(drawMatrix, 80);

// Update columns on resize
window.addEventListener('resize', () => {
    columns = canvas.width / fontSize;
    drops.length = columns;
    for (let x = drops.length; x < columns; x++) {
        drops[x] = 1;
    }
});

// Menu Hamburger Functionality
let menuTimeout;

function toggleMenu() {
    const menuNav = document.getElementById('menuNav');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    menuNav.classList.toggle('active');
    hamburgerIcon.classList.toggle('active');
    
    // Auto-hide menu after 20 seconds
    if (menuNav.classList.contains('active')) {
        clearTimeout(menuTimeout);
        menuTimeout = setTimeout(() => {
            closeMenu();
        }, 20000);
    } else {
        clearTimeout(menuTimeout);
    }
}

function closeMenu() {
    const menuNav = document.getElementById('menuNav');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    menuNav.classList.remove('active');
    hamburgerIcon.classList.remove('active');
    clearTimeout(menuTimeout);
}

// Smooth Scrolling for Menu Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Story Expansion
function expandStory() {
    const storyText = document.getElementById('storyText');
    const expandBtn = document.querySelector('.story-btn');
    
    if (storyText.classList.contains('expanded')) {
        storyText.classList.remove('expanded');
        expandBtn.textContent = 'CONTINUA A LEGGERE';
        storyText.innerHTML = `
            <p>In un mondo in continua evoluzione, dove le sfide quotidiane sembrano moltiplicarsi e i sogni spesso rimangono nel cassetto, NEXSUS nasce come la risposta a chi cerca qualcosa di più.</p>
            <p>Non siamo solo una community, siamo un movimento. Un ecosistema dove persone straordinarie si incontrano, crescono insieme e trasformano le proprie visioni in realtà concrete.</p>
        `;
    } else {
        storyText.classList.add('expanded');
        expandBtn.textContent = 'RIDUCI TESTO';
        storyText.innerHTML = `
            <p>In un mondo in continua evoluzione, dove le sfide quotidiane sembrano moltiplicarsi e i sogni spesso rimangono nel cassetto, NEXSUS nasce come la risposta a chi cerca qualcosa di più.</p>
            <p>Non siamo solo una community, siamo un movimento. Un ecosistema dove persone straordinarie si incontrano, crescono insieme e trasformano le proprie visioni in realtà concrete.</p>
            <p><strong>LA NOSTRA MISSIONE</strong></p>
            <p>NEXSUS Evolution Future è nato dalla convinzione che ogni persona abbia dentro di sé un potenziale straordinario, una scintilla unica che aspetta solo di essere accesa. Il nostro obiettivo è creare un ambiente dove questa scintilla possa brillare, crescere e illuminare non solo la vita di chi la possiede, ma anche quella di chi gli sta intorno.</p>
            <p><strong>COSA OFFRIAMO</strong></p>
            <p>🌟 <strong>COMMUNITY:</strong> Una rete di supporto dove professionisti, imprenditori e visionari si aiutano reciprocamente a raggiungere i propri obiettivi.</p>
            <p>🎓 <strong>ACADEMY:</strong> Formazione all'avanguardia, sia digitale che in presenza, per sviluppare le competenze del futuro.</p>
            <p>💪 <strong>COACHING:</strong> Percorsi personalizzati per scoprire chi sei veramente e quanto vali.</p>
            <p>🤝 <strong>NETWORKING:</strong> Opportunità concrete di collaborazione e crescita professionale.</p>
            <p><strong>LA TUA SCINTILLA</strong></p>
            <p>Ogni giorno incontriamo persone che hanno smesso di credere nei propri sogni, che si sono arrese alla routine, che hanno dimenticato quanto sono speciali. NEXSUS esiste per ricordare a queste persone che la vita ha ancora molto da offrire loro.</p>
            <p>La tua scintilla non è solo un sogno nel cassetto. È la chiave per sbloccare un futuro che non avresti mai immaginato possibile. È l'energia che ti spinge oltre i tuoi limiti, che ti fa vedere opportunità dove altri vedono ostacoli.</p>
            <p><strong>EVOLUTION FUTURE</strong></p>
            <p>Il futuro non è qualcosa che aspettiamo passivamente. È qualcosa che creiamo attivamente, ogni giorno, con le nostre scelte, le nostre azioni, le nostre connessioni. NEXSUS Evolution Future è il tuo partner in questo viaggio di creazione.</p>
            <p>Insieme, non stiamo solo costruendo carriere di successo o business profittevoli. Stiamo costruendo vite piene di significato, relazioni autentiche, e un impatto positivo sul mondo che ci circonda.</p>
            <p><strong>UNISCITI A NOI</strong></p>
            <p>Se senti che dentro di te c'è qualcosa di più, se credi che i tuoi sogni meritino di diventare realtà, se vuoi far parte di una community che crede nel potenziale umano, allora NEXSUS è il posto giusto per te.</p>
            <p>La vita ti deve ancora un sogno. E la tua scintilla si chiama NEXSUS.</p>
            <p><em>Benvenuto nel tuo futuro. Benvenuto in NEXSUS Evolution Future.</em></p>
        `;
    }
}

function scrollToHome() {
    document.getElementById('home').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Chatbot Functionality
function openChatbot() {
    document.getElementById('chatbotModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeChatbot() {
    document.getElementById('chatbotModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('chatbotModal');
    if (event.target === modal) {
        closeChatbot();
    }
}

// Chatbot Messages
const chatResponses = {
    'ciao': 'Ciao! Benvenuto in NEXSUS Evolution Future! Come posso aiutarti oggi?',
    'hello': 'Hello! Welcome to NEXSUS Evolution Future! How can I help you today?',
    'community': 'La nostra Community è il cuore di NEXSUS: un team di aiuto reciproco dove professionisti si supportano per raggiungere obiettivi comuni. Vuoi saperne di più su come unirti?',
    'academy': 'NEXSUS Academy offre formazione digitale online e offline per sviluppare le competenze del futuro. Abbiamo corsi, workshop e certificazioni. Quale area ti interessa di più?',
    'coaching': 'Il nostro Coaching ti aiuta a capire chi sei e quanto vali. Attraverso percorsi personalizzati scoprirai il tuo vero potenziale. Vuoi iniziare un percorso di crescita personale?',
    'networking': 'NEXSUS Networking ti permette di superare i tuoi limiti e conoscerti meglio attraverso connessioni strategiche con altri professionisti. Cerchi opportunità di collaborazione?',
    'abbonamenti': 'Abbiamo 4 livelli di abbonamento: BASIC (€69), PREMIUM (€149), ELITE (€199), ELEGANCE (€249). Ogni livello offre servizi specifici. Quale ti interessa?',
    'prezzi': 'I nostri abbonamenti partono da €69 per il BASIC fino a €249 per ELEGANCE. Ogni piano include servizi diversi. Vuoi che ti spieghi nel dettaglio cosa include ogni piano?',
    'contatti': 'Puoi contattarci via WhatsApp al 347 442 9091 o via email a evolutionacademy2026@virgilio.it. Siamo anche sui social: Facebook, Instagram, TikTok, Telegram e YouTube!',
    'aiuto': 'Sono qui per aiutarti! Puoi chiedermi informazioni su: Community, Academy, Coaching, Networking, Abbonamenti, Contatti, Sezioni Territoriali. Cosa ti interessa sapere?',
    'help': 'I\'m here to help! You can ask me about: Community, Academy, Coaching, Networking, Subscriptions, Contacts, Territorial Sections. What would you like to know?',
    'sezioni': 'Abbiamo 50 sezioni territoriali in tutta Italia. Alcune sono libere (verde) e altre occupate (blu). Vuoi sapere se nella tua zona c\'è una sezione disponibile?',
    'vinci': 'Con NEXSUS puoi vincere e essere premiato! Abbiamo il Premio 25% e concorsi Vinci 50%. Ti premiamo perché tu vali, devi solo conoscerti! Vuoi partecipare?',
    'app': 'La nostra APP NEXSUS ti permette di accedere a tutti i servizi direttamente dal tuo smartphone. Presto disponibile per iOS e Android!',
    'collabora': 'Vuoi collaborare con NEXSUS? Offriamo diverse opportunità di partnership e collaborazione. Raccontami di più sui tuoi progetti e vediamo come possiamo lavorare insieme!',
    'default': 'Grazie per la tua domanda! Per informazioni specifiche, contattaci via WhatsApp al 347 442 9091 o email evolutionacademy2026@virgilio.it. Il nostro team sarà felice di aiutarti!'
};

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatContainer = document.getElementById('chatContainer');
    const message = chatInput.value.trim().toLowerCase();
    
    if (message === '') return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user';
    userMessage.textContent = chatInput.value;
    chatContainer.appendChild(userMessage);
    
    // Clear input
    chatInput.value = '';
    
    // Find response
    let response = chatResponses['default'];
    for (const key in chatResponses) {
        if (message.includes(key)) {
            response = chatResponses[key];
            break;
        }
    }
    
    // Add bot response with delay
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        botMessage.textContent = response;
        chatContainer.appendChild(botMessage);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1000);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Enter key for chat
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Admin Panel Functionality
function checkAdminAccess() {
    const password = document.getElementById('adminPassword').value;
    const adminLogin = document.getElementById('adminLogin');
    const adminPanel = document.getElementById('adminPanel');
    
    if (password === 'EVOLUTIONnexsusTEAM2026@') {
        adminLogin.style.display = 'none';
        adminPanel.style.display = 'block';
        
        // Add verification message
        const verificationMsg = document.createElement('div');
        verificationMsg.style.cssText = `
            background: rgba(42, 255, 64, 0.2);
            border: 2px solid #2aff40;
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            font-weight: 700;
            color: #2aff40;
        `;
        verificationMsg.textContent = 'ALISON AI - admin autorizzato giuliano caratelli';
        adminPanel.insertBefore(verificationMsg, adminPanel.querySelector('.admin-functions'));
    } else {
        alert('Password non corretta. Per il reset password contatta: evolutionacademy2026@virgilio.it');
    }
}

function manageUsers() {
    alert('Funzione Gestione Utenti - In sviluppo. Contatta evolutionacademy2026@virgilio.it per assistenza.');
}

function manageSections() {
    alert('Funzione Gestione Sezioni Territoriali - In sviluppo. Contatta evolutionacademy2026@virgilio.it per assistenza.');
}

function viewStats() {
    alert('Funzione Visualizza Statistiche - In sviluppo. Contatta evolutionacademy2026@virgilio.it per assistenza.');
}

// Territorial Sections Generation
function generateTerritorialSections() {
    const territorialGrid = document.getElementById('territorialGrid');
    const italianRegions = [
        'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
        'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
        'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia',
        'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'
    ];
    
    const provinces = [
        'Roma', 'Milano', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna',
        'Firenze', 'Bari', 'Catania', 'Venezia', 'Verona', 'Messina', 'Padova',
        'Trieste', 'Brescia', 'Parma', 'Taranto', 'Prato', 'Modena',
        'Reggio Calabria', 'Reggio Emilia', 'Perugia', 'Ravenna', 'Livorno',
        'Cagliari', 'Foggia', 'Rimini', 'Salerno', 'Ferrara'
    ];
    
    const allSections = [...italianRegions, ...provinces];
    
    allSections.forEach((section, index) => {
        const sectionItem = document.createElement('div');
        sectionItem.className = 'territorial-item';
        
        // Randomly assign some as occupied (blue)
        if (Math.random() > 0.7) {
            sectionItem.classList.add('occupied');
        }
        
        sectionItem.innerHTML = `
            <h4>${section}</h4>
            <p>${sectionItem.classList.contains('occupied') ? 'Occupata' : 'Libera'}</p>
        `;
        
        sectionItem.addEventListener('click', () => {
            if (sectionItem.classList.contains('occupied')) {
                alert(`Sezione ${section} già occupata. Contatta evolutionacademy2026@virgilio.it per informazioni.`);
            } else {
                alert(`Sezione ${section} disponibile! Contatta evolutionacademy2026@virgilio.it per candidarti.`);
            }
        });
        
        territorialGrid.appendChild(sectionItem);
    });
}

// Payment System Simulation
document.addEventListener('DOMContentLoaded', function() {
    // Generate territorial sections
    generateTerritorialSections();
    
    // Add click events to pricing buttons
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardTitle = this.closest('.pricing-card').querySelector('h3').textContent;
            const price = this.closest('.pricing-card').querySelector('.price').textContent;
            
            if (this.textContent.includes('CLICCA E ABBONATI')) {
                alert(`Reindirizzamento al sistema di pagamento SumUp per ${cardTitle} ${price}. Funzione in sviluppo.`);
            } else if (this.textContent.includes('STAGE IN ABBONAMENTO')) {
                alert(`Modalità Stage per ${cardTitle}. Contatta evolutionacademy2026@virgilio.it per dettagli.`);
            } else if (this.textContent.includes('ABBONATO SICURO CON CARD')) {
                alert(`Pagamento sicuro con carta per ${cardTitle}. Sistema di sicurezza avanzato in sviluppo.`);
            }
        });
    });
    
    // Add click events to prize buttons
    const prizeButtons = document.querySelectorAll('.prize-btn');
    prizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prizeTitle = this.closest('.prize-card').querySelector('h3').textContent;
            alert(`Partecipazione a ${prizeTitle}! Contatta evolutionacademy2026@virgilio.it per maggiori informazioni.`);
        });
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all content boxes
document.addEventListener('DOMContentLoaded', function() {
    const contentBoxes = document.querySelectorAll('.content-box');
    contentBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(50px)';
        box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(box);
    });
});

// Performance Optimizations
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        // Scroll-based animations can be added here
    }, 16); // ~60fps
});

// Preload critical resources
function preloadResources() {
    // Preload fonts and critical assets
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
}

// Initialize on load
window.addEventListener('load', () => {
    preloadResources();
    
    // Remove loading states
    document.body.classList.add('loaded');
    
    // Initialize performance monitoring
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Could send error reports to analytics service
});

// Unhandled Promise Rejection
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// Memory Management
let animationFrameId;

function optimizeAnimations() {
    // Pause animations when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        } else {
            // Resume animations
            drawMatrix();
        }
    });
}

// Initialize optimizations
document.addEventListener('DOMContentLoaded', optimizeAnimations);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes modal
    if (e.key === 'Escape') {
        closeChatbot();
        closeMenu();
    }
    
    // Alt + M opens menu
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        toggleMenu();
    }
    
    // Alt + C opens chatbot
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        openChatbot();
    }
});

// Touch Gestures for Mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Swipe right to open menu
    if (deltaX > 100 && Math.abs(deltaY) < 50) {
        const menuNav = document.getElementById('menuNav');
        if (!menuNav.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    // Swipe left to close menu
    if (deltaX < -100 && Math.abs(deltaY) < 50) {
        const menuNav = document.getElementById('menuNav');
        if (menuNav.classList.contains('active')) {
            closeMenu();
        }
    }
});

// Analytics and Tracking (placeholder)
function trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Could integrate with Google Analytics, Facebook Pixel, etc.
    // gtag('event', eventName, eventData);
}

// Track important interactions
document.addEventListener('DOMContentLoaded', () => {
    // Track menu usage
    document.getElementById('hamburgerMenu').addEventListener('click', () => {
        trackEvent('menu_toggle', { timestamp: Date.now() });
    });
    
    // Track chatbot usage
    document.querySelector('.alison-button').addEventListener('click', () => {
        trackEvent('chatbot_open', { timestamp: Date.now() });
    });
    
    // Track pricing interactions
    document.querySelectorAll('.pricing-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            trackEvent('pricing_click', { 
                plan: btn.closest('.pricing-card').querySelector('h3').textContent,
                timestamp: Date.now() 
            });
        });
    });
});

console.log('🚀 NEXSUS Evolution Future - Sistema caricato con successo!');
console.log('💫 La tua scintilla si chiama NEXSUS');
console.log('🌟 Next Level - Vision - Strategy - Future');