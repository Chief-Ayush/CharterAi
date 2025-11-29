# 🎮 Financial Chessboard - Test Scenarios Guide

## 🎯 How It Works (Simple Explanation)

The Financial Chessboard helps you **"play chess with your money"** - testing different financial moves before you make them in real life.

### The 3-Panel Interface:

```
┌─────────────┬──────────────────┬─────────────┐
│  Templates  │     Timeline     │   Results   │
│   (Left)    │     (Center)     │   (Right)   │
│             │                  │             │
│ 1. Click a  │  See your 30-day │ After you   │
│ template    │  cash flow with  │ create a    │
│             │  all income &    │ move, see:  │
│ 2. Fill the │  expenses        │             │
│ form        │                  │ • Predicted │
│             │                  │   cash      │
│ 3. Click    │                  │ • Warnings  │
│ "Create     │                  │ • Chart     │
│ Move"       │                  │ • AI tips   │
└─────────────┴──────────────────┴─────────────┘
```

### Flow:
1. **Click a template** (left panel) → Modal opens
2. **Fill the form** → Enter amounts/days
3. **Click "Create Move"** → Simulation runs instantly!
4. **Check results** (right panel) → See predictions
5. **Click "Reset"** → Start over with new move

---

## 📊 Your Current Data

Based on the seed script, you have:

| Metric | Value |
|--------|-------|
| Income (6 invoices) | ₹2,80,000 |
| Expenses (7 receipts) | ₹1,35,000 |
| Net Cashflow | ₹1,45,000 |
| Time Period | Next 30 days |

### Documents Spread Across Days:

| Day | Type | Vendor | Amount | Balance After |
|-----|------|--------|--------|---------------|
| 1 | Invoice | Customer Alpha Corp | ₹45,000 | ₹45,000 |
| 3 | Receipt | Office Supplies | ₹12,000 | ₹33,000 |
| 5 | Invoice | Customer Beta Ltd | ₹32,000 | ₹65,000 |
| 7 | Receipt | Rent Payment | ₹25,000 | ₹40,000 |
| 8 | Receipt | GST Payment | ₹18,000 | ₹22,000 |
| 10 | Invoice | Customer Gamma | ₹55,000 | ₹77,000 |
| 12 | Receipt | Utility Bills | ₹8,000 | ₹69,000 |
| 15 | Invoice | Customer Delta | ₹28,000 | ₹97,000 |
| 18 | Receipt | Equipment Purchase | ₹35,000 | ₹62,000 |
| 20 | Invoice | Customer Epsilon | ₹65,000 | ₹1,27,000 |
| 22 | Receipt | Salary Payout | ₹22,000 | ₹1,05,000 |
| 25 | Invoice | Customer Zeta | ₹55,000 | ₹1,60,000 |
| 28 | Receipt | Marketing Expenses | ₹15,000 | ₹1,45,000 |

---

## 🧪 Test Scenario 1: Delay Payment (Safe Move)

**Goal:** Postpone an expense to improve short-term cash

**Steps:**
1. Click **"Delay Payment"** template (⏱ orange icon)
2. Fill the form:
   - **Old Day:** `7`
   - **New Day:** `14`
   - **Item ID:** Leave blank (optional)
   - **Amount:** `25000`
3. Click **"Create Move"**

**What You Should See:**
- ✅ Left panel shows "Move Simulated" with ✅ icon
- ✅ Timeline updates showing rent moved from day 7 to day 14
- ✅ Right panel shows:
  - **Confidence Band:**
    - Worst Case: ~₹1,16,000
    - Most Likely: ~₹1,45,000
    - Best Case: ~₹1,59,500
  - **Conflicts:** Likely NONE (safe move)
  - **Chart:** Smooth upward cash flow
  - **Explanation:** "Delaying the payment improves short-term liquidity..."

**Why It Works:** You're keeping cash longer, reducing pressure on day 7-14.

---

## 🧪 Test Scenario 2: Add Unexpected Expense (Risky Move)

**Goal:** See what happens if you need emergency cash

