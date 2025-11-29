# 🚀 Financial Chessboard - Quick Start Guide

## Prerequisites
- Node.js (v18+)
- MongoDB running locally or connection URI
- Backend and frontend servers

## 📦 Installation (5 minutes)

### Step 1: Install Dependencies (if not already done)

**Backend:**
```bash
cd backend
npm install
# Dependencies: express, mongoose, cors, dotenv (already in package.json)
```

**Frontend:**
```bash
cd frontend
npm install axios recharts
# These are the only new dependencies for chessboard
```

### Step 2: Environment Setup

Ensure `backend/.env` has:
```env
MONGO_URI=mongodb://localhost:27017/charterai
PORT=5000
```

### Step 3: Get Your User ID

**Method 1: MongoDB Shell**
```bash
mongosh charterai
db.users.findOne({}, {_id: 1, email: 1, businessName: 1})
# Copy the _id value
```

**Method 2: MongoDB Compass**
- Open Compass
- Connect to your database
- Browse `users` collection
- Copy any user's `_id` field

### Step 4: Update Seed Script

Edit `backend/utils/seedChessboardData.js`:
```javascript
// Line 12: Replace with your actual user ID
const TEST_USER_ID = "YOUR_ACTUAL_USER_ID_HERE";
```

### Step 5: Seed Test Data

```bash
cd backend
node utils/seedChessboardData.js
```

Expected output:
```
✅ Connected to MongoDB
✅ User found: Your Business Name
🗑️  Deleted X existing documents
✅ Inserted 13 sample documents
📊 Summary:
   Total Income: ₹280,000
   Total Expenses: ₹135,000
   Net: ₹145,000
✅ Seed data created successfully!
```

### Step 6: Start Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Should see: Connected to db and listening at port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Should see: Local: http://localhost:5173
```

## 🧪 Test the Feature

1. **Open browser:** `http://localhost:5173/chessboard`

2. **What you should see:**
   - Left panel: 5 action templates
   - Center: 30-day timeline with your seeded data
   - Right panel: "No simulation yet" message

3. **Try a simulation:**
   - Click "Delay Payment" template
   - Fill in the modal:
     - Old Day: `5`
     - New Day: `15`
     - Item ID: (leave blank or paste a document ID)
     - Amount: `32000`
   - Click "Create Move"
   - Click on any day in the timeline (e.g., Day 15)
   - Wait 2-3 seconds for simulation
   - Result panel updates with predictions!

## 🎯 Testing Scenarios

### Scenario 1: Positive Move (Receive Early)
```
Template: Receive Early Payment
Old Day: 22
New Day: 5
Amount: 42000
Expected: Improves cash position early, no conflicts
```

### Scenario 2: Negative Move (Large Expense)
```
Template: Add Unexpected Expense
Day: 3
Amount: 50000
Category: Equipment Breakdown
Expected: Triggers "negative cash" or "low buffer" warnings
```

### Scenario 3: GST Penalty
```
Template: Postpone GST Payment
Old Day: 8
New Day: 20
GST Amount: 18000
Expected: If user has gstScheme="regular", triggers penalty warning
```

### Scenario 4: Short Loan
```
Template: Short-term Loan
Loan Amount: 50000
Repayment Day: 30
Expected: Immediate liquidity + future repayment burden shown
```

## 🐛 Troubleshooting

### Issue: "Failed to load timeline data"
**Solution:**
- Check if backend is running (`http://localhost:5000` should respond)
- Verify MongoDB connection
- Check console for detailed error
- Ensure user ID in `FinancialChessboard.jsx` matches your actual user

### Issue: "No documents showing"
**Solution:**
- Run seed script again
- Verify documents have `reviewStatus: "approved"`
- Check dates are within 30-day window from today
- Use MongoDB Compass to verify documents exist

### Issue: Simulation returns errors
**Solution:**
- Check backend console logs
- Verify move object has all required fields
- Ensure days are between 1-30
- Check amounts are positive numbers

### Issue: Charts not showing
**Solution:**
- Verify recharts is installed: `npm list recharts`
- Check browser console for errors
- Clear browser cache and reload

## 📝 Update Frontend User ID

For production use, replace hardcoded userId in:

**File:** `frontend/src/pages/FinancialChessboard.jsx`
```javascript
// Line ~30: Replace with actual auth context
const userId = "6751234567890abcdef12345"; // <-- Change this

// Better approach (when you have auth):
// const { userId } = useAuth(); // From your auth context
```

## 🎨 Customization

### Change Theme
The chessboard automatically uses your selected theme from the navbar.

### Modify Templates
Edit `frontend/src/components/chessboard/MoveTemplatesPanel.jsx`:
```javascript
const TEMPLATES = [
  {
    id: "your_custom_move",
    label: "Your Custom Move",
    icon: "🎯",
    description: "Description here",
    color: "#yourcolor",
    fields: ["field1", "field2"],
  },
  // ... existing templates
];
```

Then implement the logic in:
`backend/utils/predictionEngine.js` → `applyMove()` method

### Add New Conflict Rules
Edit `backend/utils/predictionEngine.js` → `detectConflicts()` method:
```javascript
// Example: Detect weekend payments
if (dayOfWeek === 0 || dayOfWeek === 6) {
  conflicts.push({
    type: "weekend_payment",
    severity: "warning",
    day: day.day,
    message: "Payment scheduled on weekend may be delayed"
  });
}
```

## 📚 API Testing (Optional)

Use Postman/Thunder Client to test API directly:

**GET Timeline:**
```
GET http://localhost:5000/api/chessboard/timeline?userId=YOUR_USER_ID
```

**POST Simulate:**
```
POST http://localhost:5000/api/chessboard/simulate-move
Content-Type: application/json

{
  "userId": "YOUR_USER_ID",
  "move": {
    "type": "add_expense",
    "day": 5,
    "amount": 10000,
    "category": "Test Expense"
  }
}
```

## ✅ Verification Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] `/chessboard` route loads
- [ ] Timeline shows 30 days of data
- [ ] Can open move editor modal
- [ ] Can create a move
- [ ] Clicking timeline day triggers simulation
- [ ] Result panel shows predictions
- [ ] Charts render correctly
- [ ] Conflicts display properly
- [ ] Theme switching works
- [ ] Responsive on mobile

## 🎉 You're Ready!

The Financial Chessboard is now fully functional. Users can:
- ✅ View 30-day cashflow timeline
- ✅ Configure 5 types of financial moves
- ✅ Simulate outcomes with drag-and-drop
- ✅ See confidence bands (worst/likely/best)
- ✅ Get AI-powered conflict detection
- ✅ Understand impacts through visualizations

## 📞 Need Help?

Check these files for reference:
- **Backend logic:** `backend/utils/predictionEngine.js`
- **API routes:** `backend/routes/chessboard.js`
- **Main page:** `frontend/src/pages/FinancialChessboard.jsx`
- **Full docs:** `CHESSBOARD_README.md`

---

**Enjoy predicting your financial future! 🎯📊💰**
