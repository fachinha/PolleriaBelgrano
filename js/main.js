/**
 * Pollería Belgrano — San Carlos de Bariloche
 * Lógica e Interactividad JavaScript (Vanilla, Ligero y Accesible)
 */

document.addEventListener('DOMContentLoaded', () => {
  initScheduleStatus();
  initMobileNav();
  initCatalogFilters();
  initLightbox();
});

/**
 * 1. Control de Estado de Horario de Atención en Vivo (Bariloche)
 * Horario verificado en Uber Eats: Lunes a Sábado de 09:30 a 21:00 hs. Domingos: Cerrado.
 */
function initScheduleStatus() {
  const statusBadge = document.getElementById('nav-status-badge');
  const contactStatusBadge = document.getElementById('contact-status-badge');
  
  if (!statusBadge && !contactStatusBadge) return;

  function checkStatus() {
    // Obtener fecha/hora en la zona horaria de San Carlos de Bariloche (America/Argentina/Buenos_Aires)
    const options = { timeZone: 'America/Argentina/Buenos_Aires', hour12: false, weekday: 'short', hour: '2-digit', minute: '2-digit' };
    const formatter = new Intl.DateTimeFormat('es-AR', options);
    const parts = formatter.formatToParts(new Date());

    const partMap = {};
    parts.forEach(p => { partMap[p.type] = p.value; });

    // weekday: 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'
    const day = (partMap.weekday || '').toLowerCase();
    const hours = parseInt(partMap.hour, 10);
    const minutes = parseInt(partMap.minute, 10);
    const currentMinutes = hours * 60 + minutes;

    // Horarios: 09:30 (570 min) a 21:00 (1260 min)
    const openTime = 9 * 60 + 30; // 570
    const closeTime = 21 * 60;    // 1260

    const isSunday = day.includes('dom');
    const isOpen = !isSunday && currentMinutes >= openTime && currentMinutes < closeTime;

    const html = `
      <span class="status-dot ${isOpen ? 'open' : 'closed'}"></span>
      <span>${isOpen ? 'Abierto ahora (hasta 21:00)' : (isSunday ? 'Cerrado hoy (Domingo)' : 'Cerrado ahora (Abre 09:30)')}</span>
    `;

    if (statusBadge) statusBadge.innerHTML = html;
    if (contactStatusBadge) contactStatusBadge.innerHTML = html;
  }

  checkStatus();
  // Actualizar cada 60 segundos
  setInterval(checkStatus, 60000);
}

/**
 * 2. Menú de Navegación Móvil
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    drawer.classList.toggle('active', !isExpanded);
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', toggleMenu);

  // Cerrar al hacer click en cualquier enlace interno
  const mobileLinks = drawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      toggleMenu();
    }
  });
}

/**
 * 3. Filtrado de Catálogo por Categorías y Búsqueda en Tiempo Real
 */
function initCatalogFilters() {
  const tabButtons = document.querySelectorAll('.category-tabs .tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  const searchInput = document.getElementById('product-search-input');
  const clearSearchBtn = document.getElementById('search-clear-btn');
  const noResultsMsg = document.getElementById('no-results-message');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function filterCards() {
    let visibleCount = 0;
    const query = currentSearchQuery.trim().toLowerCase();

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const title = (card.querySelector('.product-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.product-desc')?.textContent || '').toLowerCase();

      const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
      const matchesSearch = query === '' || title.includes(query) || desc.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      if (visibleCount === 0) {
        noResultsMsg.classList.add('visible');
      } else {
        noResultsMsg.classList.remove('visible');
      }
    }
  }

  // Eventos de Pestañas
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      filterCards();
    });
  });

  // Eventos de Búsqueda
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (clearSearchBtn) {
        if (currentSearchQuery.length > 0) {
          clearSearchBtn.classList.add('visible');
        } else {
          clearSearchBtn.classList.remove('visible');
        }
      }
      filterCards();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        currentSearchQuery = '';
        clearSearchBtn.classList.remove('visible');
        searchInput.focus();
        filterCards();
      }
    });
  }
}

/**
 * 4. Lightbox Modal para Fotografías Reales de Productos
 */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!modal || !modalImg) return;

  const realPhotoCards = document.querySelectorAll('.product-card:not(.product-card-no-photo) .product-image-container');

  function openLightbox(src, alt, title, desc) {
    modalImg.src = src;
    modalImg.alt = alt;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  realPhotoCards.forEach(container => {
    container.addEventListener('click', () => {
      const img = container.querySelector('.product-image');
      const card = container.closest('.product-card');
      const title = card.querySelector('.product-title')?.textContent || '';
      const desc = card.querySelector('.product-desc')?.textContent || '';
      if (img) {
        openLightbox(img.src, img.alt, title, desc);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}
