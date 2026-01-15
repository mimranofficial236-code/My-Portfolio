// Blog Slider Functionality
document.addEventListener('DOMContentLoaded', () => {
    const blogGrid = document.querySelector('.blog-grid');
    const blogCards = document.querySelectorAll('.blog-card');
    const dotsContainer = document.querySelector('.blog-slider-dots');
    const prevBtn = document.querySelector('.blog-slider-btn.prev');
    const nextBtn = document.querySelector('.blog-slider-btn.next');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!blogGrid || blogCards.length === 0) return;

    let currentIndex = 0;
    let visibleCards = [...blogCards];

    // Create dots
    const createDots = () => {
        dotsContainer.innerHTML = '';
        visibleCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('blog-slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    };

    const updateSlider = () => {
        const dots = document.querySelectorAll('.blog-slider-dot');
        blogCards.forEach(card => {
            card.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSlider();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % visibleCards.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
        updateSlider();
    };

    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            currentIndex = 0;

            blogCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            visibleCards = [...blogCards].filter(card => card.style.display !== 'none');
            createDots();
            updateSlider();
        });
    });

    // Touch support
    let touchStartX = 0;
    blogGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    blogGrid.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) nextSlide();
        if (touchEndX - touchStartX > 50) prevSlide();
    });

    // Initialize
    createDots();
});