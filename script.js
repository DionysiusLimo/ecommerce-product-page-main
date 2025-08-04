// E-commerce Product Page JavaScript

class EcommerceApp {
  constructor() {
    this.currentImageIndex = 0;
    this.currentLightboxIndex = 0;
    this.quantity = 0;
    this.cart = [];
    this.images = [
      './images/image-product-1.jpg',
      './images/image-product-2.jpg',
      './images/image-product-3.jpg',
      './images/image-product-4.jpg'
    ];
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateQuantityDisplay();
    this.updateCartDisplay();
  }

  setupEventListeners() {
    // Mobile menu
    this.setupMobileMenu();
    
    // Product gallery
    this.setupProductGallery();
    
    // Lightbox
    this.setupLightbox();
    
    // Cart functionality
    this.setupCart();
    
    // Quantity controls
    this.setupQuantityControls();
    
    // Click outside handlers
    this.setupClickOutsideHandlers();
  }

  setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    menuToggle?.addEventListener('click', () => {
      mobileMenuOverlay.classList.add('show');
    });

    menuClose?.addEventListener('click', () => {
      mobileMenuOverlay.classList.remove('show');
    });

    // Close menu when clicking on overlay
    mobileMenuOverlay?.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove('show');
      }
    });
  }

  setupProductGallery() {
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');

    // Thumbnail navigation
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        this.changeImage(index);
      });
    });

    // Navigation buttons (mobile)
    prevBtn?.addEventListener('click', () => {
      this.changeImage(this.currentImageIndex - 1);
    });

    nextBtn?.addEventListener('click', () => {
      this.changeImage(this.currentImageIndex + 1);
    });

    // Open lightbox on main image click (desktop only)
    mainImage?.addEventListener('click', () => {
      if (window.innerWidth > 768) {
        this.openLightbox();
      }
    });
  }

  changeImage(index) {
    // Wrap around if necessary
    if (index < 0) index = this.images.length - 1;
    if (index >= this.images.length) index = 0;

    this.currentImageIndex = index;
    
    // Update main image
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
      mainImage.src = this.images[index];
    }

    // Update thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  setupLightbox() {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');

    // Close lightbox
    lightboxClose?.addEventListener('click', () => {
      this.closeLightbox();
    });

    // Close lightbox when clicking on overlay
    lightboxOverlay?.addEventListener('click', (e) => {
      if (e.target === lightboxOverlay) {
        this.closeLightbox();
      }
    });

    // Navigation buttons
    lightboxPrev?.addEventListener('click', () => {
      this.changeLightboxImage(this.currentLightboxIndex - 1);
    });

    lightboxNext?.addEventListener('click', () => {
      this.changeLightboxImage(this.currentLightboxIndex + 1);
    });

    // Thumbnail navigation
    lightboxThumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => {
        this.changeLightboxImage(index);
      });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightboxOverlay.classList.contains('show')) return;
      
      switch (e.key) {
        case 'Escape':
          this.closeLightbox();
          break;
        case 'ArrowLeft':
          this.changeLightboxImage(this.currentLightboxIndex - 1);
          break;
        case 'ArrowRight':
          this.changeLightboxImage(this.currentLightboxIndex + 1);
          break;
      }
    });
  }

  openLightbox() {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    this.currentLightboxIndex = this.currentImageIndex;
    this.changeLightboxImage(this.currentLightboxIndex);
    lightboxOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    lightboxOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  changeLightboxImage(index) {
    // Wrap around if necessary
    if (index < 0) index = this.images.length - 1;
    if (index >= this.images.length) index = 0;

    this.currentLightboxIndex = index;
    
    // Update lightbox image
    const lightboxImage = document.querySelector('.lightbox-image');
    if (lightboxImage) {
      lightboxImage.src = this.images[index];
    }

    // Update thumbnails
    const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
    lightboxThumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  setupCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    // Toggle cart dropdown
    cartBtn?.addEventListener('click', () => {
      cartDropdown.classList.toggle('show');
    });

    // Add to cart
    addToCartBtn?.addEventListener('click', () => {
      this.addToCart();
    });
  }

  setupQuantityControls() {
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    minusBtn?.addEventListener('click', () => {
      this.changeQuantity(-1);
    });

    plusBtn?.addEventListener('click', () => {
      this.changeQuantity(1);
    });
  }

  changeQuantity(delta) {
    this.quantity = Math.max(0, this.quantity + delta);
    this.updateQuantityDisplay();
  }

  updateQuantityDisplay() {
    const quantityElement = document.querySelector('.quantity');
    if (quantityElement) {
      quantityElement.textContent = this.quantity;
    }
  }

  addToCart() {
    if (this.quantity === 0) return;

    const product = {
      id: 1,
      name: 'Fall Limited Edition Sneakers',
      price: 125.00,
      quantity: this.quantity,
      image: './images/image-product-1-thumbnail.jpg'
    };

    // Check if product already exists in cart
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }

    // Reset quantity
    this.quantity = 0;
    this.updateQuantityDisplay();
    this.updateCartDisplay();
    
    // Show cart dropdown briefly
    const cartDropdown = document.querySelector('.cart-dropdown');
    cartDropdown.classList.add('show');
    setTimeout(() => {
      cartDropdown.classList.remove('show');
    }, 2000);
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.updateCartDisplay();
  }

  updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartItems = document.querySelector('.cart-items');

    // Calculate total items
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart count
    if (cartCount) {
      cartCount.textContent = totalItems;
      cartCount.classList.toggle('show', totalItems > 0);
    }

    // Update cart content
    if (totalItems === 0) {
      cartEmpty.style.display = 'block';
      cartItems.innerHTML = '';
    } else {
      cartEmpty.style.display = 'none';
      cartItems.innerHTML = this.cart.map(item => this.createCartItemHTML(item)).join('');
      
      // Add checkout button
      const checkoutBtn = document.createElement('button');
      checkoutBtn.className = 'cart-checkout';
      checkoutBtn.textContent = 'Checkout';
      checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality would be implemented here!');
      });
      cartItems.appendChild(checkoutBtn);

      // Add delete functionality to cart items
      cartItems.querySelectorAll('.cart-item-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.closest('.cart-item').dataset.productId);
          this.removeFromCart(productId);
        });
      });
    }
  }

  createCartItemHTML(item) {
    const total = (item.price * item.quantity).toFixed(2);
    
    return `
      <div class="cart-item" data-product-id="${item.id}">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">
            $${item.price.toFixed(2)} x ${item.quantity} 
            <span class="cart-item-total">$${total}</span>
          </div>
        </div>
        <button class="cart-item-delete">
          <img src="./images/icon-delete.svg" alt="Delete">
        </button>
      </div>
    `;
  }

  setupClickOutsideHandlers() {
    document.addEventListener('click', (e) => {
      // Close cart dropdown when clicking outside
      const cartContainer = document.querySelector('.cart-container');
      const cartDropdown = document.querySelector('.cart-dropdown');
      
      if (cartDropdown && !cartContainer.contains(e.target)) {
        cartDropdown.classList.remove('show');
      }
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new EcommerceApp();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
  const lightboxOverlay = document.querySelector('.lightbox-overlay');
  
  // Close lightbox on mobile resize
  if (window.innerWidth <= 768 && lightboxOverlay.classList.contains('show')) {
    lightboxOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }
});