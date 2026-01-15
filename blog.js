// Blog Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const blogCards = document.querySelectorAll('.blog-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    if (!blogCards || blogCards.length === 0) return;

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            blogCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});