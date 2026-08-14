const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('.fake-nav').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.action === 'add') {
      showToast('В приложении Nexora здесь откроется мастер создания проекта.');
      return;
    }

    document.querySelectorAll('.fake-nav').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const title = document.getElementById('fakeTitle');
    const subtitle = document.getElementById('fakeSubtitle');
    const section = button.dataset.section;
    title.textContent = section;
    subtitle.textContent = section === 'Все проекты'
      ? 'Здесь собраны все ваши проекты в одном месте.'
      : `Раздел ${section.toLowerCase()} библиотеки Nexora.`;
  });
});

document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.project-card').forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
  });
});

document.querySelectorAll('.detail-tabs button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.detail-tabs button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Give a clearer message when the user hasn't placed the Setup file yet.
document.querySelectorAll('a[href="./downloads/Nexora-Setup.exe"]').forEach((link) => {
  link.addEventListener('click', async (event) => {
    try {
      const response = await fetch('./downloads/Nexora-Setup.exe', { method: 'HEAD', cache: 'no-store' });
      if (!response.ok) {
        event.preventDefault();
        showToast('Добавь Nexora-Setup.exe в папку downloads.');
      }
    } catch {
      // Static hosting may reject HEAD. Keep normal download behavior.
    }
  });
});
