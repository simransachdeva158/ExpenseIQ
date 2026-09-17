function Navbar({ page, setPage }) {
  const email = localStorage.getItem("userEmail") || "";
  const initial = email.charAt(0).toUpperCase();

  return (
    <nav className="navbar">

      <div className="brand">
        <div className="brand-icon">₹</div>

        <div>
          <h2>ExpenseIQ</h2>
          <span>Smart Money Tracker</span>
        </div>
      </div>

      <div className="nav-links">

        <button
          className={page === "dashboard" ? "nav-link active" : "nav-link"}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={page === "transactions" ? "nav-link active" : "nav-link"}
          onClick={() => setPage("transactions")}
        >
          Transactions
        </button>

        <button
          className={page === "analytics" ? "nav-link active" : "nav-link"}
          onClick={() => setPage("analytics")}
        >
          Analytics
        </button>

        <button
          className={page === "budget" ? "nav-link active" : "nav-link"}
          onClick={() => setPage("budget")}
        >
          Budgets
        </button>

      </div>

      <div className="profile">
        {initial}
      </div>

    </nav>
  );
}

export default Navbar;