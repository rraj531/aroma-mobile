/* =====================================================
   PRODUCT DATABASE
===================================================== */

const products = [
  {
    id: 1,
    brand: "Samsung",
    name: "Samsung Galaxy S25",
    category: "Mobile",
    price: 74999,
    mrp: 79999,
    rating: 4.5,
    stock: true,
    image: "images/Samsung.jpg.jpg",
    video: "videos/samsung-s25.mp4",
  },

  {
    id: 2,
    brand: "Samsung",
    name: "Samsung Galaxy A56 5G",
    category: "Mobile",
    price: 41999,
    mrp: 45999,
    rating: 4.5,
    stock: true,
    image: "images/samsung-a56.jpg",
    video: "videos/samsung-a56.mp4",
  },

  {
    id: 3,
    brand: "Redmi",
    name: "Redmi Note 17",
    category: "Mobile",
    price: 23999,
    mrp: 26999,
    rating: 4.6,
    stock: true,
    image: "images/redmi-note-17.jpg",
    video: "videos/redmi-note-17.mp4",
  },

  {
    id: 4,
    brand: "Apple",
    name: "iPhone 17",
    category: "Mobile",
    price: 79999,
    mrp: 84999,
    rating: 4.8,
    stock: true,
    image: "images/iphone-17.jpg",
    video: "videos/iphone-17.mp4",
  },

  {
    id: 5,
    brand: "OnePlus",
    name: "OnePlus 13R",
    category: "Mobile",
    price: 42999,
    mrp: 46999,
    rating: 4.6,
    stock: true,
    image: "images/oneplus-13r.jpg",
    video: "videos/oneplus-13r.mp4",
  },

  {
    id: 6,
    brand: "Oppo",
    name: "Oppo F33 Pro",
    category: "Mobile",
    price: 29999,
    mrp: 32999,
    rating: 4.5,
    stock: true,
    image: "images/oppo-f33-pro.jpg",
    video: "videos/oppo-f33-pro.mp4",
  },

  {
    id: 7,
    brand: "Vivo",
    name: "Vivo V60",
    category: "Mobile",
    price: 39999,
    mrp: 43999,
    rating: 4.5,
    stock: true,
    image: "images/vivo-v60.jpg",
    video: "videos/vivo-v60.mp4",
  },

  {
    id: 8,
    brand: "Realme",
    name: "Realme 16 Pro",
    category: "Mobile",
    price: 27999,
    mrp: 30999,
    rating: 4.4,
    stock: true,
    image: "images/realme-16-pro.jpg",
    video: "videos/realme-16-pro.mp4",
  },

  {
    id: 9,
    brand: "Nothing",
    name: "Nothing Phone 4",
    category: "Mobile",
    price: 44999,
    mrp: 48999,
    rating: 4.6,
    stock: true,
    image: "images/nothing-phone-4.jpg",
    video: "videos/nothing-phone-4.mp4",
  },

  {
    id: 10,
    brand: "Samsung",
    name: "Samsung 55 Inch 4K Smart TV",
    category: "TV",
    price: 54999,
    mrp: 64999,
    rating: 4.5,
    stock: true,
    image: "images/samsung-tv.jpg",
    video: "videos/samsung-tv.mp4",
  },

  {
    id: 11,
    brand: "LG",
    name: "LG 43 Inch 4K Smart TV",
    category: "TV",
    price: 39999,
    mrp: 46999,
    rating: 4.4,
    stock: true,
    image: "images/lg-tv.jpg",
    video: "videos/lg-tv.mp4",
  },

  {
    id: 12,
    brand: "LG",
    name: "LG 1.5 Ton 5 Star Inverter AC",
    category: "AC",
    price: 42999,
    mrp: 47999,
    rating: 4.5,
    stock: true,
    image: "images/lg-ac.jpg",
    video: "videos/lg-ac.mp4",
  },

  {
    id: 13,
    brand: "Samsung",
    name: "Samsung 1.5 Ton 5 Star AC",
    category: "AC",
    price: 44999,
    mrp: 49999,
    rating: 4.5,
    stock: true,
    image: "images/samsung-ac.jpg",
    video: "videos/samsung-ac.mp4",
  },

  {
    id: 14,
    brand: "HP",
    name: "HP 15s Intel Core i5 Laptop",
    category: "Laptop",
    price: 52999,
    mrp: 57999,
    rating: 4.5,
    stock: true,
    image: "images/dell-laptop.jpg",
    video: "videos/hp-laptop.mp4",
  },

  {
    id: 15,
    brand: "Dell",
    name: "Dell Inspiron 15 Laptop",
    category: "Laptop",
    price: 56999,
    mrp: 61999,
    rating: 4.4,
    stock: true,
    image: "images/dell-laptop.jpg",
    video: "videos/dell-laptop.mp4",
  },

  {
    id: 16,
    brand: "Lenovo",
    name: "Lenovo IdeaPad Slim 5",
    category: "Laptop",
    price: 61999,
    mrp: 67999,
    rating: 4.6,
    stock: true,
    image: "images/lenovo-laptop.jpg",
    video: "videos/lenovo-laptop.mp4",
  },

  {
    id: 17,
    brand: "LG",
    name: "LG 260 L Double Door Refrigerator",
    category: "Refrigerator",
    price: 32999,
    mrp: 36999,
    rating: 4.5,
    stock: true,
    image: "images/lg-fridge.jpg",
    video: "videos/lg-fridge.mp4",
  },

  {
    id: 18,
    brand: "Samsung",
    name: "Samsung 8 Kg Front Load Washing Machine",
    category: "Washing Machine",
    price: 29990,
    mrp: 38900,
    rating: 4.4,
    stock: true,
    image: "images/samsung-washing-machine.jpg",
    video: "videos/samsung-washing-machine.mp4",
  },

  {
    id: 19,
    brand: "LG",
    name: "LG 8 Kg Front Load Washing Machine",
    category: "Washing Machine",
    price: 31999,
    mrp: 39999,
    rating: 4.5,
    stock: true,
    image: "images/lg-washing-machine.jpg",
    video: "videos/lg-washing-machine.mp4",
  },

  {
    id: 20,
    brand: "Boat",
    name: "Boat Bluetooth Speaker",
    category: "Speaker",
    price: 2999,
    mrp: 3999,
    rating: 4.4,
    stock: true,
    image: "images/boat-speaker.jpg",
    video: "videos/boat-speaker.mp4",
  },

  {
    id: 21,
    brand: "Intex",
    name: "Intex Party Speaker",
    category: "Speaker",
    price: 4999,
    mrp: 5999,
    rating: 4.3,
    stock: true,
    image: "images/intex-speaker.jpg",
    video: "videos/intex-speaker.mp4",
  },

  {
    id: 22,
    brand: "Boat",
    name: "Boat Wireless Earbuds",
    category: "Accessories",
    price: 1499,
    mrp: 1999,
    rating: 4.4,
    stock: true,
    image: "images/boat-earbuds.jpg",
    video: "videos/boat-earbuds.mp4",
  },

  {
    id: 23,
    brand: "Samsung",
    name: "Samsung 25W Fast Charger",
    category: "Accessories",
    price: 999,
    mrp: 1299,
    rating: 4.5,
    stock: true,
    image: "images/samsung-charger.jpg",
    video: "videos/samsung-charger.mp4",
  },

  {
    id: 24,
    brand: "Voltas",
    name: "Voltas 1.5 Ton 5 Star AC",
    category: "AC",
    price: 39999,
    mrp: 44999,
    rating: 4.4,
    stock: true,
    image: "images/voltas5starac.jpg.jpg",
    video: "videos/voltas-ac.mp4",
  },

  {
    id: 25,
    brand: "Symphony",
    name: "Symphony Air Cooler",
    category: "Cooler",
    price: 10999,
    mrp: 12999,
    rating: 4.3,
    stock: true,
    image: "images/symphony-cooler.jpg",
    video: "videos/symphony-cooler.mp4",
  },
];

