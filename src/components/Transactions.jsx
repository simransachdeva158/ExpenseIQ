import React, { useMemo, useState } from "react";
import "./Transactions.css";

const budgets = [
  { name: "Food & Dining", limit: 9000 },
  { name: "Transport", limit: 5000 },
  { name: "Shopping", limit: 10000 },
  { name: "Bills & Utilities", limit: 8000 },
];

const categories = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Bills & Utilities",
  "Entertainment",
  "Other",
];

function Transactions({ transactions, setTransactions }) {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2026-09-15");
  const [category, setCategory] = useState("Food & Dining");
  const [note, setNote] = useState("");

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  const categorySpent = (categoryName) => {
    return transactions
      .filter(
        (t) =>
          t.type === "Expense" &&
          t.category === categoryName
      )
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const currentCategorySpent = categorySpent(category);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filter === "Income") {
      result = result.filter((t) => t.type === "Income");
    }

    if (filter === "Expense") {
      result = result.filter((t) => t.type === "Expense");
    }

    if (filter === "This Month") {
      result = result.filter((t) => t.date.startsWith("2026-09"));
    }

    if (search.trim()) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [transactions, filter, search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title:
        note.trim() ||
        (type === "Expense" ? "New Expense" : "New Income"),
      category: type === "Income" ? "Income" : category,
      date,
      amount: Number(amount),
      type,
    };

    setTransactions([newTransaction, ...transactions]);

    setAmount("");
    setNote("");
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);

    return dateObj.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className="transactions-page">

      <div className="transactions-heading">
        <div>
          <span className="section-label">04 · TRANSACTIONS</span>
          <h1>Smart Transaction Entry</h1>
          <p>
            Add, validate and track your transactions in real time.
          </p>
        </div>
      </div>

      <section className="entry-section">

        <div className="entry-card">

          <div className="type-switch">
            <button
              className={type === "Expense" ? "active" : ""}
              onClick={() => setType("Expense")}
              type="button"
            >
              − Expense
            </button>

            <button
              className={
                type === "Income"
                  ? "active income-active"
                  : ""
              }
              onClick={() => setType("Income")}
              type="button"
            >
              + Income
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>AMOUNT (₹)</label>

                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                />

                {amount !== "" &&
                  Number(amount) <= 0 && (
                    <span className="error-text">
                      Amount must be greater than 0
                    </span>
                  )}
              </div>

              <div className="form-group">
                <label>DATE</label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                />
              </div>

            </div>

            {type === "Expense" && (
              <div className="form-group category-group">

                <label>CATEGORY</label>

                <div className="category-options">

                  {categories.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        category === item
                          ? "category-btn selected"
                          : "category-btn"
                      }
                      onClick={() =>
                        setCategory(item)
                      }
                    >
                      {item}
                    </button>
                  ))}

                </div>
              </div>
            )}

            <div className="form-group">
              <label>NOTE</label>

              <input
                type="text"
                placeholder="Add a short note (optional)"
                value={note}
                onChange={(e) =>
                  setNote(e.target.value)
                }
              />
            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setAmount("");
                  setNote("");
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                Save Transaction
              </button>

            </div>

          </form>
        </div>

        <div className="preview-column">

          <div className="live-preview">

            <span className="preview-label">
              LIVE PREVIEW
            </span>

            <h2>
              {type === "Expense" ? "−" : "+"} ₹
              {amount
                ? Number(amount).toLocaleString("en-IN")
                : "0.00"}
            </h2>

            <p className="preview-text">
              Balance updates automatically once saved.
            </p>

            <div className="preview-row">
              <span>Current Balance</span>

              <strong>
                ₹{balance.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="preview-row">
              <span>Category</span>

              <strong>
                {type === "Income"
                  ? "Income"
                  : category}
              </strong>
            </div>

            <div className="preview-row">
              <span>This Category</span>

              <strong>
                ₹
                {currentCategorySpent.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

          </div>

          <div className="budget-status">

            <div className="card-title-row">
              <h3>Budget Status</h3>
              <span>LIVE</span>
            </div>

            {budgets.slice(0, 3).map((budget) => {

              const spent = categorySpent(
                budget.name
              );

              const percentage = Math.min(
                (spent / budget.limit) * 100,
                100
              );

              return (
                <div
                  className="budget-item"
                  key={budget.name}
                >

                  <div className="budget-top">
                    <span>{budget.name}</span>

                    <span>
                      ₹{spent.toLocaleString("en-IN")} /
                      ₹{budget.limit.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="progress-track">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                  {spent > budget.limit && (
                    <span className="over-budget">
                      OVER BUDGET
                    </span>
                  )}

                </div>
              );
            })}

          </div>

        </div>
      </section>

      <section className="all-transactions-section">

        <div className="section-top">

          <div>
            <span className="section-label">
              05 · ACTIVITY
            </span>

            <h2>All Transactions</h2>
          </div>

          <button className="export-btn">
            ↓ Export CSV
          </button>

        </div>

        <div className="filters">

          <div className="filter-buttons">

            {[
              "All",
              "Income",
              "Expense",
              "This Month",
            ].map((item) => (
              <button
                key={item}
                className={
                  filter === item
                    ? "filter-btn active-filter"
                    : "filter-btn"
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {item}
              </button>
            ))}

          </div>

          <input
            className="search-input"
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="transactions-content">

          <div className="transaction-list-card">

            <div className="table-header">
              <span>TRANSACTION</span>
              <span>CATEGORY</span>
              <span>DATE</span>
              <span>AMOUNT</span>
              <span></span>
            </div>

            {filteredTransactions.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">₹</div>

                <h3>No transactions found</h3>

                <p>
                  Try changing your filters or add a new
                  transaction.
                </p>

              </div>

            ) : (

              filteredTransactions.map(
                (transaction) => (

                  <div
                    className="transaction-row"
                    key={transaction.id}
                  >

                    <div className="transaction-name">

                      <strong>
                        {transaction.title}
                      </strong>

                      <span>
                        {transaction.type === "Income"
                          ? "Income received"
                          : "Expense recorded"}
                      </span>

                    </div>

                    <div>

                      <span
                        className={`category-pill ${transaction.category
                          .toLowerCase()
                          .replaceAll(" ", "-")
                          .replaceAll("&", "")}`}
                      >
                        {transaction.category}
                      </span>

                    </div>

                    <span className="date-text">
                      {formatDate(
                        transaction.date
                      )}
                    </span>

                    <strong
                      className={
                        transaction.type === "Income"
                          ? "amount income"
                          : "amount expense"
                      }
                    >
                      {transaction.type === "Income"
                        ? "+"
                        : "−"}
                      ₹
                      {transaction.amount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteTransaction(
                          transaction.id
                        )
                      }
                    >
                      ×
                    </button>

                  </div>
                )
              )
            )}

          </div>

          <div className="right-summary">

            <div className="category-budget-card">

              <h3>Category Budgets</h3>

              {budgets.map((budget) => {

                const spent = categorySpent(
                  budget.name
                );

                const percentage = Math.min(
                  (spent / budget.limit) * 100,
                  100
                );

                return (
                  <div
                    className="category-budget"
                    key={budget.name}
                  >

                    <div className="category-budget-head">

                      <strong>
                        {budget.name}
                      </strong>

                      <span>
                        ₹{spent.toLocaleString("en-IN")} /
                        ₹{budget.limit.toLocaleString("en-IN")}
                      </span>

                    </div>

                    <div className="budget-bar">

                      <div
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    {spent > budget.limit && (
                      <small>
                        OVER BUDGET
                      </small>
                    )}

                  </div>
                );
              })}

            </div>

            <div className="filter-summary">

              <h3>Filter Summary</h3>

              <p>
                Showing{" "}
                <strong>
                  {filteredTransactions.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {transactions.length}
                </strong>{" "}
                transactions
              </p>

              <p>
                Net range:
                <strong className="summary-green">
                  {" "}
                  ₹{balance.toLocaleString("en-IN")}
                </strong>
              </p>

              <p>
                Date range:
                <strong>
                  {" "}
                  01–15 Sep 2026
                </strong>
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Transactions;