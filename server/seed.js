import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Review from './models/Review.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopez');
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    console.log('Cleared existing collections.');

    // Create Users (password hashing handled by pre-save hooks in User model)
    const admin = await User.create({
      name: 'ShopEZ Admin',
      email: 'admin@shopez.com',
      password: 'Admin@123',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      address: {
        street: '123 Headquarter St',
        city: 'Metropolis',
        state: 'NY',
        pincode: '10001',
        country: 'USA'
      },
      phone: '123-456-7890'
    });

    const testUser = await User.create({
      name: 'John Doe',
      email: 'user@shopez.com',
      password: 'User@123',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      address: {
        street: '456 Elm St',
        city: 'Gotham',
        state: 'NJ',
        pincode: '07001',
        country: 'USA'
      },
      phone: '987-654-3210'
    });

    console.log('Created admin and user.');

    // 20 Sample Products across 5 categories
    const products = [
      // Electronics
      {
        name: 'Quantum Wireless Headphones',
        description: 'Experience pure audio bliss with active noise cancellation and 40-hour battery life.',
        price: 199.99,
        discountPrice: 149.99,
        category: 'Electronics',
        brand: 'Quantum',
        stock: 15,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'],
        seller: 'QuantumTech',
        isFeatured: true,
        tags: ['wireless', 'headphones', 'audio']
      },
      {
        name: 'AeroBook Pro Laptop',
        description: 'Sleek, powerful laptop with a 14-inch retina display, 16GB RAM, and 512GB SSD.',
        price: 999.99,
        discountPrice: 899.99,
        category: 'Electronics',
        brand: 'Aero',
        stock: 8,
        images: ['https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&q=80&w=600'],
        seller: 'AeroDirect',
        isFeatured: true,
        tags: ['laptop', 'computer', 'work']
      },
      {
        name: 'Spectra Smartwatch v2',
        description: 'Track your health and daily activities with a vibrant AMOLED display and 7-day battery.',
        price: 149.99,
        discountPrice: 119.99,
        category: 'Electronics',
        brand: 'Spectra',
        stock: 25,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'],
        seller: 'SpectraWear',
        isFeatured: false,
        tags: ['smartwatch', 'wearable', 'fitness']
      },
      {
        name: 'UltraCharge Power Bank 20K',
        description: 'Compact 20000mAh external battery pack with fast-charging technology.',
        price: 39.99,
        discountPrice: 29.99,
        category: 'Electronics',
        brand: 'UltraCharge',
        stock: 50,
        images: ['https://images.unsplash.com/photo-1609592424085-f6c6d268cf5b?auto=format&fit=crop&q=80&w=600'],
        seller: 'ChargeUp',
        isFeatured: false,
        tags: ['powerbank', 'charger', 'accessories']
      },
      // Fashion
      {
        name: 'Classic Leather Jacket',
        description: 'Timeless genuine leather jacket designed for comfort and durability.',
        price: 249.99,
        discountPrice: 199.99,
        category: 'Fashion',
        brand: 'Heritage',
        stock: 12,
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600'],
        seller: 'StyleHub',
        isFeatured: true,
        tags: ['leather', 'jacket', 'menswear']
      },
      {
        name: 'Urban Canvas Sneakers',
        description: 'Casual, lightweight sneakers perfect for everyday city walks.',
        price: 79.99,
        discountPrice: 59.99,
        category: 'Fashion',
        brand: 'UrbanSteps',
        stock: 30,
        images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600'],
        seller: 'UrbanSteps',
        isFeatured: true,
        tags: ['sneakers', 'shoes', 'footwear']
      },
      {
        name: 'Comfort Knit Sweater',
        description: 'Super soft, high-quality wool blend sweater for chilly seasons.',
        price: 69.99,
        discountPrice: 49.99,
        category: 'Fashion',
        brand: 'CozyThread',
        stock: 20,
        images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600'],
        seller: 'StyleHub',
        isFeatured: false,
        tags: ['sweater', 'cozy', 'winter']
      },
      {
        name: 'Activewear Sport Shorts',
        description: 'Breathable, moisture-wicking athletic shorts for gym and running sessions.',
        price: 29.99,
        discountPrice: 24.99,
        category: 'Fashion',
        brand: 'FitForce',
        stock: 45,
        images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=600'],
        seller: 'FitForce',
        isFeatured: false,
        tags: ['shorts', 'activewear', 'sport']
      },
      // Home & Kitchen
      {
        name: 'Precision Drip Coffee Maker',
        description: 'Programmable drip coffee machine with precision temperature control and glass carafe.',
        price: 129.99,
        discountPrice: 99.99,
        category: 'Home & Kitchen',
        brand: 'BrewMaster',
        stock: 14,
        images: ['https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?auto=format&fit=crop&q=80&w=600'],
        seller: 'KitchenElite',
        isFeatured: true,
        tags: ['coffee', 'kitchen', 'appliance']
      },
      {
        name: 'Stainless Steel Knife Set',
        description: '8-piece professional chef knife block set with ergonomic handles.',
        price: 149.99,
        discountPrice: 119.99,
        category: 'Home & Kitchen',
        brand: 'EdgeForce',
        stock: 18,
        images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600'],
        seller: 'KitchenElite',
        isFeatured: false,
        tags: ['knives', 'cooking', 'cutlery']
      },
      {
        name: 'Ultrasonic Cool Mist Humidifier',
        description: 'Quiet humidifier with a 4L tank capacity and automatic shut-off feature.',
        price: 49.99,
        discountPrice: 39.99,
        category: 'Home & Kitchen',
        brand: 'AeroBreathe',
        stock: 22,
        images: ['https://images.unsplash.com/photo-1519183071298-a2962ffd12f4?auto=format&fit=crop&q=80&w=600'],
        seller: 'HomeCare',
        isFeatured: false,
        tags: ['humidifier', 'home', 'wellness']
      },
      {
        name: 'Non-Stick Ceramic Cookware Set',
        description: '10-piece eco-friendly ceramic pots and pans set for healthy cooking.',
        price: 189.99,
        discountPrice: 159.99,
        category: 'Home & Kitchen',
        brand: 'GreenChef',
        stock: 10,
        images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600'],
        seller: 'KitchenElite',
        isFeatured: true,
        tags: ['cookware', 'pans', 'pots']
      },
      // Books
      {
        name: 'The Creative Mindset',
        description: 'An insightful guide to unlocking hidden creative potential and developing design thinking.',
        price: 24.99,
        discountPrice: 19.99,
        category: 'Books',
        brand: 'PressHub',
        stock: 35,
        images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'],
        seller: 'BookWorm',
        isFeatured: true,
        tags: ['creativity', 'self-help', 'non-fiction']
      },
      {
        name: 'Secrets of the Cosmos',
        description: 'Explore the fascinating mysteries of space, black holes, and the universe.',
        price: 29.99,
        discountPrice: 24.99,
        category: 'Books',
        brand: 'AstroPublish',
        stock: 28,
        images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600'],
        seller: 'BookWorm',
        isFeatured: false,
        tags: ['science', 'space', 'astrophysics']
      },
      {
        name: 'Mastering Full Stack Development',
        description: 'A comprehensive textbook covering MongoDB, Express, React, Node.js, and deployment.',
        price: 59.99,
        discountPrice: 49.99,
        category: 'Books',
        brand: 'CodePress',
        stock: 40,
        images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600'],
        seller: 'EduBooks',
        isFeatured: true,
        tags: ['programming', 'coding', 'webdev']
      },
      {
        name: 'Vintage Poetry Collection',
        description: 'A beautiful hardcover compilation of standard romantic poetry from the 19th century.',
        price: 19.99,
        discountPrice: 15.99,
        category: 'Books',
        brand: 'ClassicPress',
        stock: 15,
        images: ['https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600'],
        seller: 'BookWorm',
        isFeatured: false,
        tags: ['poetry', 'classics', 'hardcover']
      },
      // Sports
      {
        name: 'Ergonomic Grip Tennis Racket',
        description: 'High-performance carbon fiber tennis racket for advanced control and spin.',
        price: 159.99,
        discountPrice: 139.99,
        category: 'Sports',
        brand: 'SpinForce',
        stock: 10,
        images: ['https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=600'],
        seller: 'ProSports',
        isFeatured: true,
        tags: ['tennis', 'racket', 'court']
      },
      {
        name: 'Anti-Slip Exercise Yoga Mat',
        description: 'Eco-friendly 6mm thick padded mat with alignment marks for pilates and yoga.',
        price: 39.99,
        discountPrice: 29.99,
        category: 'Sports',
        brand: 'ZenFlow',
        stock: 50,
        images: ['https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=600'],
        seller: 'WellnessDirect',
        isFeatured: false,
        tags: ['yoga', 'mat', 'fitness']
      },
      {
        name: 'Carbon Fiber Road Bicycle',
        description: 'Ultra-light road racing bike with Shimano 11-speed gears and hydraulic disc brakes.',
        price: 1499.99,
        discountPrice: 1349.99,
        category: 'Sports',
        brand: 'Veloce',
        stock: 3,
        images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600'],
        seller: 'ProSports',
        isFeatured: true,
        tags: ['bike', 'cycling', 'outdoor']
      },
      {
        name: 'Adjustable Dumbbell Set (20kg)',
        description: 'Set of two modular steel dumbbells with secure spinlock collars.',
        price: 89.99,
        discountPrice: 79.99,
        category: 'Sports',
        brand: 'IronCore',
        stock: 25,
        images: ['https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=600'],
        seller: 'ProSports',
        isFeatured: false,
        tags: ['dumbbells', 'lifting', 'gym']
      }
    ];

    await Product.insertMany(products);
    console.log('Seeded 20 sample products.');

    console.log('Seed completed!');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

seedData();
