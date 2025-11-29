import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import KPICard from "../components/dashboard/KPICard";
import GraphIncomeExpense from "../components/dashboard/GraphIncomeExpense";
import GraphSegments from "../components/dashboard/GraphSegments";
import GraphGST from "../components/dashboard/GraphGST";
import RecentTransactionsTable from "../components/dashboard/RecentTransactionsTable";
import VendorSummaryTable from "../components/dashboard/VendorSummaryTable";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || "morning";
  });
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themeOrder = ["morning", "evening", "night"];
  const nextTheme = () => {
    const idx = themeOrder.indexOf(theme);
    setTheme(themeOrder[(idx + 1) % themeOrder.length]);
  };

  // Mock Data
  const kpiData = {
    revenue: { value: "₹12,45,000", trend: 12.5, subtitle: "vs last month" },
    expenses: { value: "₹8,32,000", trend: -5.2, subtitle: "vs last month" },
    profit: { value: "₹4,13,000", trend: 28.3, subtitle: "vs last month" },
    gstCollected: { value: "₹2,24,100", trend: 8.7, subtitle: "this quarter" }
  };

  const incomeExpenseData = [
    { month: 'Jan', income: 120000, expense: 80000 },
    { month: 'Feb', income: 135000, expense: 85000 },
    { month: 'Mar', income: 128000, expense: 82000 },
    { month: 'Apr', income: 145000, expense: 88000 },
    { month: 'May', income: 152000, expense: 90000 },
    { month: 'Jun', income: 148000, expense: 87000 }
  ];

  const segmentData = [
    { name: 'Product Sales', value: 450000 },
    { name: 'Services', value: 320000 },
    { name: 'Consulting', value: 280000 },
    { name: 'Subscriptions', value: 195000 }
  ];

  const gstData = [
    { month: 'Jan', input: 18000, output: 21600 },
    { month: 'Feb', input: 19500, output: 24300 },
    { month: 'Mar', input: 18500, output: 23040 },
    { month: 'Apr', input: 20000, output: 26100 },
    { month: 'May', input: 21000, output: 27360 },
    { month: 'Jun', input: 20500, output: 26640 }
  ];

  const transactions = [
    { date: '2025-11-28', description: 'Invoice #INV-2501', category: 'Sales', amount: 45000, type: 'income', status: 'Completed' },
    { date: '2025-11-27', description: 'Vendor Payment - ABC Corp', category: 'Purchase', amount: 28000, type: 'expense', status: 'Completed' },
    { date: '2025-11-26', description: 'Service Invoice #SRV-890', category: 'Services', amount: 32000, type: 'income', status: 'Pending' },
    { date: '2025-11-25', description: 'Utility Bill - Electricity', category: 'Utilities', amount: 8500, type: 'expense', status: 'Completed' },
    { date: '2025-11-24', description: 'Consulting Fee - XYZ Ltd', category: 'Consulting', amount: 55000, type: 'income', status: 'Completed' }
  ];

  const vendors = [
    { name: 'ABC Corporation', type: 'Vendor', transactions: 45, amount: 425000, outstanding: 28000 },
    { name: 'XYZ Enterprises', type: 'Customer', transactions: 32, amount: 680000, outstanding: 0 },
    { name: 'Tech Solutions Ltd', type: 'Vendor', transactions: 28, amount: 320000, outstanding: 15000 },
    { name: 'Global Services Inc', type: 'Customer', transactions: 38, amount: 520000, outstanding: 42000 },
    { name: 'Prime Suppliers', type: 'Vendor', transactions: 22, amount: 185000, outstanding: 0 }
  ];

  const alerts = [
    { type: 'warning', title: 'GST Return Due', message: 'GSTR-3B filing due in 5 days', date: 'Due: Dec 20, 2025' },
    { type: 'info', title: 'Quarterly Review', message: 'Q4 financial review scheduled', date: 'Dec 15, 2025' },
    { type: 'error', title: 'Outstanding Payment', message: '3 invoices overdue by 30+ days', date: 'Action Required' },
    { type: 'success', title: 'Tax Compliance', message: 'All returns filed successfully', date: 'Updated: Nov 28' }
  ];

  return (
    <div className={`dashboard-container theme-${theme}`}>
      {/* Floating Background Shapes */}
      <div className="floating-shapes-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>

      <Navbar theme={theme} onThemeToggle={nextTheme} showAuthButtons={false} />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>Financial Dashboard</h1>
            <p>Overview of your business metrics and compliance status</p>
          </div>
          <div className="dashboard-actions">
            <button className="btn-secondary">Export Report</button>
            <button className="btn-primary">Upload Invoice</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          <KPICard 
            title={t('dashboard.kpi.totalRevenue')} 
            value={kpiData.revenue.value} 
            subtitle={kpiData.revenue.subtitle} 
            trend={kpiData.revenue.trend} 
          />
          <KPICard 
            title={t('dashboard.kpi.totalExpenses')} 
            value={kpiData.expenses.value} 
            subtitle={kpiData.expenses.subtitle} 
            trend={kpiData.expenses.trend} 
          />
          <KPICard 
            title={t('dashboard.kpi.netProfit')} 
            value={kpiData.profit.value} 
            subtitle={kpiData.profit.subtitle} 
            trend={kpiData.profit.trend} 
          />
          <KPICard 
            title={t('dashboard.kpi.gstCollected')} 
            value={kpiData.gstCollected.value} 
            subtitle={kpiData.gstCollected.subtitle} 
            trend={kpiData.gstCollected.trend} 
          />
        </div>

        {/* Charts Row */}
        <div className="charts-grid">
          <div className="chart-full">
            <GraphIncomeExpense data={incomeExpenseData} />
          </div>
        </div>

        <div className="charts-grid-two">
          <GraphSegments data={segmentData} />
          <GraphGST data={gstData} />
        </div>

        {/* Tables Section */}
        <div className="tables-grid">
          <RecentTransactionsTable transactions={transactions} />
        </div>

        <div className="tables-grid">
          <VendorSummaryTable vendors={vendors} />
        </div>

        {/* Alerts Panel */}
        <div className="alerts-grid">
          <AlertsPanel alerts={alerts} />
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Charter.ai</h4>
            <p>{t('home.footer.tagline')}</p>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <p>support@charter.ai</p>
          </div>
        </div>
        <div className="footer-bottom">
          {t('home.footer.copyright')}
        </div>
      </footer>
    </div>
  );
}
