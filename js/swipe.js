/* ============================================
   MUST Writers Guild — Swipe Navigation
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initSwipeNavigation();
    initSwipeHint();
});

function initSwipeNavigation() {
    const container = document.getElementById('swipeContainer');
    const indicators = document.getElementById('sectionIndicators');
    
    if (!container) return;
    
    let isScrolling;
    let currentSection = 0;
    const sections = container.querySelectorAll('.swipe-section');
    const totalSections = sections.length;
    
    // Update indicators on scroll
    container.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        
        isScrolling = setTimeout(() => {
            const scrollLeft = container.scrollLeft;
            const sectionWidth = container.offsetWidth;
            const newSection = Math.round(scrollLeft / sectionWidth);
            
            if (newSection !== currentSection) {
                currentSection = newSection;
                updateIndicators(currentSection);
                hideSwipeHint();
            }
        }, 100);
    });
    
    // Indicator click navigation
    if (indicators) {
        indicators.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                scrollToSection(index);
            });
        });
    }
    
    // Touch swipe handling
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSection < totalSections - 1) {
                // Swipe left - next section
                scrollToSection(currentSection + 1);
            } else if (diff < 0 && currentSection > 0) {
                // Swipe right - previous section
                scrollToSection(currentSection - 1);
            }
        }
    }
    
    function scrollToSection(index) {
        const sectionWidth = container.offsetWidth;
        container.scrollTo({
            left: sectionWidth * index,
            behavior: 'smooth'
        });
    }
    
    function updateIndicators(activeIndex) {
        if (!indicators) return;
        indicators.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
}

function initSwipeHint() {
    const hint = document.getElementById('swipeHint');
    if (!hint) return;
    
    // Check if user has already interacted
    const hasInteracted = localStorage.getItem('swipeHintDismissed');
    if (hasInteracted) {
        hint.classList.add('hidden');
        return;
    }
    
    // Hide hint on first interaction
    const container = document.getElementById('swipeContainer');
    if (container) {
        container.addEventListener('scroll', hideSwipeHint, { once: true });
        container.addEventListener('touchstart', hideSwipeHint, { once: true });
    }
}

function hideSwipeHint() {
    const hint = document.getElementById('swipeHint');
    if (!hint || hint.classList.contains('hidden')) return;
    
    hint.classList.add('hidden');
    localStorage.setItem('swipeHintDismissed', 'true');
}