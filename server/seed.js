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
    console.log('✅ Connected to MongoDB...');

    await User.deleteMany();
    await Product.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();
    console.log('🧹 Cleared existing data.');

    // ── Users ─────────────────────────────────────
    const admin = await User.create({
      name: 'ShopEZZ Admin',
      email: 'admin@shopez.com',
      password: 'Admin@123',
      role: 'admin',
      phone: '9876543210',
      address: { street: '1 MG Road', city: 'Bangalore', state: 'Karnataka', pincode: '560001', country: 'India' }
    });

    const testUser = await User.create({
      name: 'Rahul Sharma',
      email: 'user@shopez.com',
      password: 'User@123',
      role: 'user',
      phone: '9123456789',
      address: { street: '45 Park Street', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', country: 'India' }
    });

    console.log('👥 Created 2 users.');

    // ── Products ───────────────────────────────────
    const products = [

      // ── ELECTRONICS ──────────────────────────────
      {
        name: 'boAt Rockerz 450 Bluetooth Headphones',
        description: 'Wireless on-ear headphones with 15-hour playback, 40mm drivers, and powerful bass. Foldable design with padded ear cushions.',
        price: 2999,
        discountPrice: 1299,
        category: 'Electronics',
        brand: 'boAt',
        stock: 80,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'],
        seller: 'boAt Official',
        isFeatured: true,
        tags: ['headphones', 'wireless', 'bluetooth', 'audio']
      },
      {
        name: 'Redmi Note 13 Pro 5G (256GB)',
        description: '200MP camera, 6.67" AMOLED display, Snapdragon 7s Gen 2, 5100mAh battery with 67W fast charging.',
        price: 31999,
        discountPrice: 26999,
        category: 'Electronics',
        brand: 'Redmi',
        stock: 45,
        images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600'],
        seller: 'Xiaomi India',
        isFeatured: true,
        tags: ['smartphone', 'mobile', '5g', 'redmi']
      },
      {
        name: 'Samsung Galaxy Tab A9+ (Wi-Fi)',
        description: '11" LCD display, Snapdragon 695, 8GB RAM, 128GB storage. Perfect for entertainment and productivity.',
        price: 27999,
        discountPrice: 22999,
        category: 'Electronics',
        brand: 'Samsung',
        stock: 30,
        images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80&w=600'],
        seller: 'Samsung India',
        isFeatured: false,
        tags: ['tablet', 'samsung', 'android', 'display']
      },
      {
        name: 'HP Pavilion 15 Laptop (i5/16GB/512GB)',
        description: 'Intel Core i5 12th Gen, 16GB DDR4 RAM, 512GB SSD, 15.6" FHD IPS display. Ideal for students and professionals.',
        price: 72990,
        discountPrice: 59990,
        category: 'Electronics',
        brand: 'HP',
        stock: 15,
        images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600'],
        seller: 'HP India',
        isFeatured: true,
        tags: ['laptop', 'hp', 'computer', 'intel']
      },
      {
        name: 'Noise ColorFit Pro 5 Smartwatch',
        description: '1.46" AMOLED display, Bluetooth calling, SpO2, 100+ sports modes, 7-day battery life.',
        price: 6999,
        discountPrice: 2799,
        category: 'Electronics',
        brand: 'Noise',
        stock: 120,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'],
        seller: 'Noise Official',
        isFeatured: true,
        tags: ['smartwatch', 'fitness', 'bluetooth calling', 'wearable']
      },
      {
        name: 'Sony WH-1000XM5 Noise Cancelling Headphones',
        description: 'Industry-leading noise cancellation, 30hr battery, multipoint connection, Hi-Res audio.',
        price: 34990,
        discountPrice: 27990,
        category: 'Electronics',
        brand: 'Sony',
        stock: 20,
        images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600'],
        seller: 'Sony India',
        isFeatured: false,
        tags: ['headphones', 'sony', 'noise cancelling', 'premium']
      },
      {
        name: 'Anker 10000mAh Power Bank',
        description: 'Compact 10000mAh power bank with 22.5W fast charging, USB-A + USB-C dual output.',
        price: 1999,
        discountPrice: 1299,
        category: 'Electronics',
        brand: 'Anker',
        stock: 200,
        images: ['https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&q=80&w=600'],
        seller: 'Anker India',
        isFeatured: false,
        tags: ['powerbank', 'charger', 'anker', 'portable']
      },
      {
        name: 'Mi 43" 4K Smart TV (X Series)',
        description: '43-inch 4K Ultra HD LED TV with Dolby Vision, HDR10, Android 11, built-in Chromecast.',
        price: 32999,
        discountPrice: 24999,
        category: 'Electronics',
        brand: 'Mi',
        stock: 25,
        images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600'],
        seller: 'Xiaomi India',
        isFeatured: true,
        tags: ['tv', 'smart tv', '4k', 'mi', 'android tv']
      },
      {
        name: 'JBL Flip 6 Portable Bluetooth Speaker',
        description: 'IP67 waterproof, 12hr playtime, PartyBoost compatible, bold JBL Original Pro Sound.',
        price: 11999,
        discountPrice: 8499,
        category: 'Electronics',
        brand: 'JBL',
        stock: 60,
        images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600'],
        seller: 'JBL India',
        isFeatured: false,
        tags: ['speaker', 'jbl', 'bluetooth', 'waterproof']
      },
      {
        name: 'Canon EOS 1500D DSLR Camera (18-55mm)',
        description: '24.1MP APS-C CMOS sensor, Full HD video recording, built-in Wi-Fi & NFC, beginner-friendly.',
        price: 44995,
        discountPrice: 32995,
        category: 'Electronics',
        brand: 'Canon',
        stock: 10,
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600'],
        seller: 'Canon India',
        isFeatured: false,
        tags: ['camera', 'dslr', 'canon', 'photography']
      },

      // ── FASHION ───────────────────────────────────
      {
        name: 'Levi\'s 511 Slim Fit Jeans',
        description: 'Classic slim fit stretch denim jeans. Sits below waist with a slim leg. Available in multiple washes.',
        price: 3999,
        discountPrice: 1999,
        category: 'Fashion',
        brand: 'Levi\'s',
        stock: 100,
        images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600'],
        seller: 'Levi\'s India',
        isFeatured: true,
        tags: ['jeans', 'denim', 'levis', 'menswear']
      },
      {
        name: 'Nike Air Max 270 Running Shoes',
        description: 'Max Air unit in heel for exceptional cushioning. Breathable mesh upper for a comfortable fit.',
        price: 12995,
        discountPrice: 8995,
        category: 'Fashion',
        brand: 'Nike',
        stock: 50,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600'],
        seller: 'Nike India',
        isFeatured: true,
        tags: ['shoes', 'nike', 'running', 'sneakers']
      },
      {
        name: 'Allen Solly Men\'s Formal Shirt',
        description: 'Regular fit cotton blend formal shirt. Ideal for office wear. Available in multiple colors.',
        price: 1999,
        discountPrice: 999,
        category: 'Fashion',
        brand: 'Allen Solly',
        stock: 150,
        images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600'],
        seller: 'Madura Fashion',
        isFeatured: false,
        tags: ['shirt', 'formal', 'office', 'menswear']
      },
      {
        name: 'H&M Women\'s Floral Maxi Dress',
        description: 'Relaxed-fit maxi dress in woven fabric with floral pattern. V-neckline with tie detail.',
        price: 2499,
        discountPrice: 1499,
        category: 'Fashion',
        brand: 'H&M',
        stock: 75,
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600'],
        seller: 'H&M India',
        isFeatured: true,
        tags: ['dress', 'women', 'floral', 'maxi']
      },
      {
        name: 'Woodland Men\'s Leather Boots',
        description: 'Genuine leather ankle boots with rubber outsole and cushioned insole. Water-resistant.',
        price: 5995,
        discountPrice: 3995,
        category: 'Fashion',
        brand: 'Woodland',
        stock: 40,
        images: ['https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600'],
        seller: 'Woodland India',
        isFeatured: false,
        tags: ['boots', 'leather', 'woodland', 'footwear']
      },
      {
        name: 'Fastrack Analog Watch for Men',
        description: 'Round dial quartz movement watch with stainless steel strap. Water-resistant up to 50m.',
        price: 2495,
        discountPrice: 1495,
        category: 'Fashion',
        brand: 'Fastrack',
        stock: 90,
        images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600'],
        seller: 'Titan India',
        isFeatured: false,
        tags: ['watch', 'fastrack', 'analog', 'accessories']
      },
      {
        name: 'Hidesign Brown Leather Handbag',
        description: 'Vegetable-tanned full grain leather handbag with multiple compartments and brass fittings.',
        price: 6995,
        discountPrice: 4495,
        category: 'Fashion',
        brand: 'Hidesign',
        stock: 25,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600'],
        seller: 'Hidesign Official',
        isFeatured: false,
        tags: ['handbag', 'leather', 'women', 'hidesign']
      },
      {
        name: 'Puma Men\'s T-Shirt (Pack of 2)',
        description: 'Cotton blend jersey t-shirts with Puma Cat logo. Regular fit. Ideal for casual wear.',
        price: 1599,
        discountPrice: 799,
        category: 'Fashion',
        brand: 'Puma',
        stock: 200,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600'],
        seller: 'Puma India',
        isFeatured: false,
        tags: ['tshirt', 'puma', 'casual', 'menswear']
      },

      // ── HOME & KITCHEN ────────────────────────────
      {
        name: 'Prestige Iris 750W Mixer Grinder',
        description: '3 stainless steel jars, 4-speed control with pulse function. Ideal for grinding, mixing and juicing.',
        price: 4995,
        discountPrice: 2795,
        category: 'Home & Kitchen',
        brand: 'Prestige',
        stock: 55,
        images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=600'],
        seller: 'TTK Prestige',
        isFeatured: true,
        tags: ['mixer', 'grinder', 'kitchen', 'prestige']
      },
      {
        name: 'Philips Air Fryer (HD9252)',
        description: '1400W air fryer with Rapid Air Technology. 4.1L capacity, 90% less fat. Easy to clean.',
        price: 11995,
        discountPrice: 7995,
        category: 'Home & Kitchen',
        brand: 'Philips',
        stock: 35,
        images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=600'],
        seller: 'Philips India',
        isFeatured: true,
        tags: ['airfryer', 'philips', 'kitchen', 'healthy cooking']
      },
      {
        name: 'Solimo Microfiber Bedsheet Set (Queen)',
        description: 'Double bedsheet with 2 pillow covers. 300 TC microfiber, breathable and soft. Machine washable.',
        price: 1499,
        discountPrice: 699,
        category: 'Home & Kitchen',
        brand: 'Solimo',
        stock: 300,
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600'],
        seller: 'Amazon Basics',
        isFeatured: false,
        tags: ['bedsheet', 'home', 'bedroom', 'microfiber']
      },
      {
        name: 'Pigeon by Stovekraft Induction Cooktop',
        description: '1800W induction cooktop with 7 preset menus, child lock, and automatic voltage regulator.',
        price: 3499,
        discountPrice: 1799,
        category: 'Home & Kitchen',
        brand: 'Pigeon',
        stock: 70,
        images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=600'],
        seller: 'Stovekraft India',
        isFeatured: false,
        tags: ['induction', 'cooktop', 'kitchen', 'pigeon']
      },
      {
        name: 'Dyson V8 Cordless Vacuum Cleaner',
        description: 'Powerful suction with Dyson V8 motor. 40 min runtime, converts to handheld, HEPA filtration.',
        price: 34900,
        discountPrice: 27900,
        category: 'Home & Kitchen',
        brand: 'Dyson',
        stock: 12,
        images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600'],
        seller: 'Dyson India',
        isFeatured: false,
        tags: ['vacuum', 'dyson', 'cordless', 'cleaning']
      },
      {
        name: 'Wonderchef Nutri-Blend Personal Blender',
        description: '400W motor, 22000 RPM, BPA-free unbreakable jars with sports lid. Blend on-the-go.',
        price: 2995,
        discountPrice: 1795,
        category: 'Home & Kitchen',
        brand: 'Wonderchef',
        stock: 90,
        images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=600'],
        seller: 'Wonderchef India',
        isFeatured: false,
        tags: ['blender', 'smoothie', 'wonderchef', 'kitchen']
      },

      // ── BOOKS ─────────────────────────────────────
      {
        name: 'Atomic Habits – James Clear',
        description: 'An easy and proven way to build good habits and break bad ones. #1 New York Times bestseller.',
        price: 799,
        discountPrice: 399,
        category: 'Books',
        brand: 'Penguin Random House',
        stock: 500,
        images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'],
        seller: 'BookWorm',
        isFeatured: true,
        tags: ['self-help', 'habits', 'bestseller', 'non-fiction']
      },
      {
        name: 'The Alchemist – Paulo Coelho',
        description: 'A magical story about following your dreams. One of the best-selling books of all time worldwide.',
        price: 350,
        discountPrice: 199,
        category: 'Books',
        brand: 'HarperCollins',
        stock: 400,
        images: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600'],
        seller: 'BookWorm',
        isFeatured: true,
        tags: ['fiction', 'novel', 'coelho', 'bestseller']
      },
      {
        name: 'Rich Dad Poor Dad – Robert Kiyosaki',
        description: 'What the rich teach their kids about money that the poor and middle class do not!',
        price: 499,
        discountPrice: 249,
        category: 'Books',
        brand: 'Warner Books',
        stock: 350,
        images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=600'],
        seller: 'EduBooks',
        isFeatured: false,
        tags: ['finance', 'money', 'investing', 'non-fiction']
      },
      {
        name: 'Let Us C – Yashavant Kanetkar (17th Ed.)',
        description: 'The most trusted C programming book for students and beginners. Clear explanations with examples.',
        price: 395,
        discountPrice: 295,
        category: 'Books',
        brand: 'BPB Publications',
        stock: 200,
        images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600'],
        seller: 'EduBooks',
        isFeatured: false,
        tags: ['programming', 'c language', 'textbook', 'coding']
      },
      {
        name: 'Wings of Fire – APJ Abdul Kalam',
        description: 'Autobiography of India\'s Missile Man, Dr. APJ Abdul Kalam. An inspiring story of perseverance.',
        price: 175,
        discountPrice: 120,
        category: 'Books',
        brand: 'Universities Press',
        stock: 600,
        images: ['https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=600'],
        seller: 'BookWorm',
        isFeatured: false,
        tags: ['autobiography', 'kalam', 'inspirational', 'indian author']
      },

      // ── SPORTS ────────────────────────────────────
      {
        name: 'Cosco Ace Volleyball',
        description: 'Official size synthetic leather volleyball with butyl bladder. Good for indoor and outdoor play.',
        price: 799,
        discountPrice: 499,
        category: 'Sports',
        brand: 'Cosco',
        stock: 120,
        images: ['https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=600'],
        seller: 'ProSports',
        isFeatured: false,
        tags: ['volleyball', 'cosco', 'outdoor', 'sports']
      },
      {
        name: 'Decathlon Quechua Camping Backpack 40L',
        description: '40L trekking rucksack with rain cover, adjustable back system, and multiple pockets.',
        price: 4999,
        discountPrice: 2999,
        category: 'Sports',
        brand: 'Quechua',
        stock: 45,
        images: ['https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&q=80&w=600'],
        seller: 'Decathlon India',
        isFeatured: true,
        tags: ['backpack', 'trekking', 'camping', 'outdoor']
      },
      {
        name: 'Yonex ZR 100 Light Badminton Racket',
        description: 'Lightweight aluminum badminton racket for beginners. Pre-strung with a full cover.',
        price: 499,
        discountPrice: 299,
        category: 'Sports',
        brand: 'Yonex',
        stock: 250,
        images: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=600'],
        seller: 'ProSports',
        isFeatured: false,
        tags: ['badminton', 'racket', 'yonex', 'sports']
      },
      {
        name: 'Adidas Predator Running Shoes',
        description: 'Lightweight mesh upper with Boost midsole for energy return. Suitable for daily running.',
        price: 7999,
        discountPrice: 4999,
        category: 'Sports',
        brand: 'Adidas',
        stock: 65,
        images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600'],
        seller: 'Adidas India',
        isFeatured: true,
        tags: ['running shoes', 'adidas', 'sports', 'footwear']
      },
      {
        name: 'Strauss Yoga Mat 6mm with Carry Strap',
        description: 'Anti-slip, eco-friendly PVC yoga mat with alignment lines. Includes carry strap for easy transport.',
        price: 999,
        discountPrice: 499,
        category: 'Sports',
        brand: 'Strauss',
        stock: 180,
        images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600'],
        seller: 'WellnessDirect',
        isFeatured: false,
        tags: ['yoga', 'mat', 'fitness', 'strauss']
      },
      {
        name: 'Burnlab Adjustable Dumbbell Set (10kg x 2)',
        description: 'Chrome finish cast iron dumbbells with rubber grip. Adjustable weight plates with lock collars.',
        price: 2499,
        discountPrice: 1799,
        category: 'Sports',
        brand: 'Burnlab',
        stock: 80,
        images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=600'],
        seller: 'FitGear India',
        isFeatured: false,
        tags: ['dumbbell', 'gym', 'weights', 'fitness']
      }
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`📦 Seeded ${createdProducts.length} products.`);

    // ── Sample Reviews ─────────────────────────────
    const reviews = [
      { user: testUser._id, product: createdProducts[0]._id, rating: 5, comment: 'Amazing sound quality! The bass is superb and ANC works perfectly.' },
      { user: testUser._id, product: createdProducts[1]._id, rating: 4, comment: 'Great phone for the price. Camera is excellent. Battery lasts a full day.' },
      { user: testUser._id, product: createdProducts[4]._id, rating: 5, comment: 'Best smartwatch under 3000! SpO2 works accurately. Very happy.' },
      { user: testUser._id, product: createdProducts[10]._id, rating: 4, comment: 'Good quality jeans. Fits true to size. Comfortable for everyday wear.' },
      { user: testUser._id, product: createdProducts[11]._id, rating: 5, comment: 'Best shoes I\'ve bought! Very comfortable and looks great.' },
      { user: testUser._id, product: createdProducts[18]._id, rating: 5, comment: 'Works perfectly! Makes excellent smoothies and chutneys.' },
      { user: testUser._id, product: createdProducts[24]._id, rating: 5, comment: 'Life-changing book. Highly recommend to everyone!' },
      { user: testUser._id, product: createdProducts[25]._id, rating: 5, comment: 'A timeless classic. Read it in one sitting. Absolutely loved it.' },
    ];

    await Review.insertMany(reviews);
    console.log(`⭐ Seeded ${reviews.length} reviews.`);

    // Update product ratings
    for (const review of reviews) {
      await Product.findByIdAndUpdate(review.product, {
        $inc: { numReviews: 1 },
        $set: { ratings: review.rating }
      });
    }

    console.log('\n🎉 Seed complete!');
    console.log('─────────────────────────────────────');
    console.log('👤 Admin:    admin@shopez.com / Admin@123');
    console.log('👤 User:     user@shopez.com  / User@123');
    console.log(`📦 Products: ${createdProducts.length} total`);
    console.log('─────────────────────────────────────');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
