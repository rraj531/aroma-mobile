require('dotenv').config({ path: '../.env' });
const sequelize = require('../config/database');
const { Product } = require('../models');

const products = [
  {
    name: "Samsung Galaxy S25",
    brand: "Samsung",
    category: "Mobile",
    price: 999.99,
    mrp: 1199.99,
    rating: 4.8,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/samsung-s25.jpg",
    description: "The latest flagship smartphone from Samsung with AI features.",
    specifications: { "ram": "12GB", "storage": "256GB", "camera": "200MP" }
  },
  {
    name: "Samsung Galaxy A56 5G",
    brand: "Samsung",
    category: "Mobile",
    price: 499.99,
    mrp: 599.99,
    rating: 4.5,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/samsung-a56.jpg",
    description: "Premium mid-range smartphone with 5G connectivity.",
    specifications: { "ram": "8GB", "storage": "128GB", "camera": "50MP" }
  },
  {
    name: "Redmi Note 17",
    brand: "Xiaomi",
    category: "Mobile",
    price: 299.99,
    mrp: 399.99,
    rating: 4.3,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/redmi-note17.jpg",
    description: "Best-in-class performance for everyday use.",
    specifications: { "ram": "6GB", "storage": "128GB", "camera": "108MP" }
  },
  {
    name: "iPhone 17",
    brand: "Apple",
    category: "Mobile",
    price: 1099.99,
    mrp: 1299.99,
    rating: 4.9,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/iphone17.jpg",
    description: "The new iPhone with A18 Bionic chip.",
    specifications: { "ram": "8GB", "storage": "256GB", "camera": "48MP" }
  },
  {
    name: "OnePlus 13R",
    brand: "OnePlus",
    category: "Mobile",
    price: 599.99,
    mrp: 699.99,
    rating: 4.6,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/oneplus-13r.jpg",
    description: "Flagship killer with super fast charging.",
    specifications: { "ram": "12GB", "storage": "256GB", "camera": "50MP" }
  },
  {
    name: "Oppo F33 Pro",
    brand: "Oppo",
    category: "Mobile",
    price: 399.99,
    mrp: 499.99,
    rating: 4.4,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/oppo-f33.jpg",
    description: "Sleek design with amazing selfie camera.",
    specifications: { "ram": "8GB", "storage": "128GB", "camera": "64MP" }
  },
  {
    name: "Vivo V60",
    brand: "Vivo",
    category: "Mobile",
    price: 429.99,
    mrp: 529.99,
    rating: 4.5,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/vivo-v60.jpg",
    description: "Perfect for vlogging and photography.",
    specifications: { "ram": "8GB", "storage": "256GB", "camera": "50MP" }
  },
  {
    name: "Realme 16 Pro",
    brand: "Realme",
    category: "Mobile",
    price: 349.99,
    mrp: 449.99,
    rating: 4.3,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/realme-16pro.jpg",
    description: "Great value for money smartphone.",
    specifications: { "ram": "8GB", "storage": "128GB", "camera": "108MP" }
  },
  {
    name: "Nothing Phone 4",
    brand: "Nothing",
    category: "Mobile",
    price: 649.99,
    mrp: 749.99,
    rating: 4.7,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/nothing-phone4.jpg",
    description: "Unique transparent design with glyph interface.",
    specifications: { "ram": "12GB", "storage": "256GB", "camera": "50MP" }
  },
  {
    name: "Samsung 55\" 4K Smart TV",
    brand: "Samsung",
    category: "TV",
    price: 799.99,
    mrp: 999.99,
    rating: 4.6,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/samsung-tv-55.jpg",
    description: "Immersive 4K viewing experience with smart features.",
    specifications: { "resolution": "4K UHD", "size": "55 inch", "type": "LED" }
  },
  {
    name: "LG 43\" 4K Smart TV",
    brand: "LG",
    category: "TV",
    price: 499.99,
    mrp: 599.99,
    rating: 4.5,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/lg-tv-43.jpg",
    description: "Compact yet powerful 4K Smart TV.",
    specifications: { "resolution": "4K UHD", "size": "43 inch", "type": "LED" }
  },
  {
    name: "LG 1.5 Ton 5 Star Inverter AC",
    brand: "LG",
    category: "AC",
    price: 549.99,
    mrp: 699.99,
    rating: 4.7,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/lg-ac-1.5.jpg",
    description: "Energy efficient cooling for medium-sized rooms.",
    specifications: { "capacity": "1.5 Ton", "rating": "5 Star", "type": "Inverter Split" }
  },
  {
    name: "Samsung 1.5 Ton 5 Star AC",
    brand: "Samsung",
    category: "AC",
    price: 529.99,
    mrp: 679.99,
    rating: 4.6,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/samsung-ac-1.5.jpg",
    description: "Fast cooling and durable build.",
    specifications: { "capacity": "1.5 Ton", "rating": "5 Star", "type": "Inverter Split" }
  },
  {
    name: "HP 15s Intel Core i5 Laptop",
    brand: "HP",
    category: "Laptop",
    price: 649.99,
    mrp: 799.99,
    rating: 4.4,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/hp-15s.jpg",
    description: "Reliable performance for work and study.",
    specifications: { "processor": "Intel Core i5", "ram": "8GB", "storage": "512GB SSD" }
  },
  {
    name: "Dell Inspiron 15 Laptop",
    brand: "Dell",
    category: "Laptop",
    price: 699.99,
    mrp: 849.99,
    rating: 4.5,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/dell-inspiron.jpg",
    description: "Durable design with excellent battery life.",
    specifications: { "processor": "Intel Core i5", "ram": "16GB", "storage": "512GB SSD" }
  },
  {
    name: "Lenovo IdeaPad Slim 5",
    brand: "Lenovo",
    category: "Laptop",
    price: 749.99,
    mrp: 899.99,
    rating: 4.6,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/lenovo-ideapad.jpg",
    description: "Thin, light, and powerful.",
    specifications: { "processor": "AMD Ryzen 7", "ram": "16GB", "storage": "512GB SSD" }
  },
  {
    name: "LG 260 L Double Door Refrigerator",
    brand: "LG",
    category: "Refrigerator",
    price: 399.99,
    mrp: 499.99,
    rating: 4.7,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/lg-fridge-260.jpg",
    description: "Smart inverter compressor for energy savings.",
    specifications: { "capacity": "260 L", "type": "Double Door", "rating": "3 Star" }
  },
  {
    name: "Samsung 8 Kg Front Load Washing Machine",
    brand: "Samsung",
    category: "Washing Machine",
    price: 449.99,
    mrp: 549.99,
    rating: 4.8,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/samsung-wm-8kg.jpg",
    description: "Eco bubble technology for powerful cleaning.",
    specifications: { "capacity": "8 Kg", "type": "Front Load", "motor": "Inverter" }
  },
  {
    name: "LG 8 Kg Front Load Washing Machine",
    brand: "LG",
    category: "Washing Machine",
    price: 459.99,
    mrp: 569.99,
    rating: 4.7,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/lg-wm-8kg.jpg",
    description: "6 Motion Direct Drive for better fabric care.",
    specifications: { "capacity": "8 Kg", "type": "Front Load", "motor": "Inverter" }
  },
  {
    name: "Boat Bluetooth Speaker",
    brand: "Boat",
    category: "Speaker",
    price: 49.99,
    mrp: 79.99,
    rating: 4.3,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/boat-speaker.jpg",
    description: "Portable speaker with deep bass.",
    specifications: { "type": "Bluetooth", "battery": "12 hours", "waterproof": "IPX7" }
  },
  {
    name: "Intex Party Speaker",
    brand: "Intex",
    category: "Speaker",
    price: 129.99,
    mrp: 199.99,
    rating: 4.2,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/intex-speaker.jpg",
    description: "Loud party speaker with RGB lights.",
    specifications: { "type": "Party Speaker", "output": "100W", "connectivity": "Bluetooth/USB/AUX" }
  },
  {
    name: "Boat Wireless Earbuds",
    brand: "Boat",
    category: "Accessories",
    price: 29.99,
    mrp: 59.99,
    rating: 4.1,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/boat-earbuds.jpg",
    description: "True wireless earbuds with clear sound.",
    specifications: { "type": "TWS", "playtime": "20 hours", "driver": "10mm" }
  },
  {
    name: "Samsung 25W Fast Charger",
    brand: "Samsung",
    category: "Accessories",
    price: 19.99,
    mrp: 29.99,
    rating: 4.6,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/samsung-charger.jpg",
    description: "Official 25W fast charger with Type-C cable.",
    specifications: { "output": "25W", "port": "Type-C", "cable_included": "Yes" }
  },
  {
    name: "Voltas 1.5 Ton 5 Star AC",
    brand: "Voltas",
    category: "AC",
    price: 499.99,
    mrp: 649.99,
    rating: 4.5,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/voltas-ac-1.5.jpg",
    description: "Affordable and efficient cooling.",
    specifications: { "capacity": "1.5 Ton", "rating": "5 Star", "type": "Inverter Split" }
  },
  {
    name: "Symphony Air Cooler",
    brand: "Symphony",
    category: "Cooler",
    price: 149.99,
    mrp: 199.99,
    rating: 4.2,
    stock: true,
    stockQuantity: Math.floor(Math.random() * 41) + 10,
    image: "/images/products/symphony-cooler.jpg",
    description: "Tower air cooler for hot summers.",
    specifications: { "capacity": "50L", "type": "Tower Cooler", "cooling_pad": "Honeycomb" }
  }
];

const seedProducts = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
    
    // Sync models
    await sequelize.sync({ force: true }); // Careful: this drops tables
    console.log('Models synchronized.');

    // Insert data
    const inserted = await Product.bulkCreate(products);
    console.log(`Successfully seeded ${inserted.length} products.`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
