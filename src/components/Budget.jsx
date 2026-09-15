function Budget({
  transactions,
  budgets,
  setBudgets
}) {

  const categories = Object.keys(budgets);

  function money(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
  }

  function spent(category) {
    return transactions
      .filter(
        item =>
          item.type === "expense" &&
          item.category === category
      )
      .reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );
  }

  function updateBudget(category, value) {
    setBudgets({
      ...budgets,
      [category]: Number(value)
    });
  }

  return (
    <div className="page budget-page">

      <div className="page-header">

        <div>
          <div className="eyebrow">PLANNING</div>

          <h1>Monthly Budgets</h1>

          <p>
            Set limits and keep your spending under control.
          </p>
        </div>

      </div>

      <div className="budget-summary">

        <div>
          <span>Categories</span>
          <strong>{categories.length}</strong>
        </div>

        <div>
          <span>Total Budget</span>
          <strong>
            {money(
              categories.reduce(
                (sum, category) =>
                  sum + budgets[category],
                0
              )
            )}
          </strong>
        </div>

        <div>
          <span>Total Spent</span>
          <strong className="expense-text">
            {money(
              categories.reduce(
                (sum, category) =>
                  sum + spent(category),
                0
              )
            )}
          </strong>
        </div>

      </div>

      <div className="budget-grid">

        {categories.map(category => {

          const amount = spent(category);
          const limit = budgets[category];

          const percentage =
            limit > 0
              ? Math.min((amount / limit) * 100, 100)
              : 0;

          const over = amount > limit;

          return (
            <div
              className={`budget-card-large ${
                over ? "budget-over" : ""
              }`}
              key={category}
            >

              <div className="budget-card-top">

                <div className="budget-category-icon">
                  {category === "Food"
                    ? "🍴"
                    : category === "Transport"
                    ? "🚗"
                    : category === "Bills"
                    ? "▣"
                    : "🛍"}
                </div>

                <div>
                  <h3>{category}</h3>

                  <p>
                    {over
                      ? "Over budget"
                      : "On track"}
                  </p>
                </div>

              </div>

              <div className="budget-numbers">

                <div>
                  <span>Spent</span>
                  <strong>{money(amount)}</strong>
                </div>

                <div>
                  <span>Limit</span>
                  <strong>{money(limit)}</strong>
                </div>

              </div>

              <div className="large-progress">

                <div
                  className={
                    over
                      ? "large-progress-fill over"
                      : percentage > 75
                      ? "large-progress-fill warning"
                      : "large-progress-fill"
                  }
                  style={{
                    width: `${percentage}%`
                  }}
                />

              </div>

              <div className="budget-percentage">
                <span>{Math.round(percentage)}% used</span>

                {over && (
                  <strong>⚠ Over budget</strong>
                )}
              </div>

              <div className="budget-input">

                <label>Monthly limit</label>

                <input
                  type="number"
                  value={budgets[category]}
                  onChange={e =>
                    updateBudget(
                      category,
                      e.target.value
                    )
                  }
                />

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Budget;