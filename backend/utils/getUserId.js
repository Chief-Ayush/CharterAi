require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');

/**
 * Quick script to get the test user ID for frontend
 * Usage: node utils/getUserId.js
 */

async function getUserId() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const testUser = await User.findOne({ email: 'test@charter.ai' });
    
    if (!testUser) {
      console.log('❌ Test user not found!');
      console.log('   Run: node utils/seedChessboardDataAuto.js');
      process.exit(1);
    }

    console.log('📋 Test User Details:');
    console.log('   Email:', testUser.email);
    console.log('   Business:', testUser.businessName);
    console.log('   User ID:', testUser._id.toString());
    console.log('\n✏️  Copy this line to FinancialChessboard.jsx (line ~36):');
    console.log(`   const userId = "${testUser._id.toString()}";`);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

getUserId();
