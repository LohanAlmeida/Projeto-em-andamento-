// ====== CARROSSEL ======
const images = document.querySelectorAll('.carousel img');
let current = 0;

function showImage(index) {
  images.forEach((img, i) => img.classList.toggle('active', i === index));
}

document.querySelector('.next').addEventListener('click', () => {
  current = (current + 1) % images.length;
  showImage(current);
});

document.querySelector('.prev').addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
});

setInterval(() => {
  current = (current + 1) % images.length;
  showImage(current);
}, 4000);

// ====== ANIMAÇÃO DE ENVIO DO FORMULÁRIO ======
const form = document.getElementById('contatoForm');
const enviarBtn = document.getElementById('enviarBtn');

form.addEventListener('submit', () => {
  enviarBtn.classList.add('loading');
  enviarBtn.querySelector('.btn-text').textContent = "Enviando...";
});

// ====== EFEITO SCROLL REVEAL ======
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

const elementsToReveal = document.querySelectorAll('section, .feature');
elementsToReveal.forEach(el => observer.observe(el));