const heroOffers = [
  {
    image: "images/samsung-a56.jpg",
    title: "AROMA MOBILE & ELECTRONICS",
    heading: "Latest Smartphones",
    subtitle: "7 Premium Gifts FREE",
    price: "Starting ₹20,000",
    badge: "LIMITED TIME",
    button: "SHOP MOBILES",
    category: "Mobile",
  },
  {
    image: "images/iphone-17.jpg",
    title: "BIG SMARTPHONE OFFER",
    heading: "0% Down Payment",
    subtitle: "Instant Cashback + Free Gifts",
    price: "On selected smartphones",
    badge: "EASY EMI",
    button: "EXPLORE PHONES",
    category: "Mobile",
  },
  {
    image: "images/lg-ac.jpg",
    title: "HOME APPLIANCE OFFER",
    heading: "Cool homes. Better prices.",
    subtitle: "AC • TV • Refrigerator • Washing Machine",
    price: "Special festival prices",
    badge: "HOME ESSENTIALS",
    button: "SHOP APPLIANCES",
    category: "AC",
  },
  {
    image: "images/hp-laptop.jpg",
    title: "AROMA SPECIAL OFFER",
    heading: "Phones above ₹25,000",
    subtitle: "Trolley Bag FREE on select purchases",
    price: "Upgrade today",
    badge: "AROMA EXCLUSIVE",
    button: "SHOP NOW",
    category: "Laptop",
  },
];

const bankOffers = [
  {
    bank: "HDFC BANK",
    discount: "10% Instant Discount",
    maximum: "Up to ₹5,000",
  },
  {
    bank: "ICICI BANK",
    discount: "5% Instant Discount",
    maximum: "Up to ₹7,500",
  },
  { bank: "SBI CARD", discount: "Instant Discount", maximum: "Up to ₹5,000" },
  {
    bank: "AXIS BANK",
    discount: "Cashback on select cards",
    maximum: "Up to ₹7,000",
  },
  {
    bank: "YES BANK",
    discount: "5% Instant Discount",
    maximum: "Up to ₹2,500",
  },
  {
    bank: "IDFC FIRST BANK",
    discount: "Special card discount",
    maximum: "Up to ₹10,000",
  },
  {
    bank: "BOB CARD",
    discount: "Special Card Offer",
    maximum: "On select products",
  },
];

const categoryShowcase = [
  { name: "Mobiles", category: "Mobile", image: "images/samsung-a56.jpg" },
  {
    name: "Washing Machines",
    category: "Washing Machine",
    image: "images/lg-washing-machine.jpg",
  },
  { name: "Air Conditioners", category: "AC", image: "images/lg-ac.jpg" },
  { name: "Televisions", category: "TV", image: "images/samsung-tv.jpg" },
  { name: "Laptops", category: "Laptop", image: "images/dell-laptop.jpg" },
  {
    name: "Refrigerators",
    category: "Refrigerator",
    image: "images/lg-fridge.jpg",
  },
  { name: "Speakers", category: "Speaker", image: "images/boat-speaker.jpg" },
  {
    name: "Accessories",
    category: "Accessories",
    image: "images/boat-earbuds.jpg",
  },
  { name: "Coolers", category: "Cooler", image: "images/symphony-cooler.jpg" },
];

let activeHeroSlide = 0;
let heroTimer;
let bankTimer;

function renderHeroOffers() {
  const slides = document.getElementById("heroSlides");
  const dots = document.getElementById("heroDots");
  if (!slides || !dots) return;

  slides.innerHTML = heroOffers
    .map(
      (offer, index) => `
        <article class="hero-slide ${index === 0 ? "is-active" : ""}" style="--hero-image: url('${offer.image}');">
            <div class="hero-copy">
                <span class="hero-badge">${offer.badge}</span>
                <p class="hero-kicker">${offer.title}</p>
                <h2>${offer.heading}</h2>
                <p class="hero-subtitle">${offer.subtitle}</p>
                <strong class="hero-price">${offer.price}</strong>
                <button class="hero-cta" type="button" onclick="shopHeroOffer('${offer.category}')">${offer.button} <span aria-hidden="true">&#8594;</span></button>
            </div>
            <div class="hero-product-art"><img src="${offer.image}" alt="${offer.heading}" loading="${index === 0 ? "eager" : "lazy"}"></div>
        </article>
    `,
    )
    .join("");

  dots.innerHTML = heroOffers
    .map(
      (offer, index) => `
        <button class="hero-dot ${index === 0 ? "is-active" : ""}" type="button" aria-label="Open offer ${index + 1}" aria-pressed="${index === 0}" onclick="goToHeroSlide(${index})"></button>
    `,
    )
    .join("");
}

