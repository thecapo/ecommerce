import mongoose from 'mongoose';
import { Product } from './productSchema';

async function run() {
  await mongoose.connect(`mongodb+srv://the7thcapo_db_user:6FctWsPI23TBNEKk@cluster0.io06vy9.mongodb.net/?appName=Cluster0`);

  try {
    const product = await Product.create({
      name: 'Alice',
      price: 25
    });
    console.log('Product saved:', product);
  } catch (err) {
    console.error('Validation error:', err);
  }

  await mongoose.disconnect();
}

run();
