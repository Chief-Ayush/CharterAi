# 🎯 What Data Do You Need for the Chessboard?

## Quick Answer

You need **2 things** in MongoDB:

1. ✅ **One User** (with business details)
2. ✅ **Multiple Documents** (Invoices = income, Receipts = expenses)

---

## 📋 User Data Structure

```javascript
{
  email: "test@charter.ai",
  businessName: "Demo Business Pvt Ltd",
  gstin: "29ABCDE1234F1Z5",
  gstScheme: "regular",              // "regular" or "composition"
  gstFilingPeriod: "quarterly",      // "monthly", "quarterly", "annually"
  currency: "INR",
  numberOfEmployees: 10
}
```

**Why you need this:**
- `gstScheme` → Determines GST penalty calculation
- `gstFilingPeriod` → Used in GST-related moves
- Other fields → Display in UI, context for predictions

---

## 📄 Document Data Structure

Each document represents a **financial transaction**:

### Invoice (Income)
```javascript
{
  uploadedBy: "USER_ID_HERE",
  docType: "Invoice",
  extractedAmount: 45000,
  extractedDate: new Date("2025-12-01"),
  extractedVendor: "Customer Alpha Corp",
  reviewStatus: "approved"           // MUST be "approved"!
}
```

### Receipt (Expense)
```javascript
{
  uploadedBy: "USER_ID_HERE",
  docType: "Receipt",
  extractedAmount: 12000,
  extractedDate: new Date("2025-12-03"),
  extractedVendor: "Office Supplies Inc",
  reviewStatus: "approved"           // MUST be "approved"!
}
```

**Critical Requirements:**
- ✅ `reviewStatus` MUST be `"approved"` (pending documents are ignored!)
- ✅ `extractedDate` MUST be within next 30 days
- ✅ `docType` is either `"Invoice"` (income) or `"Receipt"` (expense)

---

## 🚀 Easy Setup: Run the Seed Script

### Option 1: Automatic (Recommended)

This creates BOTH user AND documents automatically:

```bash
cd backend
node utils/seedChessboardDataAuto.js
```

**What it does:**
- ✅ Creates test user: `test@charter.ai`
- ✅ Creates 13 sample documents (6 invoices + 7 receipts)
- ✅ Spreads them across 30 days
- ✅ Gives you the User ID to use in frontend

### Option 2: Manual

If you already have a user in MongoDB:

1. Find your user ID:
```bash
# In MongoDB shell or Compass
db.users.findOne({}, {_id: 1})
```

2. Update `seedChessboardData.js` line 12:
```javascript
const TEST_USER_ID = "YOUR_ACTUAL_USER_ID_HERE";
```

3. Run seed:
```bash
node utils/seedChessboardData.js
```

---

## 📊 Sample Data Included

The seed script creates realistic data:

| Day | Type | Vendor | Amount |
|-----|------|--------|--------|
| 1 | Invoice | Customer Alpha Corp | ₹45,000 |
| 3 | Receipt | Office Supplies | ₹12,000 |
| 5 | Invoice | Customer Beta Ltd | ₹32,000 |
| 8 | Receipt | GST Payment | ₹18,000 |
| 10 | Invoice | Customer Gamma | ₹55,000 |
| ... | ... | ... | ... |

**Totals:**
- Income: ₹280,000
- Expenses: ₹135,000
- Net: ₹145,000

---

## 🔧 Update Frontend with User ID

After running the seed script, update `FinancialChessboard.jsx`:

```javascript
// Line ~30
const userId = "674abc123def456789012345"; // Replace with your User ID
```

The seed script will print the exact User ID you need!

---

## ✅ Verification Checklist

Before testing the chessboard:

- [ ] Backend running on port 4000
- [ ] MongoDB connected successfully
- [ ] Seed script ran without errors
- [ ] User ID copied to `FinancialChessboard.jsx`
- [ ] Frontend running on port 5173

---

## 🧪 What You'll See

Once data is loaded, the chessboard will show:

### Timeline Grid (30 Days)
```
Day 1:  ↗️ ₹45,000 income  | Cash: ₹45,000
Day 3:  ↘️ ₹12,000 expense | Cash: ₹33,000
Day 5:  ↗️ ₹32,000 income  | Cash: ₹65,000
...
```

### Move Templates
- ⏳ Delay Payment
- 💸 Add Unexpected Expense
- 💰 Receive Early Payment
- 🏦 Short-term Loan
- 📋 Postpone GST

### Results Panel
- Confidence bands (worst/likely/best)
- Cashflow chart
- Conflict warnings
- AI explanation

---

## 🆘 Troubleshooting

### "Failed to load timeline"
→ Check if documents have `reviewStatus: "approved"`
→ Verify dates are in the future (next 30 days)

### "No documents showing"
→ Run seed script again
→ Check MongoDB connection string in `.env`

### "User not found"
→ Update `userId` in `FinancialChessboard.jsx`
→ Run auto seed script to create user

---

## 📝 Summary

**Minimum Data Required:**

```javascript
// 1 User
{ email, businessName, gstScheme, gstFilingPeriod }

// At least 3-5 Documents
{ docType: "Invoice", amount, date, reviewStatus: "approved" }
{ docType: "Receipt", amount, date, reviewStatus: "approved" }
```

**Run This:**
```bash
node backend/utils/seedChessboardDataAuto.js
```

**You're ready!** 🎉
