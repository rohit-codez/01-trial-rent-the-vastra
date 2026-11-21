/**
 * RentTheVastra – Core Client JavaScript
 * Pure Vanilla JS, High Performance, Zero Dependencies
 */

// 1. Data Store: Outfits Catalogue (Show clothes to the public)
const CLOTHES_DATABASE = [
  {
    id: 'outfit-01',
    title: 'Royal Crimson Zardozi Bridal Lehenga',
    designer: 'Sabyasachi-Inspired Heritage',
    category: 'women',
    tag: 'Bridal Bestseller',
    rental3: 4999,
    rental5: 6999,
    rental7: 8999,
    retail: 65000,
    savePercent: 92,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'outfit-02',
    title: 'Royal Ivory & Gold Zari Sherwani',
    designer: 'Tarun Tahiliani Inspired',
    category: 'men',
    tag: 'Wedding Season',
    rental3: 3499,
    rental5: 4899,
    rental7: 6299,
    retail: 42000,
    savePercent: 91,
    rating: 4.9,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'outfit-03',
    title: 'Mirror-Work Festive Sharara Set',
    designer: 'Abhinav Mishra Inspired',
    category: 'festive',
    tag: 'Sangeet Favorite',
    rental3: 2199,
    rental5: 3199,
    rental7: 3999,
    retail: 24000,
    savePercent: 90,
    rating: 4.8,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'outfit-04',
    title: '4-Piece Himalayan Expedition Trekking Kit',
    designer: 'North Face & Columbia Gear',
    category: 'adventure',
    tag: 'Expedition Ready',
    rental3: 1899,
    rental5: 2699,
    rental7: 3499,
    retail: 28500,
    savePercent: 93,
    rating: 4.9,
    reviews: 520,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'outfit-05',
    title: 'Emerald Green Velvet Reception Gown',
    designer: 'Manish Malhotra Inspired',
    category: 'women',
    tag: 'Cocktail & Evening',
    rental3: 3200,
    rental5: 4500,
    rental7: 5800,
    retail: 38000,
    savePercent: 91,
    rating: 4.8,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'outfit-06',
    title: 'Midnight Blue Royal Bandhgala Set',
    designer: 'Raghavendra Rathore Inspired',
    category: 'men',
    tag: 'Cocktail & Reception',
    rental3: 2899,
    rental5: 3999,
    rental7: 5199,
    retail: 32000,
    savePercent: 90,
    rating: 4.7,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'outfit-07',
    title: 'Royal Mini Prince Sherwani & Dhoti',
    designer: 'RentVastra Kids Couture',
    category: 'kids',
    tag: 'Organic Cotton Lined',
    rental3: 1299,
    rental5: 1799,
    rental7: 2299,
    retail: 12000,
    savePercent: 89,
    rating: 4.9,
    reviews: 110,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'outfit-08',
    title: 'Kundan Polki Heritage Bridal Choker & Earrings Set',
    designer: 'Royal Jaipur Artisan Guild',
    category: 'accessories',
    tag: '₹0 With Any Outfit',
    rental3: 0,
    rental5: 0,
    rental7: 0,
    retail: 18500,
    savePercent: 100,
    rating: 5.0,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85'
  }
];

