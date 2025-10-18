document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
         e.preventDefault();
         const target = document.querySelector(this.getAttribute('href'));
         if (target) {
            target.scrollIntoView({
               behavior: 'smooth',
               block: 'start'
            });
         }
      }
   });
});

let lastScroll = 0;
const header = document.querySelector('.header_section');

function handleScroll() {
   const currentScroll = window.pageYOffset;
   
   if (currentScroll <= 0) {
      header.classList.remove('scroll-up', 'scroll-down', 'scrolled');
      return;
   }
   
   if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
   } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
   }
   
   if (currentScroll > 100) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
   
   lastScroll = currentScroll;
}

window.addEventListener('scroll', handleScroll, { passive: true });
document.addEventListener('DOMContentLoaded', () => {
   handleScroll();
   
   document.body.classList.add('js-loaded');
});
