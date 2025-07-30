// File 3: main.js
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');

function toggleMenu() {
  const isOpen = menu.classList.toggle('hidden') === false;
  menu.setAttribute('aria-hidden', !isOpen);
  btn.setAttribute('aria-expanded', isOpen);
  
  if (isOpen) {
    menu.querySelector('a').focus();
  }
}

btn.addEventListener('click', toggleMenu);

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (btn.getAttribute('aria-expanded') === 'true') {
      toggleMenu();
    }
  });
});

document.querySelectorAll('.mobile-menu-toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    
    const submenuId = this.getAttribute('aria-controls');
    const submenu = document.getElementById(submenuId);
    
    if (submenu) {
      submenu.classList.toggle('active');
    }
  });
  
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle.click();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  let currentIndex = 0;
  const totalItems = items.length;
  const slideDuration = 5000;
  let intervalId;

  function updateCarousel() {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === currentIndex);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentIndex);
      indicator.setAttribute('aria-selected', i === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function startAutoSlide() {
    intervalId = setInterval(nextSlide, slideDuration);
  }

  function stopAutoSlide() {
    clearInterval(intervalId);
  }

  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });

  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(i);
      startAutoSlide();
    });
  });

  updateCarousel();
  startAutoSlide();
  
  carousel.parentElement.addEventListener('mouseenter', stopAutoSlide);
  carousel.parentElement.addEventListener('mouseleave', startAutoSlide);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') === '#') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } 
    else if (this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});