// 2. Hero Slides Data
const HERO_SLIDES = [
  {
    tag: '✨ Sabyasachi & Manish Malhotra Inspired',
    heading: 'Look Like a<br><span class="highlight-gold">Bridal Dream.</span>',
    sub: 'Royal Lehengas · Handcrafted Zardozi · 2 Complimentary Designer Accessories Included With Every Rental',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=85',
    card: {
      badge: '✨ Bestseller Bridal',
      rating: '4.9',
      reviews: '(142 brides)',
      title: 'Royal Crimson Bridal Lehenga',
      designer: 'Sabyasachi-Inspired Heritage',
      rental: '₹4,999',
      duration: '/ 3 Days Rental',
      retail: '₹65,000 Retail',
      savings: 'Save ₹60,001 (92% Saved)',
      imgUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85'
    }
  },
  {
    tag: '🎩 Wedding Season 2026 Collection',
    heading: 'Groom Like<br><span class="highlight-gold">Royalty.</span>',
    sub: 'Nawab Sherwanis · Royal Bandhgalas · Indo-Western Sets with Safa & Brooches Included Free',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1800&q=85',
    card: {
      badge: '🎩 Groom Favorite',
      rating: '4.9',
      reviews: '(98 grooms)',
      title: 'Royal Ivory Zari Sherwani',
      designer: 'Tarun Tahiliani Inspired',
      rental: '₹3,499',
      duration: '/ 3 Days Rental',
      retail: '₹42,000 Retail',
      savings: 'Save ₹38,501 (91% Saved)',
      imgUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85'
    }
  },
  {
    tag: '🏔️ Himalayan Hiking & Travel Gear',
    heading: 'Conquer Mountain<br><span class="highlight-gold">Trails & Peaks.</span>',
    sub: 'Waterproof Gore-Tex Shells · Down Puffers · High-Ankle Boots · 65L Expedition Packs on Rent',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85',
    card: {
      badge: '🏔️ Expedition Ready',
      rating: '4.9',
      reviews: '(520+ trekkers)',
      title: '4-Piece Himalayan Expedition Kit',
      designer: 'North Face & Columbia Gear',
      rental: '₹1,899',
      duration: '/ 3 Days Rental',
      retail: '₹28,500 Retail',
      savings: 'Save ₹26,601 (93% Saved)',
      imgUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=85'
    }
  },
  {
    tag: '🎉 Sangeet · Navratri · Diwali Celebrations',
    heading: 'Festival Fashion,<br><span class="highlight-gold">Rented Smart.</span>',
    sub: 'Designer Anarkalis · Mirror-Work Shararas · Gowns · Free Handcrafted Jewelry Included',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1800&q=85',
    card: {
      badge: '🎉 Trending Festive',
      rating: '4.8',
      reviews: '(184 reviews)',
      title: 'Mirror-Work Festive Sharara Set',
      designer: 'Abhinav Mishra Inspired',
      rental: '₹2,199',
      duration: '/ 3 Days Rental',
      retail: '₹24,000 Retail',
      savings: 'Save ₹21,801 (90% Saved)',
      imgUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85'
    }
  }
];

let currentSlideIndex = 0;
let slideIntervalTimer = null;
let currentModalOutfit = null;
let currentModalDuration = 3;
let cartItemsCount = 0;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  renderClothesCatalogue('all');
  initFilterChips();
  initMobileMenu();
  initSearchShortcut();
});

// --- 1. Hero Slider Logic ---
function initHeroSlider() {
  const heroBg = document.getElementById('heroBg');
  const tabs = document.querySelectorAll('.hero-tab');

  // Set initial background
  setSlide(0);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const slideIdx = parseInt(tab.getAttribute('data-slide'));
      setSlide(slideIdx);
      restartTimer();
    });
  });

  restartTimer();
}

function setSlide(index) {
  currentSlideIndex = index;
  const slide = HERO_SLIDES[index];
  if (!slide) return;

  // Update tabs active state
  document.querySelectorAll('.hero-tab').forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });

  // Update Hero background
  const heroBg = document.getElementById('heroBg');
  if (heroBg) {
    heroBg.style.backgroundImage = `url('${slide.image}')`;
  }

  // Update text
  document.getElementById('heroTagText').innerText = slide.tag;
  document.getElementById('heroHeading').innerHTML = slide.heading;
  document.getElementById('heroSub').innerText = slide.sub;

  // Update Preview Card
  document.getElementById('cardBadge').innerText = slide.card.badge;
  document.getElementById('cardRating').innerText = slide.card.rating;
  document.getElementById('cardReviews').innerText = slide.card.reviews;
  document.getElementById('cardTitle').innerText = slide.card.title;
  document.getElementById('cardDesigner').innerText = slide.card.designer;
  document.getElementById('cardRental').innerText = slide.card.rental;
  document.getElementById('cardDuration').innerText = slide.card.duration;
  document.getElementById('cardRetail').innerText = slide.card.retail;
  document.getElementById('cardSavings').innerHTML = `<span class="green-dot"></span> ${slide.card.savings}`;
}

function restartTimer() {
  if (slideIntervalTimer) clearInterval(slideIntervalTimer);
  slideIntervalTimer = setInterval(() => {
    const nextIdx = (currentSlideIndex + 1) % HERO_SLIDES.length;
    setSlide(nextIdx);
  }, 6000);
}

