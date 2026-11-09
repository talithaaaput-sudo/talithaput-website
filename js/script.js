const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
const music = document.getElementById('backgroundMusic');
const musicBtn = document.getElementById('musicBtn');
const musicText = document.getElementById('musicText');
const progress = document.getElementById('progress');

menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

musicBtn.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicText.textContent = 'Pause music';
      musicBtn.classList.add('playing');
    } catch (error) {
      musicText.textContent = 'Audio unavailable';
      console.error('Audio gagal diputar:', error);
    }
  } else {
    music.pause();
    musicText.textContent = 'Play music';
    musicBtn.classList.remove('playing');
  }
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nav.querySelectorAll('a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, {rootMargin: '-35% 0px -55% 0px'});
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
});