**Steps:**
1. Click **"Reset"** button first (top right)
2. Click **"Add Unexpected Expense"** (⚠ red icon)
3. Fill the form:
   - **Day:** `10`
   - **Amount:** `50000`
   - **Category:** `Emergency Repair`
4. Click **"Create Move"**

**What You Should See:**
- ⚠️ Right panel shows:
  - **Confidence Band:**
    - Worst Case: ~₹76,000
    - Most Likely: ~₹95,000
    - Best Case: ~₹1,04,500
  - **Conflicts:** 
    - ⚠️ **Low Buffer Warning** - Cash below 20% of average spending
    - Possibly 🚨 **Liquidity Risk** if combined with other expenses
  - **Chart:** Dip on day 10
  - **Explanation:** "Adding this expense creates a temporary cash crunch on day 10..."

**Why It's Risky:** ₹50k unexpected expense on day 10 reduces your buffer significantly.

---

## 🧪 Test Scenario 3: Receive Early Payment (Best Move)

**Goal:** Get customer payment earlier to boost cash

**Steps:**
1. Click **"Reset"** button
2. Click **"Receive Early Payment"** (✓ green icon)
3. Fill the form:
   - **Old Day:** `20`
   - **New Day:** `8`
   - **Item ID:** Leave blank
   - **Amount:** `65000`
4. Click **"Create Move"**

**What You Should See:**
- ✅ Right panel shows:
  - **Confidence Band:**
    - Worst Case: ~₹1,16,000
    - Most Likely: ~₹1,45,000
    - Best Case: ~₹1,59,500
  - **Conflicts:** NONE (excellent move!)
  - **Chart:** Strong upward trend, earlier peak
  - **Explanation:** "Receiving payment early significantly improves cash position on day 8..."

**Why It's Great:** You get ₹65k 12 days earlier, improving liquidity throughout.

---

## 🧪 Test Scenario 4: Short-term Loan (Double-Edged Sword)

**Goal:** Get immediate cash but pay it back later

**Steps:**
1. Click **"Reset"** button
2. Click **"Short-term Loan"** (💰 purple icon)
3. Fill the form:
   - **Loan Amount:** `100000`
   - **Repayment Day:** `25`
4. Click **"Create Move"**

**What You Should See:**
- ⚠️ Right panel shows:
  - **Confidence Band:**
    - Worst Case: ~₹1,16,000
    - Most Likely: ~₹1,45,000
    - Best Case: ~₹1,59,500
  - **Conflicts:** 
    - ⚠️ **Liquidity Risk** on day 25 (large payment due)
  - **Chart:** Spike at start, dip at day 25
  - **Explanation:** "Taking a loan boosts immediate cash but creates repayment pressure on day 25..."

**Why It's Tricky:** ₹1,00,000 immediate boost, but on day 25 you must pay back, creating strain.

---

## 🧪 Test Scenario 5: Postpone GST (Penalty Risk!)

**Goal:** Delay GST payment to see penalty calculation

**Steps:**
1. Click **"Reset"** button
2. Click **"Postpone GST Payment"** (📋 pink icon)
3. Fill the form:
   - **Old Day:** `8`
   - **New Day:** `20` (12 days delay)
   - **GST Amount:** `18000`
4. Click **"Create Move"**

**What You Should See:**
- 🚨 Right panel shows:
  - **Confidence Band:**
    - Worst Case: Lower due to penalty
    - Most Likely: ~₹1,43,500 (₹1,500 penalty deducted)
    - Best Case: ~₹1,58,000
  - **Conflicts:** 
    - 🚨 **GST Penalty** (Critical!) - "Regular scheme businesses face penalties after 7 days"
  - **Chart:** Slightly lower final balance
  - **Explanation:** "Delaying GST beyond 7 days incurs penalties (18% annual rate)..."

**Why It's Risky:** You're in "regular" GST scheme, so delays > 7 days = automatic penalty!

---

## 🎯 Expected Results Summary

| Scenario | Final Cash | Conflicts | Risk Level |
|----------|-----------|-----------|------------|
| **1. Delay Payment** | ₹1,45,000 | None | ✅ Low |
| **2. Add Expense (₹50k)** | ₹95,000 | Low Buffer | ⚠️ Medium |
| **3. Receive Early** | ₹1,45,000 | None | ✅ Low |
| **4. Loan ₹1L** | ₹1,45,000 | Liquidity Risk | ⚠️ Medium |
| **5. Postpone GST** | ₹1,43,500 | GST Penalty | 🚨 High |