// --- 2. Clothes Catalogue Render ---
function renderClothesCatalogue(filter = 'all') {
  const container = document.getElementById('clothesGrid');
  if (!container) return;

  const filtered = filter === 'all' 
    ? CLOTHES_DATABASE 
    : CLOTHES_DATABASE.filter(item => item.category === filter);

  container.innerHTML = filtered.map(item => `
    <div class="outfit-card">
      <div class="outfit-img-wrap">
        <img src="${item.image}" alt="${item.title}" class="outfit-img" loading="lazy">
        <span class="outfit-top-tag">${item.tag}</span>
        <span class="outfit-save-tag">Save ${item.savePercent}%</span>
        <div class="outfit-gift-badge">🎁 2 Free Accessories Auto-Bundled</div>
      </div>
      <div class="outfit-body">
        <div class="outfit-designer-row">
          <span class="outfit-designer">${item.designer}</span>
          <span class="outfit-stars">★ ${item.rating} (${item.reviews})</span>
        </div>
        <h3 class="outfit-title">${item.title}</h3>
        <div class="outfit-price-row">
          <span class="outfit-rental">₹${item.rental3.toLocaleString()}</span>
          <span class="outfit-duration">/ 3 days</span>
          <span class="outfit-retail">₹${item.retail.toLocaleString()}</span>
        </div>
        <button class="btn-rent-outfit" onclick="openBookingModal('${item.title}', ${item.rental3}, ${item.retail}, '${item.image}')">
          <span>Rent This Outfit</span>
          <span>→</span>
        </button>
      </div>
    </div>
  `).join('');
}

// --- Filter Chips Event ---
function initFilterChips() {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-filter');
      renderClothesCatalogue(filter);
    });
  });
}

function filterCategory(cat) {
  const targetChip = document.querySelector(`.filter-chip[data-filter="${cat}"]`);
  if (targetChip) {
    targetChip.click();
  }
  const clothesSection = document.getElementById('clothes-catalog');
  if (clothesSection) {
    clothesSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- 3. Interactive Quick Rent Modal ---
function openBookingModal(title, baseRent, retail, imgUrl) {
  currentModalOutfit = {
    title,
    baseRent: parseInt(baseRent),
    retail: parseInt(retail),
    imgUrl
  };
  currentModalDuration = 3;

  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalRental').innerText = `₹${parseInt(baseRent).toLocaleString()}`;
  document.getElementById('modalRetail').innerText = `₹${parseInt(retail).toLocaleString()} Retail`;
  document.getElementById('modalImg').src = imgUrl;

  updateModalPrice();

  // Reset duration pills
  document.querySelectorAll('.duration-pill').forEach((pill, i) => {
    pill.classList.toggle('active', i === 0);
  });

  const modal = document.getElementById('bookingModal');
  modal.classList.add('active');
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  modal.classList.remove('active');
}

function setDuration(days) {
  currentModalDuration = days;
  document.querySelectorAll('.duration-pill').forEach(pill => {
    const isThis = pill.innerText.includes(`${days} Days`);
    pill.classList.toggle('active', isThis);
  });
  updateModalPrice();
}

function updateModalPrice() {
  if (!currentModalOutfit) return;
  let multiplier = 1;
  if (currentModalDuration === 5) multiplier = 1.4;
  if (currentModalDuration === 7) multiplier = 1.8;

  const total = Math.round(currentModalOutfit.baseRent * multiplier);
  document.getElementById('modalTotal').innerText = total.toLocaleString();
  document.getElementById('modalRental').innerText = `₹${total.toLocaleString()}`;
}

function confirmBooking() {
  cartItemsCount++;
  document.getElementById('cartCount').innerText = cartItemsCount;
  closeBookingModal();
  showToast(`✨ Reserved "${currentModalOutfit.title}" for ${currentModalDuration} days with 2 free accessories!`);
}

// --- 4. Toast Notifications ---
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// --- 5. Mobile Menu Toggle ---
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }
}

// --- 6. Search shortcut (Cmd+K) ---
function initSearchShortcut() {
  const btnSearch = document.getElementById('btnSearch');
  if (btnSearch) {
    btnSearch.addEventListener('click', () => {
      filterCategory('all');
      showToast('🔍 Showing all 500+ curated designer outfits & adventure gear!');
    });
  }

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      filterCategory('all');
      showToast('🔍 Showing all 500+ curated designer outfits & adventure gear!');
    }
  });
}
