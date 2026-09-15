import React from "react";
import "./Home.css";

function Home({ onGetStarted }) {
  return (
    <div className="home-page">
      <nav className="home-navbar">
        <div className="home-logo">
          <div className="home-logo-icon">₹</div>
          <span>ExpenseIQ</span>
        </div>

        <button className="home-login-btn" onClick={onGetStarted}>
          Sign In
        </button>
      </nav>

      <section className="home-hero">
        <div className="home-content">
          <span className="home-badge">SMARTER MONEY MANAGEMENT</span>

          <h1>
            Take Control of Your
            <span> Expenses.</span>
          </h1>

          <p>
            Track your income, manage expenses, set budgets and understand
            where your money goes — all in one simple place.
          </p>

          <button className="get-started-btn" onClick={onGetStarted}>
            Get Started
            <span>→</span>
          </button>

          <div className="home-features">
            <div>
              <span>✓</span>
              Easy to use
            </div>
            <div>
              <span>✓</span>
              Smart insights
            </div>
            <div>
              <span>✓</span>
              Budget tracking
            </div>
          </div>
        </div>

        <div className="home-preview">
          <div className="preview-card">
            <div className="preview-top">
              <div>
                <small>Total Balance</small>
                <h2>₹42,850</h2>
              </div>
              <div className="preview-icon">₹</div>
            </div>

            <div className="preview-stats">
              <div>
                <small>Income</small>
                <strong>₹65,000</strong>
              </div>

              <div>
                <small>Expenses</small>
                <strong>₹22,150</strong>
              </div>
            </div>

            <div className="preview-chart">
              <div className="chart-line line1"></div>
              <div className="chart-line line2"></div>
              <div className="chart-line line3"></div>
              <div className="chart-line line4"></div>
            </div>

            <p className="preview-label">Monthly Spending</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;