---

## 🔍 What to Look For

### In the Timeline (Center):
- ✅ Days should show income (green ↗️) and expenses (red ↘️)
- ✅ Cash balance should update per day
- ✅ After simulation, numbers should change

### In the Results Panel (Right):

#### Confidence Band (Top):
```
┌───────────┬───────────┬───────────┐
│  Worst    │  Likely   │   Best    │
│  ₹1,16k   │  ₹1,45k   │  ₹1,60k   │
└───────────┴───────────┴───────────┘
```

#### Chart (Middle):
- X-axis: Days 1-30
- Y-axis: Cash balance
- Line should show your cashflow trend

#### Conflicts (Bottom):
- 🚨 **Critical** (red) - Immediate danger
- ⚠️ **Warning** (orange) - Watch out
- ℹ️ **Info** (blue) - FYI

#### AI Explanation:
- Plain English explanation of what the move does
- Pros and cons
- Recommendations

---

## 🐛 Troubleshooting

### "No data in timeline"
→ Check browser console (F12) for errors
→ Verify backend is running: `http://localhost:4000`
→ Check seed data was loaded successfully

### "Simulation failed"
→ Open DevTools (F12) → Network tab
→ Check if API call to `/api/chessboard/simulate-move` succeeded
→ Look at backend terminal for errors

### "Nothing happens after Create Move"
→ Look at right panel - results should appear
→ Check browser console for JavaScript errors
→ Verify axios is installed: `npm list axios`

### "Timeline looks wrong"
→ Verify seed script ran: `node backend/utils/seedChessboardDataAuto.js`
→ Check MongoDB has documents with `reviewStatus: "approved"`
→ Dates should be within next 30 days from today

---

## 💡 Pro Tips

1. **Always click "Reset"** before trying a new scenario to clear previous simulation

2. **Watch the confidence bands** - Bigger spread = more uncertainty

3. **Critical conflicts** (red 🚨) are deal-breakers - avoid those moves!

4. **Compare scenarios** - Try multiple moves to find the best strategy

5. **Realistic amounts** - Use amounts similar to your actual data for accurate predictions

6. **GST Rules Matter:**
   - Regular scheme → Max 7 days delay before penalty
   - Composition scheme → More flexible (but still risky!)

7. **Low Buffer Warning** triggers when cash < 20% of average spending (dangerous zone!)

---

## 📞 Need Help?

### Check Console Logs:
```bash
# Browser Console (F12)
# Look for errors after clicking "Create Move"

# Backend Terminal
# Watch for API request logs and errors
```

### Verify API Endpoints:
```bash
# Test timeline endpoint
curl http://localhost:4000/api/chessboard/timeline?userId=692a46814d2519ff1b12846c

# Should return JSON with timeline array
```

---

## 🎉 Success Checklist

After running each scenario, you should see:

- [ ] Left panel shows "Move Simulated" ✅ icon
- [ ] Timeline center panel updates (optional, depending on move)
- [ ] Right panel displays:
  - [ ] 3 confidence band cards (worst/likely/best)
  - [ ] Line chart showing cashflow
  - [ ] Conflicts list (may be empty for safe moves)
  - [ ] AI explanation paragraph
- [ ] No errors in browser console
- [ ] No errors in backend terminal

---

## 🚀 Advanced Usage

Once comfortable, try:

1. **Chaining Scenarios:** Reset → Move 1 → Compare → Reset → Move 2 → Compare

2. **Edge Cases:**
   - Move expense to day 30 (last day)
   - Add huge expense (₹2,00,000) to see negative cash warning
   - Multiple small delays vs one big delay

3. **Real-World Planning:**
   - Use your actual upcoming expenses
   - Test "what if" scenarios before making decisions
   - Export insights for team discussions (future feature!)

---

**Happy Chess Playing! ♟️💰**

Test all 5 scenarios and see how your financial moves play out before you make them in real life!
