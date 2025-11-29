/**
 * AUTOMATIC Seed Script for Cashflow Simulator
 * Creates BOTH test user AND sample documents
 * No need to manually find user ID!
 * 
 * Usage: node backend/utils/seedChessboardDataAuto.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Document = require("../models/documentModel");
const User = require("../models/userModel");

// Test user configuration
const TEST_USER = {
  email: "test@charter.ai",
  password: "test123456", // In production, this should be hashed
  businessName: "Demo Business Pvt Ltd",
  timezone: "Asia/Kolkata",
  country: "India",
  businessType: "Services",
  currency: "INR",
  numberOfEmployees: 10,
  gstin: "29ABCDE1234F1Z5",
  gstFilingPeriod: "quarterly",
  gstScheme: "regular",
};

const sampleDocuments = [
  // Week 1 - Invoices (Income)
  {
    docType: "Invoice",
    extractedAmount: 45000,
    extractedDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Day 1
    extractedVendor: "Customer Alpha Corp",
    extractedInvoiceNumber: "INV-001",
    reviewStatus: "approved",
  },
  {
    docType: "Invoice",
    extractedAmount: 32000,
    extractedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Day 5
    extractedVendor: "Customer Beta Ltd",
    extractedInvoiceNumber: "INV-002",
    reviewStatus: "approved",
  },
  {
    docType: "Receipt",
    extractedAmount: 12000,
    extractedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Day 3
    extractedVendor: "Office Supplies Inc",
    extractedInvoiceNumber: "REC-001",
    reviewStatus: "approved",
  },
  
  // Week 2
  {
    docType: "Invoice",
    extractedAmount: 55000,
    extractedDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // Day 10
    extractedVendor: "Customer Gamma Industries",
    extractedInvoiceNumber: "INV-003",
    reviewStatus: "approved",
  },
  {
    docType: "Receipt",
    extractedAmount: 18000,
    extractedDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // Day 8
    extractedVendor: "GST Payment",
    extractedInvoiceNumber: "GST-Q4-2025",
    reviewStatus: "approved",
  },
  {
    docType: "Receipt",
    extractedAmount: 25000,
    extractedDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // Day 12
    extractedVendor: "Equipment Vendor",
    extractedInvoiceNumber: "REC-002",
    reviewStatus: "approved",
  },
  
  // Week 3
  {
    docType: "Invoice",
    extractedAmount: 68000,
    extractedDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Day 15
    extractedVendor: "Customer Delta Solutions",
    extractedInvoiceNumber: "INV-004",
    reviewStatus: "approved",
  },
  {
    docType: "Receipt",
    extractedAmount: 35000,
    extractedDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // Day 15
    extractedVendor: "Salary Payment",
    extractedInvoiceNumber: "SAL-NOV-2025",
    reviewStatus: "approved",
  },
  {
    docType: "Receipt",
    extractedAmount: 8000,
    extractedDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), // Day 18
    extractedVendor: "Utilities",
    extractedInvoiceNumber: "UTIL-NOV",
    reviewStatus: "approved",
  },
  
  // Week 4
  {
    docType: "Invoice",
    extractedAmount: 42000,
    extractedDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000), // Day 22
    extractedVendor: "Customer Epsilon Pvt Ltd",
    extractedInvoiceNumber: "INV-005",
    reviewStatus: "approved",
  },
  {
    docType: "Receipt",
    extractedAmount: 15000,
    extractedDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // Day 20
    extractedVendor: "Marketing Agency",
    extractedInvoiceNumber: "REC-003",
    reviewStatus: "approved",
  },
  {
    docType: "Invoice",
    extractedAmount: 38000,
    extractedDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // Day 28
    extractedVendor: "Customer Zeta Enterprises",
    extractedInvoiceNumber: "INV-006",
    reviewStatus: "approved",
  },
  {
    docType: "Receipt",
    extractedAmount: 22000,
    extractedDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // Day 25
    extractedVendor: "Raw Materials Supplier",
    extractedInvoiceNumber: "REC-004",
    reviewStatus: "approved",
  },
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Find or create test user
    let user = await User.findOne({ email: TEST_USER.email });
    
    if (user) {
      console.log(`✅ Found existing test user: ${user.businessName} (${user.email})`);
      console.log(`   User ID: ${user._id}`);
    } else {
      user = await User.create(TEST_USER);
      console.log(`✅ Created new test user: ${user.businessName} (${user.email})`);
      console.log(`   User ID: ${user._id}`);
    }

    // Clear existing documents for this user
    const deleted = await Document.deleteMany({ uploadedBy: user._id });
    console.log(`🗑️  Deleted ${deleted.deletedCount} existing documents`);

    // Insert sample documents
    const documents = sampleDocuments.map((doc) => ({
      ...doc,
      uploadedBy: user._id,
      originalFilename: `${doc.extractedInvoiceNumber}.pdf`,
      fileUrl: `https://example.com/files/${doc.extractedInvoiceNumber}.pdf`,
      ocrParsed: {
        vendorName: doc.extractedVendor,
        invoiceNumber: doc.extractedInvoiceNumber,
        totalAmount: doc.extractedAmount,
      },
    }));

    const inserted = await Document.insertMany(documents);
    console.log(`✅ Inserted ${inserted.length} sample documents`);

    // Summary
    const totalIncome = sampleDocuments
      .filter((d) => d.docType === "Invoice")
      .reduce((sum, d) => sum + d.extractedAmount, 0);
    const totalExpenses = sampleDocuments
      .filter((d) => d.docType === "Receipt")
      .reduce((sum, d) => sum + d.extractedAmount, 0);

    console.log("\n📊 Financial Summary:");
    console.log(`   📈 Total Income (6 Invoices): ₹${totalIncome.toLocaleString()}`);
    console.log(`   📉 Total Expenses (7 Receipts): ₹${totalExpenses.toLocaleString()}`);
    console.log(`   💰 Net Cashflow: ₹${(totalIncome - totalExpenses).toLocaleString()}`);
    
    console.log("\n🎯 Next Steps:");
    console.log("   1. Update FinancialChessboard.jsx with this User ID:");
    console.log(`      const userId = "${user._id}";`);
    console.log("   2. Start backend: npm run dev");
    console.log("   3. Start frontend: npm run dev");
    console.log("   4. Visit: http://localhost:5173/chessboard");
    console.log("\n✅ Seed data created successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

// Run the seed function
seedData();
