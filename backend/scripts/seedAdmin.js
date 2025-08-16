import Admin from '../src/infrastructure/databaseModels/admin.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const seedAdmin = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    
    const count = await Admin.countDocuments();
    if (count > 0) {
      console.log('Admin table is not empty, skipping seeding.');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const newAdmin = new Admin({
      name: 'Admin User',
      phoneNo: '9999999999',
      password: hashedPassword
    });

    await newAdmin.save();
    console.log('Default admin created successfully.');
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

seedAdmin();
