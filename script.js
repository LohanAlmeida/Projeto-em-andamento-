/* ===================== CARROSSEL ===================== */
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  let index = 0;
  let timer = null;
  const delay = 4500;

  // lazy load slides (data-src -> src)
  slides.forEach((img) => {
    const src = img.getAttribute('data-src');
    if (src) img.src = src;
  });

  // create indicators
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', `Ir para slide ${i+1}`);
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      index = i;
      update();
      reset();
    });
    indicatorsContainer.appendChild(btn);
  });

  const indicators = Array.from(indicatorsContainer.children);

  function update() {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    indicators.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function nextSlide() { index = (index + 1) % slides.length; update(); }
  function prevSlide() { index = (index - 1 + slides.length) % slides.length; update(); }

  next.addEventListener('click', () => { nextSlide(); reset(); });
  prev.addEventListener('click', () => { prevSlide(); reset(); });

  // autoplay
  function start() { timer = setInterval(nextSlide, delay); }
  function stop() { clearInterval(timer); timer = null; }
  function reset() { stop(); start(); }

  // swipe support (touch)
  let startX = 0;
  let dist = 0;
  const threshold = 40;
  const hero = document.querySelector('.slides');

  hero.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stop(); }, {passive:true});
  hero.addEventListener('touchmove', (e) => { dist = e.touches[0].clientX - startX; }, {passive:true});
  hero.addEventListener('touchend', () => {
    if (dist > threshold) prevSlide();
    else if (dist < -threshold) nextSlide();
    dist = 0;
    reset();
  });

  // start autoplay
  start();

  // pause on hover for desktop
  const carouselEl = document.querySelector('.carousel');
  carouselEl.addEventListener('mouseenter', stop);
  carouselEl.addEventListener('mouseleave', start);
});

/* ===================== FORM (loading spinner) ===================== */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('enviarBtn');
  const spinner = btn.querySelector('.spinner');
  const btnText = btn.querySelector('.btn-text');

  form.addEventListener('submit', (e) => {
    // show spinner and let form submit normally to formsubmit.co
    spinner.style.display = 'block';
    btn.style.pointerEvents = 'none';
    btnText.textContent = 'Enviando...';
    // If you want to prevent actual submit and simulate:
    // e.preventDefault();
    // setTimeout(() => { spinner.style.display='none'; btnText.textContent='Enviado'; }, 1400);
  });
});
