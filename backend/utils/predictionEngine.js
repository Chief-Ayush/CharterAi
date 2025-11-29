const Document = require("../models/documentModel");
const User = require("../models/userModel");

/**
 * Financial Chessboard Prediction Engine
 * Simulates cashflow, detects conflicts, generates confidence bands
 */

class PredictionEngine {
  /**
   * Main simulation method
   * @param {String} userId - MongoDB User ID
   * @param {Object} move - Dynamic move object { type, amount, oldDay, newDay, category, etc. }
   * @param {Date} startDate - Start of 30-day window
   * @returns {Object} - { updatedTimeline, confidenceBand, conflicts, explanation }
   */
  async simulate(userId, move, startDate = new Date()) {
    try {
      // 1. Load user data
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      // 2. Build base 30-day timeline from documents
      const baseTimeline = await this.buildBaseTimeline(userId, startDate);

      // 3. Apply the dynamic move
      const updatedTimeline = this.applyMove(baseTimeline, move, user);

      // 4. Recalculate cash balances
      const timelineWithCash = this.calculateCashflow(updatedTimeline, user);

      // 5. Detect conflicts and risks
      const conflicts = this.detectConflicts(timelineWithCash, move, user);

      // 6. Generate confidence bands
      const confidenceBand = this.generateConfidenceBand(timelineWithCash);

      // 7. Generate human-readable explanation
      const explanation = this.generateExplanation(move, conflicts, confidenceBand);

      return {
        updatedTimeline: timelineWithCash,
        confidenceBand,
        conflicts,
        explanation,
        success: true,
      };
    } catch (error) {
      console.error("Prediction Engine Error:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Build base 30-day timeline from approved documents
   */
  async buildBaseTimeline(userId, startDate) {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);

    // Fetch approved documents in date range
    const documents = await Document.find({
      uploadedBy: userId,
      reviewStatus: "approved",
      extractedDate: { $gte: startDate, $lte: endDate },
    }).sort({ extractedDate: 1 });

    // Initialize 30-day array
    const timeline = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      timeline.push({
        day: i + 1,
        date: date.toISOString().split("T")[0],
        income: 0,
        expenses: 0,
        cashBalance: 0,
        items: [],
      });
    }

    // Aggregate documents by day
    documents.forEach((doc) => {
      const dayIndex = Math.floor(
        (new Date(doc.extractedDate) - startDate) / (1000 * 60 * 60 * 24)
      );
      if (dayIndex >= 0 && dayIndex < 30) {
        const amount = doc.extractedAmount || 0;
        const item = {
          id: doc._id.toString(),
          vendor: doc.extractedVendor || "Unknown",
          amount,
          type: doc.docType,
        };

        if (doc.docType === "Invoice") {
          timeline[dayIndex].income += amount;
        } else if (doc.docType === "Receipt") {
          timeline[dayIndex].expenses += amount;
        }

        timeline[dayIndex].items.push(item);
      }
    });

    return timeline;
  }

  /**
   * Apply dynamic move to timeline
   */
  applyMove(timeline, move, user) {
    const updated = JSON.parse(JSON.stringify(timeline)); // Deep clone

    switch (move.type) {
      case "delay_payment":
        return this.applyDelayPayment(updated, move);
      case "add_expense":
        return this.applyAddExpense(updated, move);
      case "receive_early":
        return this.applyReceiveEarly(updated, move);
      case "short_loan":
        return this.applyShortLoan(updated, move);
      case "postpone_gst":
        return this.applyPostponeGST(updated, move, user);
      default:
        return updated;
    }
  }

  applyDelayPayment(timeline, move) {
    const { oldDay, newDay, amount, itemId } = move;
    if (oldDay < 1 || oldDay > 30 || newDay < 1 || newDay > 30) return timeline;

    const oldIndex = oldDay - 1;
    const newIndex = newDay - 1;

    // Find and remove item from old day
    const itemIndex = timeline[oldIndex].items.findIndex((i) => i.id === itemId);
    if (itemIndex !== -1) {
      const item = timeline[oldIndex].items.splice(itemIndex, 1)[0];

      // Update old day totals
      if (item.type === "Invoice") {
        timeline[oldIndex].income -= item.amount;
      } else {
        timeline[oldIndex].expenses -= item.amount;
      }

      // Add to new day
      timeline[newIndex].items.push({ ...item, moved: true });
      if (item.type === "Invoice") {
        timeline[newIndex].income += item.amount;
      } else {
        timeline[newIndex].expenses += item.amount;
      }
    }

    return timeline;
  }

  applyAddExpense(timeline, move) {
    const { day, amount, category } = move;
    if (day < 1 || day > 30) return timeline;

    const index = day - 1;
    timeline[index].expenses += amount;
    timeline[index].items.push({
      id: `new_${Date.now()}`,
      vendor: category || "Unexpected Expense",
      amount,
      type: "Receipt",
      synthetic: true,
    });

    return timeline;
  }

  applyReceiveEarly(timeline, move) {
    const { oldDay, newDay, amount, itemId } = move;
    return this.applyDelayPayment(timeline, { oldDay, newDay, amount, itemId });
  }

  applyShortLoan(timeline, move) {
    const { loanAmount, repaymentDay } = move;

    // Add loan income on day 1
    timeline[0].income += loanAmount;
    timeline[0].items.push({
      id: `loan_${Date.now()}`,
      vendor: "Short-term Loan",
      amount: loanAmount,
      type: "Invoice",
      synthetic: true,
    });

    // Add repayment expense on specified day
    const repayIndex = (repaymentDay || 30) - 1;
    const repayAmount = loanAmount * 1.05; // 5% interest
    timeline[repayIndex].expenses += repayAmount;
    timeline[repayIndex].items.push({
      id: `loan_repay_${Date.now()}`,
      vendor: "Loan Repayment",
      amount: repayAmount,
      type: "Receipt",
      synthetic: true,
    });

    return timeline;
  }

  applyPostponeGST(timeline, move, user) {
    const { oldDay, newDay, gstAmount } = move;
    if (oldDay < 1 || oldDay > 30 || newDay < 1 || newDay > 30) return timeline;

    const oldIndex = oldDay - 1;
    const newIndex = newDay - 1;

    // Remove GST from old day
    timeline[oldIndex].expenses -= gstAmount;

    // Add to new day with potential penalty
    let finalAmount = gstAmount;
    if (user.gstScheme === "regular") {
      const daysDelayed = newDay - oldDay;
      if (daysDelayed > 7) {
        finalAmount *= 1.02; // 2% penalty
      }
    }

    timeline[newIndex].expenses += finalAmount;
    timeline[newIndex].items.push({
      id: `gst_${Date.now()}`,
      vendor: "GST Payment (Postponed)",
      amount: finalAmount,
      type: "Receipt",
      synthetic: true,
    });

    return timeline;
  }

  /**
   * Calculate sequential cashflow
   */
  calculateCashflow(timeline, user) {
    let runningCash = 0; // Assume starting balance = 0 (can be parameterized)

    timeline.forEach((day) => {
      runningCash += day.income - day.expenses;
      day.cashBalance = runningCash;
    });

    return timeline;
  }

  /**
   * Detect conflicts and risks
   */
  detectConflicts(timeline, move, user) {
    const conflicts = [];

    // 1. Negative cash detection
    timeline.forEach((day) => {
      if (day.cashBalance < 0) {
        conflicts.push({
          type: "negative_cash",
          severity: "critical",
          day: day.day,
          message: `Cash balance goes negative on Day ${day.day}: ${this.formatCurrency(
            day.cashBalance,
            user.currency
          )}`,
        });
      }
    });

    // 2. Low buffer detection
    const avgDailySpend = this.calculateAverageDailySpend(timeline);
    timeline.forEach((day) => {
      if (day.cashBalance > 0 && day.cashBalance < avgDailySpend * 0.2) {
        conflicts.push({
          type: "low_buffer",
          severity: "warning",
          day: day.day,
          message: `Low cash buffer on Day ${day.day}: Only ${this.formatCurrency(
            day.cashBalance,
            user.currency
          )} remaining`,
        });
      }
    });

    // 3. GST penalty risk
    if (move.type === "postpone_gst" && user.gstScheme === "regular") {
      const daysDelayed = move.newDay - move.oldDay;
      if (daysDelayed > 7) {
        conflicts.push({
          type: "gst_penalty",
          severity: "major",
          day: move.newDay,
          message: `GST payment delayed by ${daysDelayed} days - 2% penalty applied`,
        });
      }
    }

    // 4. Vendor delay risk
    if (move.type === "delay_payment" && move.newDay - move.oldDay > 7) {
      conflicts.push({
        type: "vendor_risk",
        severity: "warning",
        day: move.newDay,
        message: `Payment delayed by ${
          move.newDay - move.oldDay
        } days - may strain vendor relationships`,
      });
    }

    // 5. Liquidity risk (multiple large expenses within 5 days)
    for (let i = 0; i < timeline.length - 4; i++) {
      const window = timeline.slice(i, i + 5);
      const totalExpenses = window.reduce((sum, day) => sum + day.expenses, 0);
      const avgExpense = totalExpenses / 5;
      if (avgExpense > avgDailySpend * 2) {
        conflicts.push({
          type: "liquidity_risk",
          severity: "warning",
          day: i + 1,
          message: `High expense concentration detected: Days ${i + 1}-${i + 5}`,
        });
        break; // Only report once
      }
    }

    return conflicts;
  }

  /**
   * Generate confidence bands
   */
  generateConfidenceBand(timeline) {
    const finalDay = timeline[timeline.length - 1];
    const finalCash = finalDay.cashBalance;

    return {
      worst: Math.round(finalCash * 0.8),
      likely: Math.round(finalCash),
      best: Math.round(finalCash * 1.1),
    };
  }

  /**
   * Generate human-readable explanation
   */
  generateExplanation(move, conflicts, confidenceBand) {
    let explanation = `After applying the "${this.getMoveLabel(
      move.type
    )}" move, `;

    if (conflicts.length === 0) {
      explanation += `your cashflow remains healthy. Final balance is projected between ${confidenceBand.worst} and ${confidenceBand.best}, with most likely outcome at ${confidenceBand.likely}.`;
    } else {
      const criticalCount = conflicts.filter((c) => c.severity === "critical").length;
      const majorCount = conflicts.filter((c) => c.severity === "major").length;
      const warningCount = conflicts.filter((c) => c.severity === "warning").length;

      explanation += `${conflicts.length} potential issue(s) detected: `;
      if (criticalCount > 0) explanation += `${criticalCount} critical, `;
      if (majorCount > 0) explanation += `${majorCount} major, `;
      if (warningCount > 0) explanation += `${warningCount} warning(s). `;

      explanation += `Consider adjusting the move to avoid negative cash or penalties.`;
    }

    return explanation;
  }

  // Helper methods
  calculateAverageDailySpend(timeline) {
    const totalExpenses = timeline.reduce((sum, day) => sum + day.expenses, 0);
    return totalExpenses / timeline.length;
  }

  getMoveLabel(type) {
    const labels = {
      delay_payment: "Delay Payment",
      add_expense: "Add Unexpected Expense",
      receive_early: "Receive Early Payment",
      short_loan: "Short-term Loan",
      postpone_gst: "Postpone GST Payment",
    };
    return labels[type] || type;
  }

  formatCurrency(amount, currency = "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }
}

module.exports = new PredictionEngine();
