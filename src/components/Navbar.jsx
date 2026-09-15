import { useState } from "react";

function Navbar({ setPage }) {
  const [userEmail] = useState(
    localStorage.getItem("userEmail") || "Guest"
  );

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    window.location.reload();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">₹</div>
        <span>ExpenseIQ</span>
      </div>

      <div className="sidebar-menu">
        <button
          className="sidebar-item"
          onClick={() => setPage("dashboard")}
        >
          <span>📊</span>
          Dashboard
        </button>

        <button
          className="sidebar-item"
          onClick={() => setPage("transactions")}
        >
          <span>💳</span>
          Transactions
        </button>

        <button
          className="sidebar-item"
          onClick={() => setPage("analytics")}
        >
          <span>📈</span>
          Analytics
        </button>

        <button
          className="sidebar-item"
          onClick={() => setPage("budgets")}
        >
          <span>💰</span>
          Budgets
        </button>
      </div>

      <div className="sidebar-bottom">
        <div className="user-profile">
          <div className="user-avatar">
            {userEmail.charAt(0).toUpperCase()}
          </div>

          <div className="user-info">
            <span className="user-label">Logged in as</span>
            <span className="user-email">{userEmail}</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Navbar;