function goToHeroSlide(index) {
  activeHeroSlide = (index + heroOffers.length) % heroOffers.length;
  document
    .querySelectorAll(".hero-slide")
    .forEach((slide, slideIndex) =>
      slide.classList.toggle("is-active", slideIndex === activeHeroSlide),
    );
  document.querySelectorAll(".hero-dot").forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeHeroSlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });
}

function changeHeroSlide(direction) {
  goToHeroSlide(activeHeroSlide + direction);
}

function startHeroAutoSlide() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => changeHeroSlide(1), 10000);
}

function shopHeroOffer(category) {
  filterCategory(category);
  document
    .querySelector(".shop-layout")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderBankOffers() {
  const container = document.getElementById("bankOffers");
  if (!container) return;
  container.innerHTML = bankOffers
    .map(
      (offer) => `
        <article class="bank-offer-card">
            <div class="bank-mark">${offer.bank}</div>
            <p>${offer.discount}</p>
            <strong>${offer.maximum}</strong>
            <small>*T&amp;C Apply</small>
        </article>
    `,
    )
    .join("");
}

function renderCategoryShowcase() {
  const container = document.getElementById("categoryShowcaseItems");
  if (!container) return;
  container.innerHTML = categoryShowcase
    .map(
      (item) => `
        <button class="category-showcase-card" type="button" onclick="filterCategory('${item.category}')">
            <span class="category-image"><img src="${item.image}" alt="${item.name}" loading="lazy"></span>
            <strong>${item.name}</strong>
            <span>Shop now &#8594;</span>
        </button>
    `,
    )
    .join("");
}

function setupOfferCarousels() {
  const hero = document.getElementById("heroOfferSlider");
  const bankTrack = document.getElementById("bankOffers");
  if (!hero || !bankTrack) return;

  document
    .getElementById("heroPrev")
    .addEventListener("click", () => changeHeroSlide(-1));
  document
    .getElementById("heroNext")
    .addEventListener("click", () => changeHeroSlide(1));
  hero.addEventListener("mouseenter", () => clearInterval(heroTimer));
  hero.addEventListener("mouseleave", startHeroAutoSlide);

  const bankScrollAmount = () => {
    const card = bankTrack.querySelector(".bank-offer-card");
    return card
      ? card.getBoundingClientRect().width + 14
      : bankTrack.clientWidth;
  };
  document
    .getElementById("bankPrev")
    .addEventListener("click", () =>
      bankTrack.scrollBy({ left: -bankScrollAmount(), behavior: "smooth" }),
    );
  document
    .getElementById("bankNext")
    .addEventListener("click", () =>
      bankTrack.scrollBy({ left: bankScrollAmount(), behavior: "smooth" }),
    );

  const moveBank = () =>
    bankTrack.scrollBy({ left: bankScrollAmount(), behavior: "smooth" });
  bankTimer = setInterval(moveBank, 4500);
  bankTrack.addEventListener("mouseenter", () => clearInterval(bankTimer));
  bankTrack.addEventListener("mouseleave", () => {
    clearInterval(bankTimer);
    bankTimer = setInterval(moveBank, 4500);
  });
}

const showroomVideos = [
  {
    title: "AROMA Mobile & Electronics",
    description: "Take a look inside our mobile and electronics showroom.",
    video: "videos/Aroma Mobile & Electronic.mp4",
  },
  {
    title: "Giveaway Offer",
    description: "See the latest offers and special deals at AROMA.",
    video: "videos/Giveway Offer.mp4",
  },
  {
    title: "Aroma Showroom Video",
    description:
      "Explore products and the latest electronics available in store.",
    video: "videos/Aroma.mp4",
  },
  {
    title: "Samsung Mobile Showroom",
    description: "Explore Samsung smartphones available at AROMA.",
    video: "videos/samsung-showroom.mp4",
  },
  {
    title: "Redmi Mobile Showroom",
    description: "Discover Redmi smartphones and current showroom offers.",
    video: "videos/redmi-showroom.mp4",
  },
  {
    title: "Oppo Mobile Showroom",
    description: "See the latest Oppo smartphones available in store.",
    video: "videos/oppo-showroom.mp4",
  },
  {
    title: "Vivo Mobile Showroom",
    description: "Explore Vivo phones and features at AROMA.",
    video: "videos/vivo-showroom.mp4",
  },
  {
    title: "iPhone Showroom",
    description: "Take a look at the iPhone range available in store.",
    video: "videos/iphone-showroom.mp4",
  },
  {
    title: "Accessories Showroom",
    description: "Explore chargers, earbuds, speakers and more.",
    video: "videos/accessories-showroom.mp4",
  },
  {
    title: "AC Showroom",
    description: "Compare cooling options for your home.",
    video: "videos/ac-showroom.mp4",
  },
  {
    title: "TV Showroom",
    description: "Explore televisions and home entertainment products.",
    video: "videos/tv-showroom.mp4",
  },
  {
    title: "Laptop Showroom",
    description: "Find laptops for work, study and everyday use.",
    video: "videos/laptop-showroom.mp4",
  },
  {
    title: "Electronics Showroom",
    description: "See more electronics available at AROMA.",
    video: "videos/electronics-showroom.mp4",
  },
];

function handleVideoError(element) {
  const video = element.matches("video") ? element : element.closest("video");
  const frame = element.closest(".video-frame");
  if (!frame) return;

  if (video) video.style.display = "none";
  const missingMessage = frame.querySelector(".video-missing-message");
  if (missingMessage) {
    missingMessage.style.display = "flex";
    missingMessage.querySelector("strong").innerText = "Video coming soon";
    missingMessage.querySelector("span").innerText =
      "This showroom video will be available soon.";
  }
}

function renderShowroomVideos() {
  const container = document.getElementById("showroomVideos");
  if (!container) return;

  container.innerHTML = showroomVideos
    .map(
      (item) => `
        <article class="showroom-video-card">
            <div class="video-frame">
                <video src="${item.video}" controls preload="metadata" muted playsinline onerror="handleVideoError(this)"></video>
                <div class="video-missing-message">
                    <strong>Video coming soon</strong>
                    <span>This showroom video will be available soon.</span>
                </div>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </article>
    `,
    )
    .join("");

  container.querySelectorAll("video").forEach((video) => {
    video.muted = true;
    video.addEventListener("loadedmetadata", () => {
      video.closest(".video-frame").classList.add("video-ready");
    });
  });
}

function setupShowroomSlider() {
  const container = document.getElementById("showroomVideos");
  const previousButton = document.getElementById("showroomPrev");
  const nextButton = document.getElementById("showroomNext");
  if (!container || !previousButton || !nextButton) return;

  const scrollAmount = () => {
    const card = container.querySelector(".showroom-video-card");
    return card
      ? card.getBoundingClientRect().width + 20
      : container.clientWidth;
  };
  previousButton.addEventListener("click", () =>
    container.scrollBy({ left: -scrollAmount(), behavior: "smooth" }),
  );
  nextButton.addEventListener("click", () =>
    container.scrollBy({ left: scrollAmount(), behavior: "smooth" }),
  );

  let pointerStart = 0;
  let startScroll = 0;
  container.addEventListener("pointerdown", (event) => {
    pointerStart = event.clientX;
    startScroll = container.scrollLeft;
    container.setPointerCapture(event.pointerId);
    container.classList.add("is-dragging");
  });
  container.addEventListener("pointermove", (event) => {
    if (!container.classList.contains("is-dragging")) return;
    container.scrollLeft = startScroll - (event.clientX - pointerStart);
  });
  container.addEventListener("pointerup", () =>
    container.classList.remove("is-dragging"),
  );
  container.addEventListener("pointercancel", () =>
    container.classList.remove("is-dragging"),
  );
}

/* =====================================================
   LOCAL STORAGE
===================================================== */

let cart = JSON.parse(localStorage.getItem("aromaCart")) || [];

let wishlist = JSON.parse(localStorage.getItem("aromaWishlist")) || [];

let currentUser = null;
let accountAuthMode = "login";

let recentlyViewed =
  JSON.parse(localStorage.getItem("aromaRecentlyViewed")) || [];

/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts(productList) {
  const container = document.getElementById("productContainer");

  container.innerHTML = "";

  if (productList.length === 0) {
    container.innerHTML = `

            <div class="no-products">

                <h2>
                    😔 No Products Found
                </h2>

                <p>
                    Try another search or filter.
                </p>

            </div>

        `;

    updateProductCount(0);

    return;
  }

  productList.forEach((product) => {
    const discount = Math.round(
      ((product.mrp - product.price) / product.mrp) * 100,
    );

    const isWishlisted = wishlist.includes(product.id);

    const card = document.createElement("div");

    card.className = "product-card";

    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      showProductDetails(product.id);
    });

    card.innerHTML = `

            <div class="product-image-container">

                <button
                    class="wishlist-btn"
                    onclick="toggleWishlist(${product.id})"
                >
                    ${isWishlisted ? "❤️" : "♡"}
                </button>


                <span class="product-badge">
                    ${discount}% OFF
                </span>


                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                >


                <div
                    class="image-fallback"
                    style="display:none;"
                >
                    📦
                </div>

            </div>


            <div class="product-info">

                <div class="product-brand">
                    ${product.brand}
                </div>


                <h3
                    class="product-name"
                >
                    ${product.name}
                </h3>


                <div class="rating">

                    ⭐ ${product.rating}

                </div>


                <div class="price-row">

                    <strong>
                        ₹${product.price.toLocaleString("en-IN")}
                    </strong>

                    <del>
                        ₹${product.mrp.toLocaleString("en-IN")}
                    </del>

                    <span>
                        ${discount}% OFF
                    </span>

                </div>


                <p class="stock-status">

                    ${product.stock ? "🟢 In Stock" : "🔴 Out of Stock"}

                </p>


                <div class="product-buttons">

                    <button
                        onclick="addToCart(${product.id})"
                        ${!product.stock ? "disabled" : ""}
                    >
                        🛒 Add to Cart
                    </button>


                    <button
                        onclick="buyNow(${product.id})"
                        ${!product.stock ? "disabled" : ""}
                    >
                        Buy Now
                    </button>

                </div>

            </div>

        `;

    container.appendChild(card);
  });

  updateProductCount(productList.length);
}

