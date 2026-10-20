/**
 * Pollería Belgrano — Catálogo Oficial y Gestión de Datos
 * Base de datos inicial verificada y persistencia en localStorage
 */

const DEFAULT_PRODUCTS = [
  {
    "id": "prod-1",
    "title": "Pata muslo sin hueso",
    "category": "pollo",
    "categoryLabel": "Pollo Fresco",
    "desc": "Pata muslo entera, sin hueso y sin piel x 1 kilo. Calidad avícola seleccionada.",
    "price": 28000,
    "priceDisplay": "$ 28.000,00",
    "image": "assets/images/pata_muslo_sin_hueso.jpg"
  },
  {
    "id": "prod-2",
    "title": "Pechuga sin hueso",
    "category": "pollo",
    "categoryLabel": "Pollo Fresco",
    "desc": "Pechuga sin hueso y sin piel x 1 kilo. Corte magro, tierno y fresco.",
    "price": 26500,
    "priceDisplay": "$ 26.500,00",
    "image": "assets/images/pechuga_sin_hueso.jpg"
  },
  {
    "id": "prod-3",
    "title": "Pata",
    "category": "pollo",
    "categoryLabel": "Pollo Fresco",
    "desc": "Pata de pollo X 1 kilo. Fresca, lista para hornear o guisar.",
    "price": 18500,
    "priceDisplay": "$ 18.500,00",
    "image": "assets/images/pata.jpg"
  },
  {
    "id": "prod-4",
    "title": "Pata muslo",
    "category": "pollo",
    "categoryLabel": "Pollo Fresco",
    "desc": "Pata muslo con hueso entera x 1 kilo.",
    "price": 11100,
    "priceDisplay": "$ 11.100,00",
    "image": "assets/images/pata_muslo.jpg"
  },
  {
    "id": "prod-5",
    "title": "Muslo",
    "category": "pollo",
    "categoryLabel": "Pollo Fresco",
    "desc": "Muslo solo, sin carcaza x 1 kilo.",
    "price": 18500,
    "priceDisplay": "$ 18.500,00",
    "image": "assets/images/muslo.jpg"
  },
  {
    "id": "prod-6",
    "title": "Pollo entero",
    "category": "pollo",
    "categoryLabel": "Pollo Fresco",
    "desc": "Pollo entero x 2,5 kilos aproximadamente. Ideal para el horno o parrilla.",
    "price": 25000,
    "priceDisplay": "$ 25.000,00",
    "image": "assets/images/pollo_entero.jpg"
  },
  {
    "id": "prod-7",
    "title": "Alitas",
    "category": "pollo",
    "categoryLabel": "Pollo Fresco",
    "desc": "Alitas x 1 kilo.",
    "price": 6500,
    "priceDisplay": "$ 6.500,00",
    "image": "assets/images/alitas.jpg"
  },
  {
    "id": "prod-8",
    "title": "Hamburguesas especial",
    "category": "elaborado",
    "categoryLabel": "Pollo Elaborado",
    "desc": "Hamburguesas especiales con morrón rojo y cebollita de verdeo x 1 kilo.",
    "price": 30200,
    "priceDisplay": "$ 30.200,00",
    "image": "assets/images/hamburguesas_especial.jpg"
  },
  {
    "id": "prod-9",
    "title": "Hamburguesas tradicional",
    "category": "elaborado",
    "categoryLabel": "Pollo Elaborado",
    "desc": "Hamburguesa tradicional con provenzal X 1 kilo.",
    "price": 30200,
    "priceDisplay": "$ 30.200,00",
    "image": "assets/images/hamburguesas_tradicional.jpg"
  },
  {
    "id": "prod-10",
    "title": "Arrollado verdeo x 300g aprox",
    "category": "elaborado",
    "categoryLabel": "Pollo Elaborado",
    "desc": "Arrollado con cebollita de verdeo, queso pategras, morrón rojo, aceitunas negras y panceta ahumada. Por unidad x 300g aprox.",
    "price": 12000,
    "priceDisplay": "$ 12.000,00",
    "image": "assets/images/arrollado_pollo.jpg"
  },
  {
    "id": "prod-11",
    "title": "Arrollado especial x 300g aprox",
    "category": "elaborado",
    "categoryLabel": "Pollo Elaborado",
    "desc": "Arrollado con jamón cocido, queso pategras, aceitunas verdes, morrón rojo y huevo duro. Por unidad x 300g aprox.",
    "price": 12000,
    "priceDisplay": "$ 12.000,00",
    "image": "assets/images/arrollado_pollo.jpg"
  },
  {
    "id": "prod-12",
    "title": "Arrollado capresee x 300g aprox",
    "category": "elaborado",
    "categoryLabel": "Pollo Elaborado",
    "desc": "Arrollado con queso pategras, tomate deshidratado hidratado y albahaca fresca. Por unidad x 300g aprox.",
    "price": 12000,
    "priceDisplay": "$ 12.000,00",
    "image": "assets/images/arrollado_pollo.jpg"
  },
  {
    "id": "prod-13",
    "title": "Arrollado agridulce x 300g aprox",
    "category": "elaborado",
    "categoryLabel": "Pollo Elaborado",
    "desc": "Arrollado con panceta ahumada, ciruelas y queso pategras. Por unidad x 300g aprox.",
    "price": 12000,
    "priceDisplay": "$ 12.000,00",
    "image": "assets/images/arrollado_pollo.jpg"
  },
  {
    "id": "prod-14",
    "title": "Milanesas pechuga",
    "category": "elaborado",
    "categoryLabel": "Pollo Elaborado",
    "desc": "Milanesas caseras de pechuga x 1 kilo. Empanado parejo y carne magra.",
    "price": 24200,
    "priceDisplay": "$ 24.200,00",
    "image": "assets/images/milanesas_pechuga.jpg"
  },
  {
    "id": "prod-15",
    "title": "Milanesas pata muslo",
    "category": "elaborado",
    "categoryLabel": "Pollo Elaborado",
    "desc": "Milanesas caseras de pata muslo x 1 kilo. Super jugosas y sabrosas.",
    "price": 24200,
    "priceDisplay": "$ 24.200,00",
    "image": "assets/images/milanesas_pata_muslo.jpg"
  },
  {
    "id": "prod-16",
    "title": "Nuggets Sadia",
    "category": "elaborado",
    "categoryLabel": "Pollo Elaborado",
    "desc": "Nuggets de pollo congeladas Sadia x 1 kg. Crocantes y fáciles de preparar.",
    "price": 29800,
    "priceDisplay": "$ 29.800,00",
    "image": "assets/images/nuggets_sadia.jpg"
  },
  {
    "id": "prod-17",
    "title": "Huevos x 6",
    "category": "almacen",
    "categoryLabel": "Almacén",
    "desc": "Huevos frescos en estuche x 6 unidades.",
    "price": 3000,
    "priceDisplay": "$ 3.000,00",
    "image": "assets/images/huevos_x_6.jpg"
  },
  {
    "id": "prod-18",
    "title": "Jugo sol & fruta naranja x 1 litro",
    "category": "bebidas",
    "categoryLabel": "Bebidas",
    "desc": "Jugo sol & fruta naranja 100% fruta x 1 litro.",
    "price": 5900,
    "priceDisplay": "$ 5.900,00",
    "image": "assets/images/jugo_sol_naranja.jpg"
  },
  {
    "id": "prod-19",
    "title": "Jugo sol & fruta manzana x 1 litro",
    "category": "bebidas",
    "categoryLabel": "Bebidas",
    "desc": "Jugo sol & fruta manzana 100% fruta x 1 litro.",
    "price": 5900,
    "priceDisplay": "$ 5.900,00",
    "image": "assets/images/jugo_sol_manzana.jpg"
  },
  {
    "id": "prod-20",
    "title": "Alitas promo x 2 kg",
    "category": "promo",
    "categoryLabel": "Pollo Promo",
    "desc": "Alitas promo x 2 kg congeladas. Excelente rendimiento para tus comidas.",
    "price": 8500,
    "priceDisplay": "$ 8.500,00",
    "image": "assets/images/alitas.jpg"
  }
];

const STORAGE_KEY = 'polleria_catalog_data';

/**
 * Carga el catálogo desde localStorage o retorna el catálogo por defecto
 */
function getStoredProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error al leer productos de localStorage:', e);
  }
  return [...DEFAULT_PRODUCTS];
}

/**
 * Guarda el catálogo actualizado en localStorage
 */
function saveProductsToStorage(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return true;
  } catch (e) {
    console.error('Error al guardar productos en localStorage:', e);
    return false;
  }
}

/**
 * Restablece el catálogo a los 20 productos oficiales de fábrica
 */
function resetProductsToDefault() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [...DEFAULT_PRODUCTS];
  } catch (e) {
    console.error('Error al restablecer productos:', e);
    return [...DEFAULT_PRODUCTS];
  }
}

/**
 * Formatea un número al estándar argentino de moneda: $ 28.000,00
 */
function formatProductPrice(price) {
  const num = Number(price) || 0;
  if (num <= 0) return 'Consultar';
  return '$ ' + num.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
