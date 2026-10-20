/**
 * Pollería Belgrano — San Carlos de Bariloche
 * Lógica e Interactividad JavaScript (Vanilla, Ligero y Accesible)
 * Incluye Panel de Administración (Inspirado en Vinoteca Vinarte)
 */

let currentProducts = [];
let currentCategory = 'all';
let currentSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  initScheduleStatus();
  initMobileNav();
  initCatalog();
  initAdminPanel();
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
    const options = { timeZone: 'America/Argentina/Buenos_Aires', hour12: false, weekday: 'short', hour: '2-digit', minute: '2-digit' };
    const formatter = new Intl.DateTimeFormat('es-AR', options);
    const parts = formatter.formatToParts(new Date());

    const partMap = {};
    parts.forEach(p => { partMap[p.type] = p.value; });

    const day = (partMap.weekday || '').toLowerCase();
    const hours = parseInt(partMap.hour, 10);
    const minutes = parseInt(partMap.minute, 10);
    const currentMinutes = hours * 60 + minutes;

    const openTime = 9 * 60 + 30; // 09:30 hs
    const closeTime = 21 * 60;    // 21:00 hs

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

  const mobileLinks = drawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      toggleMenu();
    }
  });
}

/**
 * 3. Catálogo Dinámico y Filtrado de Productos
 */
function initCatalog() {
  // Cargar productos desde localStorage o defaults
  currentProducts = typeof getStoredProducts === 'function' ? getStoredProducts() : [];
  
  renderCatalog();
  initCatalogControls();
  initLightbox();
}

/**
 * Renderiza las tarjetas de productos en el catálogo
 */
function renderCatalog() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  const UBER_URL = "https://www.ubereats.com/ar/store/polleria-belgrano-bariloche/sfcrBjpYXWKCcMb91CNb-w?diningMode=DELIVERY&surfaceName=";

  grid.innerHTML = currentProducts.map(p => `
    <article class="product-card" data-category="${p.category}" data-id="${p.id}">
      <div class="product-image-container" title="Hacer clic para ampliar imagen">
        <img src="${p.image}" alt="${p.title} - Pollería Belgrano Bariloche" class="product-image" loading="lazy" onerror="this.src='assets/images/logo.png'">
      </div>
      <div class="product-content">
        <span class="product-category-tag">${p.categoryLabel || 'Pollería'}</span>
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <div>
            <span class="product-price-label">Precio verificado</span>
            <span class="product-price">${p.priceDisplay || formatProductPrice(p.price)}</span>
          </div>
          <a href="${UBER_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-uber" aria-label="Pedir ${p.title} en Uber Eats">
            Pedir
          </a>
        </div>
      </div>
    </article>
  `).join('');

  updateCategoryCounts();
  filterCards();
  bindLightboxEvents();
}

/**
 * Actualiza los contadores numéricos en las pestañas de categorías
 */
function updateCategoryCounts() {
  const categories = ['all', 'pollo', 'elaborado', 'promo', 'bebidas', 'almacen'];
  
  categories.forEach(cat => {
    const btn = document.querySelector(`.category-tabs .tab-btn[data-filter="${cat}"]`);
    if (btn) {
      const countSpan = btn.querySelector('.tab-count');
      if (countSpan) {
        if (cat === 'all') {
          countSpan.textContent = currentProducts.length;
        } else {
          const count = currentProducts.filter(p => p.category === cat).length;
          countSpan.textContent = count;
        }
      }
    }
  });

  const adminTotalSpan = document.getElementById('admin-total-count');
  if (adminTotalSpan) {
    adminTotalSpan.textContent = currentProducts.length;
  }
}

/**
 * Filtra las tarjetas según la pestaña activa y la búsqueda
 */
function filterCards() {
  const productCards = document.querySelectorAll('.product-card');
  const noResultsMsg = document.getElementById('no-results-message');
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

/**
 * Inicializa los eventos de búsqueda y pestañas
 */
function initCatalogControls() {
  const tabButtons = document.querySelectorAll('.category-tabs .tab-btn');
  const searchInput = document.getElementById('product-search-input');
  const clearSearchBtn = document.getElementById('search-clear-btn');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'all';
      filterCards();
    });
  });

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
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!modal) return;

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

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

function bindLightboxEvents() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalDesc = document.getElementById('lightbox-desc');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!modal || !modalImg) return;

  const photoCards = document.querySelectorAll('.product-card:not(.product-card-no-photo) .product-image-container');

  photoCards.forEach(container => {
    container.addEventListener('click', () => {
      const img = container.querySelector('.product-image');
      const card = container.closest('.product-card');
      const title = card?.querySelector('.product-title')?.textContent || '';
      const desc = card?.querySelector('.product-desc')?.textContent || '';
      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
      }
    });
  });
}