/* =====================================================
   PRODUCT COUNT
===================================================== */

function updateProductCount(count) {
  document.getElementById("productCount").innerText =
    `${count} product${count === 1 ? "" : "s"} available`;
}

/* =====================================================
   CATEGORY FILTER
===================================================== */

function filterCategory(category) {
  document.getElementById("searchInput").value = "";

  clearFilterCheckboxes();

  let result;

  if (category === "All") {
    result = products;

    document.getElementById("pageTitle").innerText = "All Products";
  } else {
    result = products.filter((product) => product.category === category);

    document.getElementById("pageTitle").innerText = category;
  }

  displayProducts(result);
}

/* =====================================================
   SEARCH
===================================================== */

function searchProducts() {
  const search = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  if (search === "") {
    displayProducts(products);

    document.getElementById("pageTitle").innerText = "All Products";

    return;
  }

  const result = products.filter((product) =>
    productMatchesSearch(product, search),
  );

  document.getElementById("pageTitle").innerText = `Search: ${search}`;

  displayProducts(result);
}

function productMatchesSearch(product, search) {
  const searchableText =
    `${product.name} ${product.brand} ${product.category}`.toLowerCase();
  return search.split(/\s+/).every((term) => searchableText.includes(term));
}

/* =====================================================
   FILTER SYSTEM
===================================================== */

