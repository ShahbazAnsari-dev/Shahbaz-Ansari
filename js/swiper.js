class TestimonialsSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.sliderWrapper = document.getElementById('sliderWrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dots = document.querySelectorAll('.dot');
        this.autoSlideInterval = null;
        this.autoSlideDelay = 3000; // 3 seconds

        this.init();
    }

    init() {
        this.bindEvents();
        this.startAutoSlide();
        this.updateSlider();
    }

    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoSlide();
        });

        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoSlide();
        });

        // Pagination dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoSlide();
            }
        });

        // Pause on hover
        const card = document.querySelector('.testimonials-card');
        card.addEventListener('mouseenter', () => this.pauseAutoSlide());
        card.addEventListener('mouseleave', () => this.startAutoSlide());

        // Touch/swipe support
        this.addTouchSupport();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }

    updateSlider() {
        // Move slider
        const translateX = -this.currentSlide * 20; // 20% per slide
        this.sliderWrapper.style.transform = `translateX(${translateX}%)`;

        // Update pagination dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoSlide() {
        this.pauseAutoSlide(); // Clear any existing interval
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide(); // Right to left (next slide)
        }, this.autoSlideDelay);
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resetAutoSlide() {
        this.pauseAutoSlide();
        setTimeout(() => {
            this.startAutoSlide();
        }, 1000); // Resume after 1 second
    }

    addTouchSupport() {
        let startX = 0;
        let endX = 0;

        const slider = document.querySelector('.slider-container');

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.pauseAutoSlide();
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
            this.resetAutoSlide();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide(); // Swipe left - next slide
                } else {
                    this.prevSlide(); // Swipe right - previous slide
                }
            }
        };

        this.handleSwipe = handleSwipe;
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsSlider();

    // Preload images for better performance
    const imageUrls = [
        'assets/images/testimonial-img-1.png',
        'assets/images/testimonial-img-2.png',
        'assets/images/testimonial-img-3.png',
        'assets/images/testimonial-img-4.png',
        'assets/images/testimonial-img-5.png',
    ];

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
});