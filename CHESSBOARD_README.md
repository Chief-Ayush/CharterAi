# Financial Chessboard Feature - Implementation Guide

## 🎯 Feature Overview

The **Financial Chessboard** is a drag-and-drop cashflow simulation tool that allows users to predict financial outcomes by applying various strategic moves to their 30-day timeline.

## 📁 Files Created

### Backend
```
backend/
├── utils/
│   └── predictionEngine.js        # Core simulation & conflict detection logic
├── controllers/
│   └── chessboardController.js    # API request handlers
└── routes/
    └── chessboard.js              # API route definitions
```

### Frontend
```
frontend/
├── src/
│   ├── pages/
│   │   └── FinancialChessboard.jsx          # Main page component
│   ├── components/
│   │   └── chessboard/
│   │       ├── MoveTemplatesPanel.jsx       # Action templates sidebar
│   │       ├── MoveEditorModal.jsx          # Modal for configuring moves
│   │       ├── TimelineBoard.jsx            # 30-day timeline grid
│   │       └── ResultPanel.jsx              # Predictions & conflicts display
│   └── styles/
│       └── Chessboard.css                   # Full styling (matches Dashboard.css)
```

## 🚀 Setup Instructions

### 1. Backend Setup

The backend routes are automatically integrated in `server.js`. Ensure these packages are installed:

```bash
cd backend
npm install cors express mongoose dotenv
```

### 2. Frontend Setup

Install required dependencies:

```bash
cd frontend
npm install axios recharts
```

### 3. Environment Variables

Ensure your `.env` file has:

```env
MONGO_URI=mongodb://localhost:27017/charterai
PORT=5000
```

### 4. Start Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🔧 API Endpoints

### GET `/api/chessboard/timeline`
Get base 30-day timeline without any moves.

**Query Parameters:**
- `userId` (required) - MongoDB User ID
- `startDate` (optional) - Start date for 30-day window (defaults to today)

**Response:**
```json
{
  "timeline": [
    {
      "day": 1,
      "date": "2025-11-29",
      "income": 45000,
      "expenses": 12000,
      "cashBalance": 33000,
      "items": [...]
    },
    ...
  ],
  "success": true
}
```

### POST `/api/chessboard/simulate-move`
Simulate a financial move and get predictions.

**Request Body:**
```json
{
  "userId": "6751234567890abcdef12345",
  "move": {
    "type": "delay_payment",
    "oldDay": 5,
    "newDay": 15,
    "amount": 25000,
    "itemId": "doc_id_here"
  },
  "startDate": "2025-11-29"
}
```

**Response:**
```json
{
  "updatedTimeline": [...],
  "confidenceBand": {
    "worst": 80000,
    "likely": 100000,
    "best": 110000
  },
  "conflicts": [
    {
      "type": "negative_cash",
      "severity": "critical",
      "day": 12,
      "message": "Cash balance goes negative on Day 12"
    }
  ],
  "explanation": "After applying the Delay Payment move, 1 potential issue detected...",
  "success": true
}
```

### POST `/api/chessboard/validate-move`
Quick validation of move parameters before simulation.

**Request Body:**
```json
{
  "move": {
    "type": "add_expense",
    "day": 10,
    "amount": 5000,
    "category": "Equipment"
  }
}
```

**Response:**
```json
{
  "valid": true,
  "errors": []
}
```

## 📊 Move Types

### 1. **Delay Payment**
```javascript
{
  type: "delay_payment",
  oldDay: 5,
  newDay: 15,
  amount: 25000,
  itemId: "document_id" // Optional
}
```
Postpones an income or expense from one day to another.

### 2. **Add Unexpected Expense**
```javascript
{
  type: "add_expense",
  day: 10,
  amount: 15000,
  category: "Equipment Repair"
}
```
Adds a new unplanned expense on a specific day.

### 3. **Receive Early Payment**
```javascript
{
  type: "receive_early",
  oldDay: 20,
  newDay: 5,
  amount: 50000,
  itemId: "document_id" // Optional
}
```
Moves customer payment to an earlier date.

### 4. **Short-term Loan**
```javascript
{
  type: "short_loan",
  loanAmount: 100000,
  repaymentDay: 30
}
```
Takes immediate loan (Day 1) with 5% interest repayment on specified day.

### 5. **Postpone GST Payment**
```javascript
{
  type: "postpone_gst",
  oldDay: 10,
  newDay: 20,
  gstAmount: 18000
}
```
Delays GST payment. If `user.gstScheme === "regular"` and delay > 7 days, applies 2% penalty.

## ⚠️ Conflict Detection Rules

The prediction engine detects:

1. **Negative Cash** (Critical)
   - Triggers when `cashBalance < 0` on any day
   
2. **Low Buffer** (Warning)
   - Triggers when `cashBalance < 20% of avgDailySpend`
   
3. **GST Penalty** (Major)
   - For regular GST scheme users delaying > 7 days
   
4. **Vendor Risk** (Warning)
   - Payment delayed > 7 days may strain relationships
   
5. **Liquidity Risk** (Warning)
   - High expense concentration within 5-day window

## 🎨 UI Components

### MoveTemplatesPanel
- Displays 5 action templates with icons
- Shows "Active Move Ready" indicator when move is configured
- Clicking template opens MoveEditorModal

### MoveEditorModal
- Dynamic form based on template fields
- Client-side validation
- Submit creates dynamic move object

### TimelineBoard
- 30-day grid with drag-and-drop zones
- Shows income, expenses, cash balance per day
- Highlights negative balances in red
- Displays top 2 transactions per day

### ResultPanel
- Confidence band (worst/likely/best case)
- Cashflow curve chart (Recharts Area chart)
- Conflicts list with severity indicators
- AI-generated explanation

## 🎯 Usage Flow

1. **User opens** `/chessboard`
2. **System loads** base 30-day timeline from approved Documents
3. **User clicks** a template (e.g., "Delay Payment")
4. **Modal opens** for configuration
5. **User fills** required fields and submits
6. **System creates** dynamic move object
7. **User drags** (conceptually - click on timeline day)
8. **System calls** `/api/chessboard/simulate-move`
9. **ResultPanel updates** with:
   - Updated timeline
   - Confidence bands
   - Conflicts & warnings
   - Explanation
10. **User can reset** or try different moves

## 🔐 Authentication Note

Currently uses hardcoded `userId` for demo:
```javascript
const userId = "6751234567890abcdef12345";
```

**For production:**
- Implement proper authentication middleware
- Pass `req.user.id` from JWT/session
- Update FinancialChessboard.jsx to get userId from auth context

## 🧪 Testing

### Manual Test Data Setup

To test the feature, you need documents in MongoDB:

```javascript
// Example Invoice (Income)
{
  uploadedBy: ObjectId("your_user_id"),
  docType: "Invoice",
  extractedAmount: 45000,
  extractedDate: new Date("2025-11-30"),
  extractedVendor: "Customer ABC",
  reviewStatus: "approved"
}

// Example Receipt (Expense)
{
  uploadedBy: ObjectId("your_user_id"),
  docType: "Receipt",
  extractedAmount: 12000,
  extractedDate: new Date("2025-11-30"),
  extractedVendor: "Supplier XYZ",
  reviewStatus: "approved"
}
```

### Test Scenarios

1. **Positive Scenario:** Receive early payment → Improves cash position
2. **Negative Scenario:** Delay payment → Causes negative balance
3. **GST Penalty:** Postpone GST > 7 days with regular scheme
4. **Loan Impact:** Take loan → Immediate liquidity + future repayment burden

## 📱 Responsive Design

- **Desktop (>1200px):** 3-column layout (templates | timeline | results)
- **Tablet (768-1200px):** Single column, full-width panels
- **Mobile (<768px):** Stacked vertical layout, optimized touch targets

## 🎨 Theme Support

Fully supports 3 themes from existing design system:
- **Morning:** Blue gradient (#0ea5e9)
- **Evening:** Orange gradient (#f97316)
- **Night:** Purple/dark gradient (#818cf8)

All colors use CSS variables defined in theme system.

## 🚧 Known Limitations

1. **No Undo/Redo:** Each move overwrites previous simulation
2. **Single Move:** Can't combine multiple moves (feature enhancement)
3. **Drag-Drop:** Currently click-based, true HTML5 drag-drop can be added
4. **Historical Data:** Only uses approved documents, no manual entries
5. **Auth:** Requires hardcoded userId (needs auth integration)

## 🔮 Future Enhancements

- [ ] Multi-move combination (chaining moves)
- [ ] Save/load scenarios
- [ ] Compare multiple scenarios side-by-side
- [ ] Export predictions as PDF report
- [ ] AI recommendations for optimal moves
- [ ] Real-time collaboration (share scenarios)
- [ ] Integration with actual bank accounts (via Plaid/similar)
- [ ] ML-based confidence band improvements

## 📞 Support

For issues or questions:
- Check console for detailed error messages
- Verify MongoDB connection
- Ensure documents have `reviewStatus: "approved"`
- Check backend logs for API errors

---

**Built with:** React 19, Express, MongoDB, Recharts  
**Design System:** Custom CSS (no Tailwind)  
**Compatible with:** User & Document Mongoose models  