function applyFilters() {
  const selectedBrands = Array.from(
    document.querySelectorAll(".brand-filter:checked"),
  ).map((checkbox) => checkbox.value);

  const selectedPrices = Array.from(
    document.querySelectorAll(".price-filter:checked"),
  ).map((checkbox) => checkbox.value);

  const ratingChecked = document.getElementById("ratingFilter").checked;

  const stockChecked = document.getElementById("stockFilter").checked;

  let result = products.filter((product) => {
    /* BRAND */

    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    /* PRICE */

    if (selectedPrices.length > 0) {
      const priceMatch = selectedPrices.some((range) => {
        const [minimum, maximum] = range.split("-").map(Number);

        return product.price >= minimum && product.price <= maximum;
      });

      if (!priceMatch) {
        return false;
      }
    }

    /* RATING */

    if (ratingChecked && product.rating < 4) {
      return false;
    }

    /* STOCK */

    if (stockChecked && product.stock !== true) {
      return false;
    }

    return true;
  });

  document.getElementById("pageTitle").innerText = "Filtered Products";

  displayProducts(result);
}

/* =====================================================
   CLEAR FILTERS
===================================================== */

function clearFilters() {
  clearFilterCheckboxes();

  document.getElementById("searchInput").value = "";

  document.getElementById("pageTitle").innerText = "All Products";

  displayProducts(products);
}

function clearFilterCheckboxes() {
  document
    .querySelectorAll(".brand-filter, .price-filter")
    .forEach((checkbox) => (checkbox.checked = false));

  document.getElementById("ratingFilter").checked = false;

  document.getElementById("stockFilter").checked = false;
}

/* =====================================================
   CART
===================================================== */

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  if (!product.stock) {
    alert("This product is currently out of stock.");

    return;
  }

  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,

      name: product.name,

      brand: product.brand,

      price: product.price,

      image: product.image,

      quantity: 1,
    });
  }

  saveCart();

  alert("🛒 Product added to cart!");
}

function saveCart() {
  localStorage.setItem("aromaCart", JSON.stringify(cart));

  updateCartCount();
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  document.getElementById("cartCount").innerText = count;
}

/* =====================================================
   OPEN CART
===================================================== */

