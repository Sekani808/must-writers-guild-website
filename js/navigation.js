/* ============================================
   MUST Writers Guild — Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page in bottom nav
    highlightCurrentPage();
    
    // Handle navigation transitions
    initPageTransitions();
});

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.bottom-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initPageTransitions() {
    // Add touch feedback to nav items
    document.querySelectorAll('.bottom-nav a').forEach(link => {
        link.addEventListener('touchstart', () => {
            link.style.transform = 'scale(0.95)';
        });
        
        link.addEventListener('touchend', () => {
            link.style.transform = '';
        });
    });
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle back button on mobile
window.addEventListener('popstate', () => {
    // Custom back handling if needed
});