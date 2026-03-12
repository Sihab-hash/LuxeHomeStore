// ========== LuxeHomeStore Common JS ==========

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => { navLinks.classList.remove('active'); hamburger.classList.remove('active'); });
    });
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Cart count from localStorage
  updateCartCount();
});

// Cart utilities
function getCart() {
  return JSON.parse(localStorage.getItem('luxeCart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('luxeCart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
  saveCart(cart);
  showToast(`${product.name} added to cart!`);
}
function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span> ${message}`;
  toast.style.cssText = `
    position:fixed;bottom:30px;right:30px;background:linear-gradient(135deg,var(--accent),#1a7a6f);
    color:#fff;padding:16px 28px;border-radius:12px;font-weight:500;z-index:9999;
    animation:fadeInUp 0.4s ease;display:flex;align-items:center;gap:10px;
    box-shadow:0 8px 32px rgba(42,157,143,0.4);font-size:0.95rem;
  `;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(20px)'; toast.style.transition = '0.3s ease'; setTimeout(() => toast.remove(), 300); }, 2500);
}

// Product data
const products = [
  { id: 1, name: 'Velvet Accent Chair', category: 'Furniture', price: 299, oldPrice: 399, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', badge: 'sale', rating: 4.8, reviews: 124 },
  { id: 2, name: 'Ceramic Table Lamp', category: 'Lighting', price: 89, oldPrice: null, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=400&fit=crop', badge: 'new', rating: 4.6, reviews: 67 },
  { id: 3, name: 'Handwoven Throw Blanket', category: 'Textiles', price: 65, oldPrice: 85, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', badge: 'sale', rating: 4.9, reviews: 203 },
  { id: 4, name: 'Modern Bookshelf', category: 'Furniture', price: 449, oldPrice: null, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop', badge: 'hot', rating: 4.7, reviews: 89 },
  { id: 5, name: 'Minimalist Wall Clock', category: 'Decor', price: 45, oldPrice: 60, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop', badge: 'sale', rating: 4.5, reviews: 156 },
  { id: 6, name: 'Marble Coffee Table', category: 'Furniture', price: 599, oldPrice: null, image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=400&h=400&fit=crop', badge: 'new', rating: 4.9, reviews: 42 },
  { id: 7, name: 'Scented Candle Set', category: 'Decor', price: 35, oldPrice: null, image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop', badge: null, rating: 4.4, reviews: 312 },
  { id: 8, name: 'Linen Cushion Covers', category: 'Textiles', price: 28, oldPrice: 40, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop', badge: 'sale', rating: 4.6, reviews: 178 },
  { id: 9, name: 'Pendant Light Fixture', category: 'Lighting', price: 175, oldPrice: 220, image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop', badge: 'hot', rating: 4.8, reviews: 95 },
  { id: 10, name: 'Wooden Plant Stand', category: 'Decor', price: 55, oldPrice: null, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop', badge: 'new', rating: 4.3, reviews: 68 },
  { id: 11, name: 'Silk Curtain Panels', category: 'Textiles', price: 120, oldPrice: 160, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop', badge: 'sale', rating: 4.7, reviews: 54 },
  { id: 12, name: 'Decorative Mirror', category: 'Decor', price: 195, oldPrice: null, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop', badge: null, rating: 4.5, reviews: 87 },
];

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

function createProductCard(product) {
  const badgeHTML = product.badge ? `<span class="product-badge badge-${product.badge}">${product.badge.toUpperCase()}</span>` : '';
  const oldPriceHTML = product.oldPrice ? `<span class="price-old">$${product.oldPrice}</span>` : '';
  return `
    <div class="product-card animate-on-scroll" data-id="${product.id}">
      <div class="product-img">
        ${badgeHTML}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-actions">
          <button onclick="addToCart({id:${product.id},name:'${product.name.replace(/'/g,"\\'")}',price:${product.price},image:'${product.image}'})" title="Add to Cart">🛒</button>
          <button title="Wishlist">♡</button>
          <button onclick="location.href='product.html?id=${product.id}'" title="View">👁</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <div class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></div>
        <div class="product-price">
          <span class="price-current">$${product.price}</span>
          ${oldPriceHTML}
        </div>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="count">(${product.reviews})</span>
        </div>
      </div>
    </div>
  `;
}

function getNavHTML(activePage) {
  const pages = [
    { name: 'Home', href: 'index.html' },
    { name: 'Shop', href: 'shop.html' },
    { name: 'About', href: 'about.html' },
    { name: 'Contact', href: 'contact.html' },
  ];
  const links = pages.map(p => `<a href="${p.href}" class="${activePage === p.name ? 'active' : ''}">${p.name}</a>`).join('');
  return `
  <nav class="navbar">
    <div class="container nav-inner">
      <a href="index.html" class="nav-logo">Luxe<span>HomeStore</span></a>
      <div class="nav-links">${links}</div>
      <div class="nav-actions">
        <a href="shop.html" class="nav-icon" title="Search">🔍</a>
        <a href="cart.html" class="nav-icon" title="Cart">🛒<span class="badge cart-count" style="display:none">0</span></a>
        <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </nav>`;
}

function getFooterHTML() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo">Luxe<span>HomeStore</span></a>
          <p>Transform your space with our curated collection of premium home décor, furniture, and lifestyle essentials.</p>
          <div class="footer-social">
            <a href="#">𝕏</a><a href="#">f</a><a href="#">in</a><a href="#">📷</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <a href="index.html">Home</a><a href="shop.html">Shop</a><a href="about.html">About Us</a><a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4>Categories</h4>
          <a href="shop.html">Furniture</a><a href="shop.html">Lighting</a><a href="shop.html">Textiles</a><a href="shop.html">Decor</a>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <a href="#">FAQ</a><a href="#">Shipping</a><a href="#">Returns</a><a href="#">Privacy Policy</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 LuxeHomeStore. All rights reserved.</span>
        <span>Designed with ♥ for beautiful homes</span>
      </div>
    </div>
  </footer>`;
}
