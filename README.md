# Pollería Belgrano — San Carlos de Bariloche

Sitio web comercial profesional, liviano, de alto rendimiento y mobile-first para **Pollería Belgrano**, ubicada en San Carlos de Bariloche, Provincia de Río Negro, Argentina.

La plataforma está diseñada estratégicamente para convertir visitantes en clientes, priorizando los pedidos a través de **Uber Eats** y la atención de consultas personalizadas vía **WhatsApp**.

---

## 🍗 Características Destacadas

- **Datos 100% Reales y Verificados:** Desarrollado sobre un relevamiento exhaustivo del catálogo oficial en Uber Eats (20 productos, 5 categorías, descripciones exactas y precios oficiales). Sin datos ni fotos genéricas inventadas.
- **Identidad de Marca Auténtica:** Paleta de colores extraída del isotipo institucional (Verde Bosque `#153e2b` y Ámbar Dorado `#d8a236`), acompañada de la fotografía oficial del comercio.
- **Prioridad Comercial en Uber Eats:** Botones de llamado a la acción (CTA) destacados con enlaces directos a la tienda en Bariloche.
- **Canal Complementario WhatsApp:** Botones directos con mensaje predeterminado y botón flotante ergonómico adaptado para móviles.
- **Estado de Horario en Vivo:** Indicador en tiempo real ("Abierto ahora" / "Cerrado") calculado automáticamente según el huso horario de Bariloche (`America/Argentina/Buenos_Aires`) para el horario verificado (Lunes a Sábado de 09:30 a 21:00 hs).
- **Catálogo Interactivo con Búsqueda:** Filtros instantáneos por categoría y buscador por palabra clave en tiempo real.
- **Modal Lightbox Accesible:** Permite a los clientes inspeccionar las fotografías reales de los productos en alta resolución.
- **Invitación a Reseñas de Google:** Enlace directo al Place ID oficial para incentivar calificaciones genuinas de clientes sin calificaciones simuladas.
- **SEO Local & Accesibilidad:** Marcado Schema.org (`FoodEstablishment`), Open Graph completo para redes sociales y semántica HTML5 accesible (WCAG AA).

---

## 📁 Estructura del Proyecto

```text
Pagina Polleria Belgrano/
├── index.html                   # Documento principal semántico y punto de entrada
├── INVESTIGACION.md             # Relevamiento detallado de fuentes oficiales y catálogo
├── README.md                    # Documentación, ejecución y despliegue
├── css/
│   └── styles.css               # Estilos modernos (Variables CSS, Flexbox/Grid, Animaciones)
├── js/
│   └── main.js                  # Lógica interactiva (horario en vivo, filtros, buscador, lightbox)
└── assets/
    └── images/                  # Activos visuales y fotografías reales verificadas
        ├── og-image.jpg         # Imagen optimizada Open Graph para compartir en WhatsApp (1200x630)
        ├── logo.png             # Logotipo institucional oficial
        ├── hero.jpg             # Fotografía gastronómica de portada oficial
        ├── pata.jpg             # Pata de pollo (foto real)
        ├── pata_muslo_sin_hueso.jpg  # Pata muslo deshuesada Las Camelias (foto real)
        ├── pechuga_sin_hueso.jpg     # Pechuga deshuesada (foto real)
        ├── hamburguesas_especial.jpg # Hamburguesas con morrón y verdeo (foto real)
        ├── hamburguesas_tradicional.jpg # Hamburguesas tradicionales con provenzal (foto real)
        ├── huevos_x_6.jpg            # Huevos en estuche x 6 (foto real)
        ├── jugo_sol_naranja.jpg      # Jugo Sol & Fruta naranja 1L (foto real)
        └── jugo_sol_manzana.jpg      # Jugo Sol & Fruta manzana 1L (foto real)
```

---

## 🚀 Previsualización y Ejecución Local

Al tratarse de una web estática pura (HTML, CSS y JS estándar), no requiere instalación de dependencias, compilación ni base de datos.

### Opción 1: Abrir directamente en el navegador
Hacer doble clic en `index.html` o abrirlo con cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).

### Opción 2: Con un servidor local ligero
Si disponés de Python, Node.js o la extensión *Live Server* en VS Code:

- **Con Python:**
  ```bash
  python -m http.server 8000
  ```
  Luego ingresar en el navegador a `http://localhost:8000`.

- **Con Node.js (npx serve):**
  ```bash
  npx serve .
  ```

---

## 🌐 Despliegue Gratuito en Cloudflare Pages

El proyecto está 100% listo para publicarse sin costo en **Cloudflare Pages** con certificado SSL automático, red CDN global ultrarrápida y alta disponibilidad.

### Método A: Subida Directa (Sin Git / Arrastrar y Soltar)
1. Ingresá a tu cuenta en [Cloudflare Dashboard](https://dash.cloudflare.com/) y seleccioná **Workers & Pages**.
2. Hacé clic en **Create application** > pestaña **Pages** > **Upload assets**.
3. Asigná un nombre a tu proyecto (ej: `polleria-belgrano`).
4. Arrastrá la carpeta completa `Pagina Polleria Belgrano` (que contiene `index.html` en su raíz).
5. Hacé clic en **Deploy site**. En segundos tu sitio estará activo en una URL del tipo `https://polleria-belgrano.pages.dev`.

### Método B: Conectado a Repositorio Git (GitHub / GitLab)
1. Subí este proyecto a un repositorio de GitHub (público o privado).
2. En Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Seleccioná el repositorio.
4. En **Build settings**:
   - **Framework preset:** `None`
   - **Build command:** *(dejar vacío)*
   - **Build output directory:** `/`
5. Hacé clic en **Save and Deploy**. A partir de allí, cada actualización que hagas en el repositorio se publicará automáticamente.

---

## 📋 Resumen del Relevamiento Comercial

| Concepto | Dato Verificado |
| :--- | :--- |
| **Comercio** | Pollería Belgrano |
| **Ubicación Principal** | Av. Belgrano 65, San Carlos de Bariloche, Río Negro (R8400) |
| **Horario de Atención** | Lunes a Sábado de 09:30 a 21:00 hs. Domingos cerrado. |
| **Tienda Uber Eats** | [Enlace oficial verificado](https://www.ubereats.com/ar/store/polleria-belgrano-bariloche/sfcrBjpYXWKCcMb91CNb-w?diningMode=DELIVERY&surfaceName=) |
| **WhatsApp Oficial** | [+54 9 294 451-2020](https://wa.me/5492944512020) |
| **Instagram** | [@polleriabelgrano](https://www.instagram.com/polleriabelgrano/) |
| **Reseñas de Google** | [Formulario directo de reseña Google Place ID](https://search.google.com/local/writereview?placeid=ChIJe1ol9pJ7GpYRjt_-75QMCp4) |
| **Productos Verificados** | 20 productos (7 Pollo fresco, 9 Elaborados, 1 Promo, 2 Bebidas, 1 Almacén) |
| **Fotografías Reales** | 8 productos con foto auténtica + Portada/Hero + Isotipo oficial |

*Para más detalles sobre discrepancias, metodología y registro producto por producto, consultar [INVESTIGACION.md](INVESTIGACION.md).*