function openCart() {
  let html = `
        <h2>🛒 My Cart</h2>
    `;

  if (cart.length === 0) {
    html += `

            <div class="detail-card">

                <h3>
                    Your Cart is Empty
                </h3>

                <p>
                    Add products to your cart.
                </p>

            </div>

        `;
  } else {
    cart.forEach((item) => {
      html += `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        width="80"
                        alt="${item.name}"
                    >


                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ₹${item.price.toLocaleString("en-IN")}
                        </p>


                        <div>

                            <button
                                onclick="changeQuantity(${item.id}, -1)"
                            >
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                onclick="changeQuantity(${item.id}, 1)"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${item.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;
    });

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    html += `

            <hr>

            <h2>
                Total:
                ₹${total.toLocaleString("en-IN")}
            </h2>


            <button
                class="checkout-btn"
                onclick="checkout()"
            >
                Proceed to Checkout
            </button>

        `;
  }

  document.getElementById("cartContent").innerHTML = html;

  document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function changeQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((item) => item.id !== productId);
  }

  saveCart();

  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);

  saveCart();

  openCart();
}

/* =====================================================
   CHECKOUT
===================================================== */

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");

    return;
  }

  if (!currentUser) {
    alert("Please login before checkout.");

    closeCart();

    openAccount();

    return;
  }

  alert(
    "Order checkout demo.\n\n" +
      "Customer: " +
      currentUser.name +
      "\n\n" +
      "For real payment and order processing, " +
      "a backend/payment gateway is required.",
  );
}

/* =====================================================
   BUY NOW
===================================================== */

function buyNow(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  addToCart(productId);

  openCart();
}

/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);

  if (index === -1) {
    wishlist.push(productId);

    alert("❤️ Product added to Wishlist!");
  } else {
    wishlist.splice(index, 1);

    alert("Product removed from Wishlist.");
  }

  localStorage.setItem("aromaWishlist", JSON.stringify(wishlist));

  updateWishlistCount();

  displayProducts(getCurrentlyDisplayedProducts());
}

function updateWishlistCount() {
  document.getElementById("wishlistCount").innerText = wishlist.length;
}

function getCurrentlyDisplayedProducts() {
  const search = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  if (search !== "") {
    return products.filter((product) => productMatchesSearch(product, search));
  }

  return products;
}

/* =====================================================
   OPEN WISHLIST
===================================================== */

function openWishlist() {
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  let html = `
        <h2>❤️ My Wishlist</h2>
    `;

  if (wishlistProducts.length === 0) {
    html += `

            <div class="detail-card">

                <h3>
                    Your Wishlist is Empty
                </h3>

                <p>
                    Click ❤️ on any product
                    to save it here.
                </p>

            </div>

        `;
  } else {
    wishlistProducts.forEach((product) => {
      html += `

                    <div class="wishlist-item">

                        <img
                            src="${product.image}"
                            width="80"
                            alt="${product.name}"
                        >


                        <div>

                            <h3>
                                ${product.name}
                            </h3>


                            <p>
                                ₹${product.price.toLocaleString("en-IN")}
                            </p>


                            <button
                                class="red-btn"
                                onclick="addToCart(${product.id})"
                            >
                                🛒 Add to Cart
                            </button>


                            <button
                                class="remove-wishlist"
                                onclick="toggleWishlist(${product.id}); openWishlist();"
                            >
                                ❌ Remove
                            </button>

                        </div>

                    </div>

                `;
    });
  }

  showDetails(html);
}

/* =====================================================
   PRODUCT DETAILS
===================================================== */

function showProductDetails(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  addRecentlyViewed(productId);

  const discount = Math.round(
    ((product.mrp - product.price) / product.mrp) * 100,
  );

  document.getElementById("productDetailsContent").innerHTML = `

        <div class="product-detail-layout">
            <div class="product-detail-media">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="large-product-image"
                >
            </div>
            <div class="product-detail-info">


        <h2>
            ${product.name}
        </h2>


        <p>
            Brand:
            <strong>
                ${product.brand}
            </strong>
        </p>


        <p>
            ⭐ ${product.rating}
        </p>


        <h2>
            ₹${product.price.toLocaleString("en-IN")}
        </h2>


        <p>

            <del>
                ₹${product.mrp.toLocaleString("en-IN")}
            </del>

            &nbsp;

            <strong>
                ${discount}% OFF
            </strong>

        </p>


        <p>
            ${product.stock ? "🟢 In Stock" : "🔴 Out of Stock"}
        </p>


        <div class="product-detail-actions">

            <button
                onclick="addToCart(${product.id})"
                ${!product.stock ? "disabled" : ""}
            >
                🛒 Add to Cart
            </button>


            <button
                onclick="buyNow(${product.id})"
                ${!product.stock ? "disabled" : ""}
            >
                Buy Now
            </button>


            <button
                onclick="toggleWishlist(${product.id})"
            >
                ❤️ Wishlist
            </button>

        </div>
            </div>
        </div>


        <hr>


        <section class="product-video-section">
            <h3>Product Video</h3>
            <div class="video-frame product-video-frame">
                ${product.video ? `<video src="${product.video}" controls preload="metadata" muted playsinline onerror="handleVideoError(this)"></video>` : ""}
                <div class="video-missing-message" style="display:${product.video ? "none" : "flex"};">
                    <strong>Product video coming soon</strong>
                    <span>We are preparing a showroom video for this product.</span>
                </div>
            </div>
        </section>


        <hr>


        <h3>
            Product Information
        </h3>


        <p>
            ✓ Genuine product
        </p>

        <p>
            ✓ Easy EMI available
        </p>

        <p>
            ✓ Selected products eligible for free delivery
        </p>

        <p>
            ✓ Contact Aroma Mobile & Electronics for availability
        </p>

    `;

  document.getElementById("productModal").style.display = "flex";
}

function closeProductDetails() {
  document.getElementById("productModal").style.display = "none";
}

/* =====================================================
   RECENTLY VIEWED
===================================================== */

function addRecentlyViewed(productId) {
  recentlyViewed = recentlyViewed.filter((id) => id !== productId);

  recentlyViewed.unshift(productId);

  recentlyViewed = recentlyViewed.slice(0, 10);

  localStorage.setItem("aromaRecentlyViewed", JSON.stringify(recentlyViewed));
}

function showRecentlyViewed() {
  const viewed = recentlyViewed
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  let html = `
        <h2>👀 Recently Viewed</h2>
    `;

  if (viewed.length === 0) {
    html += `

            <div class="detail-card">

                <h3>
                    Nothing here yet
                </h3>

                <p>
                    Products you view will appear here.
                </p>

            </div>

        `;
  } else {
    viewed.forEach((product) => {
      html += `

                    <div class="detail-card">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ₹${product.price.toLocaleString("en-IN")}
                        </p>

                        <button
                            class="red-btn"
                            onclick="showProductDetails(${product.id}); closeDetails();"
                        >
                            View Product
                        </button>

                    </div>

                `;
    });
  }

  showDetails(html);
}

/* =====================================================
   OFFERS
===================================================== */

function showOffers() {
  showDetails(`

        <h2>
            🔥 AROMA SPECIAL OFFERS
        </h2>


        <div class="detail-card">

            🎁
            <strong>
                7 Premium Gifts FREE
            </strong>

            <p>
                On selected smartphone purchases.
            </p>

        </div>


        <div class="detail-card">

            💳
            <strong>
                0% Down Payment
            </strong>

            <p>
                Easy EMI available on selected products.
            </p>

        </div>


        <div class="detail-card">

            💰
            <strong>
                Instant Cashback
            </strong>

            <p>
                Selected products and payment methods.
            </p>

        </div>


        <div class="detail-card">

            🚚
            <strong>
                Free Delivery
            </strong>

            <p>
                Available on selected products.
            </p>

        </div>


        <div class="detail-card">

            📺
            <strong>
                TV + DISH TV Offer
            </strong>

            <p>
                Ask Aroma Mobile & Electronics
                for current offer details.
            </p>

        </div>

    `);
}

/* =====================================================
   ACCOUNT
===================================================== */

function openAccount() {
  document.getElementById("accountModal").style.display = "flex";

  setAccountError("");

  if (currentUser) {
    document.getElementById("loginSection").style.display = "none";

    document.getElementById("accountDashboard").style.display = "block";

    document.getElementById("welcomeUser").innerText =
      "👋 Welcome, " + currentUser.name;
  } else {
    document.getElementById("loginSection").style.display = "block";

    document.getElementById("accountDashboard").style.display = "none";
  }
}

function closeAccount() {
  document.getElementById("accountModal").style.display = "none";
}

/* =====================================================
   PROFILE
===================================================== */

function showProfile() {
  if (!currentUser) {
    openAccount();

    return;
  }

  showDetails(`

        <h2>
            👤 My Profile
        </h2>


        <div class="detail-card">

            <h3>
                Name
            </h3>

            <p>
                ${currentUser.name}
            </p>

        </div>


        <div class="detail-card">

            <h3>
                Mobile
            </h3>

            <p>
                ${currentUser.mobile}
            </p>

        </div>

    `);
}

/* =====================================================
   ORDERS
===================================================== */

function showOrders() {
  showDetails(`

        <h2>
            📦 My Orders
        </h2>


        <div class="detail-card">

            <h3>
                No Orders Yet
            </h3>

            <p>
                Your orders will appear here after checkout.
            </p>

        </div>

    `);
}

/* =====================================================
   ADDRESS
===================================================== */

function showAddresses() {
  const savedAddress = localStorage.getItem("aromaAddress");

  showDetails(`

        <h2>
            📍 Saved Addresses
        </h2>


        <div class="detail-card">

            ${
              savedAddress
                ? `
                <h3>
                    Home
                </h3>

                <p>
                    ${savedAddress}
                </p>
                `
                : `
                <h3>
                    No Address Saved
                </h3>

                <p>
                    Add your delivery address.
                </p>
                `
            }

        </div>


        <button
            class="red-btn"
            onclick="addAddress()"
        >
            + Add / Change Address
        </button>

    `);
}

function addAddress() {
  const address = prompt("Enter your complete delivery address:");

  if (!address) return;

  localStorage.setItem("aromaAddress", address);

  alert("📍 Address saved successfully!");

  showAddresses();
}

/* =====================================================
   COUPONS
===================================================== */

function showCoupons() {
  showDetails(`

        <h2>
            🎁 Coupons & Offers
        </h2>


        <div class="detail-card">

            <h3>
                AROMA500
            </h3>

            <p>
                ₹500 OFF on selected products.
            </p>

        </div>


        <div class="detail-card">

            <h3>
                AROMAEMI
            </h3>

            <p>
                Special EMI offers on selected products.
            </p>

        </div>


        <div class="detail-card">

            <h3>
                FESTIVE OFFER
            </h3>

            <p>
                Premium gifts available on selected phones.
            </p>

        </div>

    `);
}

/* =====================================================
   EMI
===================================================== */

function showEMI() {
  showDetails(`

        <h2>
            💳 EMI & Finance
        </h2>


        <div class="detail-card">

            <h3>
                0% Down Payment
            </h3>

            <p>
                Available on selected products
                subject to eligibility.
            </p>

        </div>


        <div class="detail-card">

            <h3>
                Easy EMI
            </h3>

            <p>
                Choose a suitable EMI option
                at the store.
            </p>

        </div>

    `);
}

/* =====================================================
   NOTIFICATIONS
===================================================== */

function showNotifications() {
  showDetails(`

        <h2>
            🔔 Notifications
        </h2>


        <div class="detail-card">

            <h3>
                🔥 New Offers
            </h3>

            <p>
                Check the latest Aroma Mobile
                & Electronics offers.
            </p>

        </div>


        <div class="detail-card">

            <h3>
                🎁 Gift Offers
            </h3>

            <p>
                Premium gifts available on selected phones.
            </p>

        </div>

    `);
}

/* =====================================================
   CUSTOMER SUPPORT
===================================================== */

function contactSupport() {
  const message = "Hello Aroma Mobile & Electronics, I need customer support.";

  const whatsappURL =
    "https://wa.me/919016163636?text=" + encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
}

/* =====================================================
   LOCATION
===================================================== */

function showLocation() {
  showDetails(`

        <h2>
            📍 AROMA Mobile & Electronics
        </h2>


        <div class="detail-card">

            <h3>
                Store Address
            </h3>

            <p>
                20 Deepak Nagar,
                Navagam, Dindoli,
                Surat
            </p>

        </div>


        <div class="detail-card">

            <h3>
                Contact
            </h3>

            <p>
                📞 9016163636
            </p>

        </div>

    `);
}

/* =====================================================
   DETAILS MODAL
===================================================== */

function showDetails(content) {
  document.getElementById("detailsContent").innerHTML = content;

  document.getElementById("detailsModal").style.display = "flex";
}

function closeDetails() {
  document.getElementById("detailsModal").style.display = "none";
}

/* =====================================================
   LOGOUT
===================================================== */

async function logoutUser() {
  if (window.AromaAPI) {
    await window.AromaAPI.auth.logout();
  }

  localStorage.removeItem("aromaUser");
  currentUser = null;
  closeAccount();
  alert("You have been logged out.");
}

/* =====================================================
   LIVE BACKEND API INTEGRATION
===================================================== */

// Async product loader connecting to Backend API
async function loadProductsFromAPI() {
  if (!window.AromaAPI) return;
  try {
    const data = await window.AromaAPI.products.getAll();
    if (data && data.products && data.products.length > 0) {
      console.log("Loaded products from Backend API:", data.products.length);
      displayProducts(data.products);
      return;
    }
  } catch (e) {
    console.warn(
      "Backend API not reachable, falling back to local database:",
      e.message,
    );
  }
  displayProducts(products);
}

function setAccountError(message) {
  const errorElement = document.getElementById("accountError");
  errorElement.textContent = message;
  errorElement.hidden = !message;
}

function toggleAccountMode() {
  accountAuthMode = accountAuthMode === "login" ? "register" : "login";
  const isRegistering = accountAuthMode === "register";
  const nameInput = document.getElementById("loginName");
  const passwordInput = document.getElementById("loginPassword");

  document.getElementById("signupFields").hidden = !isRegistering;
  document.getElementById("accountFormTitle").textContent = isRegistering
    ? "Create account"
    : "Sign in";
  document.getElementById("accountSubmitButton").textContent = isRegistering
    ? "Create account"
    : "Sign in";
  document.getElementById("accountModeToggle").textContent = isRegistering
    ? "Already have an account? Sign in"
    : "Create an account";
  nameInput.required = isRegistering;
  passwordInput.autocomplete = isRegistering
    ? "new-password"
    : "current-password";
  setAccountError("");
}

async function loginUser() {
  const email = document
    .getElementById("loginEmail")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("loginPassword").value;
  const submitButton = document.getElementById("accountSubmitButton");
  const credentials = { email, password };

  if (accountAuthMode === "register") {
    credentials.name = document.getElementById("loginName").value.trim();
    const mobile = document.getElementById("loginMobile").value.trim();
    if (mobile) credentials.mobile = mobile;
  }

  setAccountError("");
  submitButton.disabled = true;

  try {
    if (!window.AromaAPI)
      throw new Error("Account service is unavailable. Please try again.");

    const user =
      accountAuthMode === "register"
        ? await window.AromaAPI.auth.register(credentials)
        : await window.AromaAPI.auth.login(credentials);

    if (!user.token)
      throw new Error("The server did not return a login token.");

    window.AromaAPI.setToken(user.token);
    currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    };
    localStorage.setItem("aromaUser", JSON.stringify(currentUser));
    document.getElementById("loginPassword").value = "";
    openAccount();
  } catch (error) {
    setAccountError(error.message || "Could not sign in. Please try again.");
  } finally {
    submitButton.disabled = false;
  }
}

async function restoreUserSession() {
  if (!window.AromaAPI || !window.AromaAPI.getToken()) {
    localStorage.removeItem("aromaUser");
    return;
  }

  try {
    const user = await window.AromaAPI.auth.getProfile();
    currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    };
    localStorage.setItem("aromaUser", JSON.stringify(currentUser));
  } catch (error) {
    window.AromaAPI.setToken(null);
    localStorage.removeItem("aromaUser");
  }
}

function setupAccountControls() {
  const accountButton = document.querySelector(
    '.header-actions button[aria-label="Account"]',
  );
  const accountForm = document.getElementById("accountForm");
  const modeToggle = document.getElementById("accountModeToggle");
  const closeModalActions = {
    cartModal: closeCart,
    accountModal: closeAccount,
    detailsModal: closeDetails,
    productModal: closeProductDetails,
  };
  const menuActions = [
    showProfile,
    showOrders,
    showAddresses,
    showCoupons,
    showEMI,
    logoutUser,
  ];

  accountButton.removeAttribute("onclick");
  accountButton.addEventListener("click", openAccount);

  document.querySelectorAll(".modal .close-btn").forEach((button) => {
    const modal = button.closest(".modal");
    const closeModal = closeModalActions[modal.id];
    button.removeAttribute("onclick");
    if (closeModal) button.addEventListener("click", closeModal);
  });

  accountForm.removeAttribute("onsubmit");
  accountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginUser();
  });

  modeToggle.removeAttribute("onclick");
  modeToggle.addEventListener("click", toggleAccountMode);

  document
    .querySelectorAll("#accountDashboard .account-menu button")
    .forEach((button, index) => {
      button.removeAttribute("onclick");
      button.addEventListener("click", menuActions[index]);
    });
}

// Live Orders view integration
async function showOrders() {
  if (window.AromaAPI && window.AromaAPI.getToken()) {
    try {
      const res = await window.AromaAPI.orders.getAll();
      if (res && res.orders && res.orders.length > 0) {
        let html = `<h2>📦 My Orders (Live)</h2>`;
        res.orders.forEach((o) => {
          html += `
                    <div class="detail-card">
                        <h3>Order #${o.orderNumber}</h3>
                        <p>Total: <strong>₹${o.totalAmount}</strong> | Status: <span style="color:#007bff">${o.orderStatus}</span></p>
                        <p>Payment: <b>${o.paymentStatus}</b> (${o.paymentMethod.toUpperCase()})</p>
                    </div>`;
        });
        showDetails(html);
        return;
      }
    } catch (err) {
      console.warn("Could not fetch orders from backend:", err.message);
    }
  }

  showDetails(`
        <h2>📦 My Orders</h2>
        <div class="detail-card">
            <h3>No Orders Yet</h3>
            <p>Your orders will appear here after checkout.</p>
        </div>
    `);
}

// Live Coupons view integration
async function showCoupons() {
  if (window.AromaAPI) {
    try {
      const coupons = await window.AromaAPI.coupons.getAvailable();
      if (coupons && coupons.length > 0) {
        let html = `<h2>🎁 Active Coupons & Offers (Live)</h2>`;
        coupons.forEach((c) => {
          html += `
                    <div class="detail-card">
                        <h3>Code: <span style="color:#d9534f">${c.code}</span></h3>
                        <p>Discount: <b>${c.discountType === "fixed" ? "₹" + c.discountValue + " OFF" : c.discountValue + "% OFF"}</b></p>
                        <p><small>Min Order Amount: ₹${c.minOrderAmount}</small></p>
                    </div>`;
        });
        showDetails(html);
        return;
      }
    } catch (err) {
      console.warn("Could not fetch coupons from backend:", err.message);
    }
  }

  showDetails(`
        <h2>🎁 Coupons & Offers</h2>
        <div class="detail-card"><h3>AROMA500</h3><p>₹500 OFF on selected products.</p></div>
        <div class="detail-card"><h3>AROMAEMI</h3><p>Special EMI offers on selected products.</p></div>
        <div class="detail-card"><h3>FESTIVE OFFER</h3><p>Premium gifts available on selected phones.</p></div>
    `);
}

// Live Checkout & Payment Integration
async function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  if (!currentUser) {
    alert("Please login before checkout.");
    closeCart();
    openAccount();
    return;
  }

  const payMethod = confirm(
    "Click OK for Razorpay / Online Payment, or CANCEL for Cash on Delivery (COD).",
  )
    ? "razorpay"
    : "cod";

  if (window.AromaAPI && window.AromaAPI.getToken()) {
    try {
      const cartItemsData = cart.map((item) => ({
        productId: item.id || 1,
        quantity: item.quantity,
        price: item.price,
      }));
      const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const orderRes = await window.AromaAPI.orders.create({
        items: cartItemsData,
        subtotal: subtotal,
        totalAmount: subtotal,
        paymentMethod: payMethod,
        shippingAddress: {
          addressLine1: "20 Deepak Nagar, Navagam, Dindoli",
          city: "Surat",
          state: "Gujarat",
          pincode: "394210",
        },
      });

      if (orderRes && orderRes.order) {
        if (payMethod === "razorpay") {
          alert(
            `Order #${orderRes.order.orderNumber} created successfully! Initiating Razorpay payment...`,
          );
        } else {
          alert(
            `🎉 Order #${orderRes.order.orderNumber} placed successfully with Cash on Delivery!`,
          );
        }
        cart = [];
        localStorage.removeItem("aromaCart");
        updateCartCount();
        closeCart();
        showOrders();
        return;
      }
    } catch (err) {
      console.warn("Backend order creation error:", err.message);
    }
  }

  alert(
    "Order checkout demo.\n\n" +
      "Customer: " +
      currentUser.name +
      "\n" +
      "Payment Method: " +
      payMethod.toUpperCase() +
      "\n\n" +
      "Backend server is ready at http://localhost:5000",
  );
}

/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupAccountControls();
  renderHeroOffers();
  renderBankOffers();
  renderCategoryShowcase();
  setupOfferCarousels();
  goToHeroSlide(0);
  startHeroAutoSlide();

  loadProductsFromAPI();

  renderShowroomVideos();
  setupShowroomSlider();

  updateCartCount();
  updateWishlistCount();

  restoreUserSession();
});

/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

window.addEventListener("click", function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
