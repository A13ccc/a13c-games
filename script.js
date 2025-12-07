// Auto-hiding navbar on scroll
let lastScrollTop = 0;
let scrollTimeout;
const header = document.querySelector('header');
const scrollThreshold = 100; // Amount of scroll before hiding

window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide navbar
                if (header) {
                    header.style.transform = 'translateY(-100%)';
                    header.style.transition = 'transform 0.3s ease-in-out';
                }
            } else {
                // Scrolling up - show navbar
                if (header) {
                    header.style.transform = 'translateY(0)';
                    header.style.transition = 'transform 0.3s ease-in-out';
                }
            }
        } else {
            // At top of page - always show navbar
            if (header) {
                header.style.transform = 'translateY(0)';
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, 10);
}, false);

// Search functionality for games
function searchFunction() {
    const input = document.getElementById('searchBar');
    if (!input) return;

    const filter = input.value.toUpperCase();
    const cardContainer = document.querySelector('.card-container');
    if (!cardContainer) return;

    const cards = cardContainer.getElementsByClassName('card');

    let visibleCount = 0;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const link = card.getElementsByTagName('a')[0];

        if (link) {
            const txtValue = link.textContent || link.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                card.style.display = '';
                card.style.animation = 'fadeIn 0.3s ease-in-out';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        }
    }

    // Show "no results" message if needed
    let noResults = document.getElementById('no-results-message');
    if (visibleCount === 0 && filter !== '') {
        if (!noResults) {
            noResults = document.createElement('div');
            noResults.id = 'no-results-message';
            noResults.style.cssText = `
                text-align: center;
                padding: 40px;
                color: #b8b8d4;
                font-size: 20px;
                grid-column: 1 / -1;
            `;
            noResults.innerHTML = '🎮 No games found. Try a different search!';
            cardContainer.appendChild(noResults);
        }
        noResults.style.display = 'block';
    } else if (noResults) {
        noResults.style.display = 'none';
    }
}

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Loading screen animation
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.querySelector('.progress');

    if (progressBar) {
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Hide loading screen after a short delay
                setTimeout(() => {
                    document.body.classList.remove('loading');
                    if (loadingScreen) {
                        loadingScreen.style.opacity = '0';
                        loadingScreen.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 500);
                    }
                }, 300);
            }
            progressBar.style.width = progress + '%';
        }, 200);
    }
});

// Add loading class initially
document.body.classList.add('loading');

// Enhanced card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .card2');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Apply saved settings from localStorage
    applySettings();
});

// Settings management
function applySettings() {
    const settings = JSON.parse(localStorage.getItem('gamesSiteSettings') || '{}');

    // Apply theme
    if (settings.theme === 'dark-blue') {
        document.documentElement.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)');
    } else if (settings.theme === 'sunset') {
        document.documentElement.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)');
    } else if (settings.theme === 'forest') {
        document.documentElement.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)');
    } else if (settings.theme === 'ocean') {
        document.documentElement.style.setProperty('--primary-gradient', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)');
    }

    // Apply reduced motion
    if (settings.reducedMotion) {
        document.body.classList.add('reduced-motion');
        const style = document.createElement('style');
        style.id = 'reduced-motion-style';
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Apply card animations preference
    if (settings.cardAnimations === false) {
        const style = document.createElement('style');
        style.id = 'no-card-animations';
        style.textContent = `
            .card::before,
            .card2::before {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        nav.classList.toggle('mobile-active');
    }
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-to-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        z-index: 999;
    `;

    scrollTopBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });
});
