// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for primary button and navbar links
document.querySelectorAll('[data-scroll-target], .nav-links a[href^="#"]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const targetSelector = el.getAttribute('data-scroll-target') || el.getAttribute('href');
    const target = document.querySelector(targetSelector);
    if (target) {
      const y = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// Scroll reveal for sections
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));

// Slider logic
const slides = document.querySelectorAll('.slide');
const captionEl = document.getElementById('slide-caption');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

let currentIndex = 0;
let sliderInterval;

function updateSlider(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });

  const activeSlide = slides[index];
  captionEl.textContent = activeSlide.dataset.caption || '';
  currentIndex = index;
}

function nextSlide() {
  const next = (currentIndex + 1) % slides.length;
  updateSlider(next);
}

function prevSlide() {
  const prev = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider(prev);
}

function startAutoPlay() {
  sliderInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  clearInterval(sliderInterval);
}

nextBtn.addEventListener('click', () => {
  stopAutoPlay();
  nextSlide();
  startAutoPlay();
});

prevBtn.addEventListener('click', () => {
  stopAutoPlay();
  prevSlide();
  startAutoPlay();
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const idx = Number(dot.dataset.index);
    stopAutoPlay();
    updateSlider(idx);
    startAutoPlay();
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxText = document.getElementById('lightbox-text');
const lightboxClose = document.getElementById('lightbox-close');

slides.forEach(slide => {
  slide.addEventListener('click', () => {
    const img = slide.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightboxText.textContent = slide.dataset.caption || '';
    lightbox.classList.add('open');
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
  }
});

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  } else if (e.key === 'ArrowLeft') {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  }
});

// Start slider
updateSlider(0);
startAutoPlay();