/**
 * 5. Panel de Administración (Inspirado en Vinoteca Vinarte)
 */
function initAdminPanel() {
  const adminModal = document.getElementById('admin-modal');
  const openBtn = document.getElementById('open-admin-btn');
  const mobileOpenBtn = document.getElementById('mobile-open-admin-btn');
  const closeBtn = document.getElementById('admin-close-btn');
  const backdrop = document.getElementById('admin-modal-backdrop');
  
  const pinView = document.getElementById('admin-pin-view');
  const authView = document.getElementById('admin-auth-view');
  const pinForm = document.getElementById('admin-pin-form');
  const pinInput = document.getElementById('admin-pin-input');
  const pinError = document.getElementById('admin-pin-error');
  
  const toast = document.getElementById('admin-toast');
  const toastText = document.getElementById('admin-toast-text');

  if (!adminModal) return;

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  function checkAuth() {
    const isAuth = sessionStorage.getItem('polleria_admin_auth') === 'true';
    if (isAuth) {
      pinView.style.display = 'none';
      authView.style.display = 'flex';
      renderAdminProductsList();
    } else {
      pinView.style.display = 'flex';
      authView.style.display = 'none';
      if (pinInput) pinInput.value = '';
      if (pinError) pinError.classList.remove('active');
    }
  }

  function openAdmin() {
    adminModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    checkAuth();
    if (sessionStorage.getItem('polleria_admin_auth') !== 'true' && pinInput) {
      setTimeout(() => pinInput.focus(), 100);
    }
  }

  function closeAdmin() {
    adminModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openAdmin);
  if (mobileOpenBtn) {
    mobileOpenBtn.addEventListener('click', () => {
      const drawer = document.getElementById('mobile-nav-drawer');
      const toggleBtn = document.getElementById('mobile-toggle-btn');
      if (drawer && drawer.classList.contains('active')) {
        drawer.classList.remove('active');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      }
      openAdmin();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeAdmin);
  if (backdrop) backdrop.addEventListener('click', closeAdmin);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && adminModal.classList.contains('active')) {
      closeAdmin();
    }
  });

  // Manejo de PIN
  if (pinForm) {
    pinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (pinInput.value || '').trim().toLowerCase();
      if (val === '1234' || val === 'belgrano' || val === 'admin') {
        sessionStorage.setItem('polleria_admin_auth', 'true');
        pinError.classList.remove('active');
        checkAuth();
        showToast('¡Acceso concedido al panel!');
      } else {
        pinError.classList.add('active');
        pinInput.focus();
      }
    });
  }

  // Pestañas de Admin
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  const tabContents = document.querySelectorAll('.admin-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-admin-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`admin-tab-${tabName}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Renderizado y Búsqueda en Lista de Productos (Pestaña 1)
  const adminSearchInput = document.getElementById('admin-search-input');
  if (adminSearchInput) {
    adminSearchInput.addEventListener('input', () => {
      renderAdminProductsList();
    });
  }

  function renderAdminProductsList() {
    const list = document.getElementById('admin-products-list');
    if (!list) return;

    const query = (adminSearchInput?.value || '').trim().toLowerCase();
    const filtered = currentProducts.filter(p => 
      query === '' || 
      p.title.toLowerCase().includes(query) || 
      (p.desc && p.desc.toLowerCase().includes(query)) ||
      (p.categoryLabel && p.categoryLabel.toLowerCase().includes(query))
    );

    if (filtered.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 2.5rem; color: #a3b3a7; font-size: 0.9rem;">
          No se encontraron productos que coincidan con la búsqueda.
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(p => `
      <div class="admin-product-row" data-id="${p.id}">
        <div class="admin-row-info">
          <div class="admin-row-thumb">
            <img src="${p.image}" alt="${p.title}" onerror="this.src='assets/images/logo.png'">
          </div>
          <div class="admin-row-details">
            <span class="admin-row-tag">${p.categoryLabel || p.category}</span>
            <h4 class="admin-row-title" title="${p.title}">${p.title}</h4>
            <p class="admin-row-desc" title="${p.desc}">${p.desc}</p>
          </div>
        </div>

        <div class="admin-row-controls">
          <div class="admin-control-group">
            <label>Precio ARS ($)</label>
            <input type="number" class="admin-price-input" value="${p.price || 0}" step="100" min="0">
          </div>

          <div class="admin-control-group">
            <label>URL o Ruta de la Foto</label>
            <input type="text" class="admin-image-input" value="${p.image || ''}">
          </div>

          <button class="admin-delete-btn" title="Eliminar producto del catálogo" aria-label="Eliminar ${p.title}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `).join('');

    // Eventos en inputs de precio
    list.querySelectorAll('.admin-product-row').forEach(row => {
      const id = row.getAttribute('data-id');
      const prod = currentProducts.find(x => x.id === id);
      if (!prod) return;

      const priceInput = row.querySelector('.admin-price-input');
      const imageInput = row.querySelector('.admin-image-input');
      const deleteBtn = row.querySelector('.admin-delete-btn');
      const thumbImg = row.querySelector('.admin-row-thumb img');

      if (priceInput) {
        priceInput.addEventListener('change', () => {
          const newPrice = Number(priceInput.value) || 0;
          prod.price = newPrice;
          prod.priceDisplay = formatProductPrice(newPrice);
          saveProductsToStorage(currentProducts);
          renderCatalog();
          showToast(`Precio de "${prod.title}" actualizado: ${prod.priceDisplay}`);
        });
      }

      if (imageInput) {
        imageInput.addEventListener('change', () => {
          const newImg = imageInput.value.trim() || 'assets/images/logo.png';
          prod.image = newImg;
          if (thumbImg) thumbImg.src = newImg;
          saveProductsToStorage(currentProducts);
          renderCatalog();
          showToast(`Foto de "${prod.title}" actualizada`);
        });
      }

      if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
          if (confirm(`¿Estás seguro de eliminar "${prod.title}" del catálogo?`)) {
            currentProducts = currentProducts.filter(x => x.id !== id);
            saveProductsToStorage(currentProducts);
            renderAdminProductsList();
            renderCatalog();
            showToast(`"${prod.title}" fue eliminado del catálogo`);
          }
        });
      }
    });
  }

  // Pestaña 2: Formulario Agregar Producto
  const addForm = document.getElementById('admin-add-product-form');
  const cancelAddBtn = document.getElementById('admin-cancel-add-btn');

  if (cancelAddBtn) {
    cancelAddBtn.addEventListener('click', () => {
      const editTabBtn = document.querySelector('.admin-tab-btn[data-admin-tab="edit"]');
      if (editTabBtn) editTabBtn.click();
    });
  }

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('new-product-title')?.value.trim();
      const category = document.getElementById('new-product-category')?.value;
      const price = Number(document.getElementById('new-product-price')?.value) || 0;
      const image = document.getElementById('new-product-image')?.value.trim() || 'assets/images/logo.png';
      const desc = document.getElementById('new-product-desc')?.value.trim();

      if (!title || !desc) {
        alert('Por favor completá todos los campos requeridos.');
        return;
      }

      const catLabels = {
        pollo: 'Pollo Fresco',
        elaborado: 'Pollo Elaborado',
        promo: 'Pollo Promo',
        bebidas: 'Bebidas',
        almacen: 'Almacén'
      };

      const newProduct = {
        id: `prod-${Date.now()}`,
        title,
        category,
        categoryLabel: catLabels[category] || 'Pollería',
        desc,
        price,
        priceDisplay: formatProductPrice(price),
        image
      };

      currentProducts.unshift(newProduct);
      saveProductsToStorage(currentProducts);
      renderAdminProductsList();
      renderCatalog();
      addForm.reset();
      showToast(`¡"${newProduct.title}" agregado al catálogo con éxito!`);

      // Regresar a la pestaña de edición
      const editTabBtn = document.querySelector('.admin-tab-btn[data-admin-tab="edit"]');
      if (editTabBtn) editTabBtn.click();
    });
  }

  // Pestaña 3: Ajustes & Respaldo
  const resetBtn = document.getElementById('admin-reset-btn');
  const exportBtn = document.getElementById('admin-export-btn');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('¿Confirmás restablecer todo el catálogo a los 20 productos iniciales de fábrica? Se perderán las modificaciones personalizadas.')) {
        currentProducts = typeof resetProductsToDefault === 'function' ? resetProductsToDefault() : [];
        renderAdminProductsList();
        renderCatalog();
        showToast('Catálogo restablecido al original de fábrica');
      }
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const jsonStr = JSON.stringify(currentProducts, null, 2);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(jsonStr).then(() => {
          showToast('Catálogo copiado al portapapeles en formato JSON');
        }).catch(() => {
          prompt('Copiá el JSON del catálogo:', jsonStr);
        });
      } else {
        prompt('Copiá el JSON del catálogo:', jsonStr);
      }
    });
  }
}
