
/* eslint-disable */
// Super simple admin creation script - .cjs file
const fs = require('fs');
const path = require('path');

// Simple console colors
const green = '\x1b[32m';
const red = '\x1b[31m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';
const reset = '\x1b[0m';

console.log(`${blue}=== Admin Creation Tool ===${reset}\n`);

// Load .env.local manually
function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) {
      console.log(`${yellow}⚠️ No .env.local found, using defaults${reset}`);
      return;
    }
    
    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const match = trimmedLine.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim();
          process.env[key] = value;
        }
      }
    }
    console.log(`${green}✅ Loaded .env.local${reset}`);
  } catch (err) {
    console.log(`${yellow}⚠️ Error loading .env: ${err.message}${reset}`);
  }
}

// Main function
async function main() {
  try {
    loadEnv();
    
    // Settings
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@goldeneagle.mw';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!';
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://adplusbi_db_user:Adplus1234567890@cluster0.kh8uykr.mongodb.net/golden-eagle';
    
    console.log(`${yellow}Email: ${ADMIN_EMAIL}${reset}`);
    console.log(`${yellow}Password: ${'*'.repeat(ADMIN_PASSWORD.length)}${reset}`);
    console.log(`${yellow}MongoDB: ${MONGODB_URI.substring(0, 40)}...${reset}\n`);
    
    // Load modules
    console.log(`${yellow}Loading modules...${reset}`);
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');
    console.log(`${green}✅ Modules loaded${reset}`);
    
    // Connect to MongoDB
    console.log(`${yellow}Connecting to MongoDB...${reset}`);
    await mongoose.connect(MONGODB_URI);
    console.log(`${green}✅ Connected to MongoDB${reset}`);
    
    // Define schema
    const adminSchema = new mongoose.Schema({
      email: String,
      password: String,
      name: String,
      role: String,
      createdAt: Date
    });
    
    // Get or create model
    const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
    
    // Check if admin exists
    console.log(`${yellow}Checking for existing admin...${reset}`);
    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
    
    // Hash password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    
    if (existingAdmin) {
      // Update existing admin
      existingAdmin.password = hashedPassword;
      existingAdmin.name = existingAdmin.name || 'Super Admin';
      existingAdmin.role = existingAdmin.role || 'admin';
      await existingAdmin.save();
      console.log(`${green}✅ Admin updated: ${existingAdmin.email}${reset}`);
    } else {
      // Create new admin
      const newAdmin = new Admin({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        name: 'Super Admin',
        role: 'admin',
        createdAt: new Date()
      });
      await newAdmin.save();
      console.log(`${green}✅ Admin created: ${newAdmin.email}${reset}`);
    }
    
    // Disconnect
    await mongoose.disconnect();
    console.log(`\n${green}✅ Done!${reset}`);
    process.exit(0);
    
  } catch (error) {
    console.error(`${red}❌ Error:${reset}`, error.message);
    process.exit(1);
  }
}

// Run the script
main();