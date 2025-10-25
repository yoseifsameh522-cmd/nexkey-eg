require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  { name: 'مفاتيح NexKey', slug: 'nexkey-keys', description: `مفاتيح الميكانيكية لوحة المفاتيح محور تستر LED لوحة المفاتيح مفتاح لعبة الإجهاد الإغاثة DIY بها بنفسك — منتج فريد ومطرقع مناسب للاعبين ومحبي الكيبورد الميكانيكي.`, price: 299.00, image: '/images/product1.jpg', countInStock: 100 },
  { name: 'قطعة NexKey إضافية', slug: 'nexkey-spare', description: 'قطعة مساعدة أو بديلة للمنتج الأساسي', price: 49.00, image: '/images/product2.jpg', countInStock: 50 }
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeded products');
  process.exit();
};

seed();
