import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";

function Analytics({ transactions }) {
  const [trendType, setTrendType] = useState("expense");

  const incomeTransactions = transactions.filter(
    item => item.type === "Income"
  );

  const expenseTransactions = transactions.filter(
    item => item.type === "Expense"
  );

  const income = incomeTransactions.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const expense = expenseTransactions.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  const averageExpense =
    expenseTransactions.length > 0
      ? expense / expenseTransactions.length
      : 0;

  const savingsRate =
    income > 0
      ? Math.round(((income - expense) / income) * 100)
      : 0;

  const largestExpense =
    expenseTransactions.length > 0
      ? expenseTransactions.reduce(
          (largest, item) =>
            Number(item.amount) > Number(largest.amount)
              ? item
              : largest,
          expenseTransactions[0]
        )
      : null;

  const categories = [
    "Food & Dining",
    "Transport",
    "Shopping",
    "Bills & Utilities",
    "Entertainment",
    "Other"
  ];

  const categoryData = categories
    .map(category => {
      const value = expenseTransactions
        .filter(item => item.category === category)
        .reduce(
          (sum, item) => sum + Number(item.amount),
          0
        );

      return {
        name: category,
        value
      };
    })
    .filter(item => item.value > 0);

  const highestCategory =
    categoryData.length > 0
      ? categoryData.reduce(
          (highest, item) =>
            item.value > highest.value ? item : highest,
          categoryData[0]
        )
      : null;

  const currentDate = new Date();
  const monthlyData = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );

    const monthName = date.toLocaleString("en-US", {
      month: "short"
    });

    const year = date.getFullYear();
    const month = date.getMonth();

    const monthTransactions = transactions.filter(item => {
      const transactionDate = new Date(item.date);

      return (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() === month
      );
    });

    const monthlyIncome = monthTransactions
      .filter(item => item.type === "Income")
      .reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

    const monthlyExpense = monthTransactions
      .filter(item => item.type === "Expense")
      .reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

    monthlyData.push({
      month: monthName,
      income: monthlyIncome,
      expense: monthlyExpense
    });
  }

  function money(value) {
    return (
      "₹" +
      Number(value).toLocaleString("en-IN")
    );
  }

  return (
    <div className="page analytics-page">

      <div className="page-header">
        <div>
          <div className="eyebrow">
            INSIGHTS
          </div>

          <h1>Analytics</h1>

          <p>
            Understand your spending patterns and financial trends.
          </p>
        </div>
      </div>


      {/* TOP CARDS */}

      <div className="analytics-top-cards">

        <div className="insight-card average-card">
          <div className="insight-icon">₹</div>

          <div>
            <span>Average Expense</span>

            <strong>
              {money(averageExpense)}
            </strong>

            <small>
              Per expense transaction
            </small>
          </div>
        </div>


        <div className="insight-card largest-card">
          <div className="insight-icon">★</div>

          <div>
            <span>Largest Expense</span>

            <strong>
              {largestExpense
                ? money(largestExpense.amount)
                : "₹0"}
            </strong>

            <small>
              {largestExpense
                ? largestExpense.category
                : "No expense data"}
            </small>
          </div>
        </div>


        <div className="insight-card savings-card">
          <div className="insight-icon">₹</div>

          <div>
            <span>Savings Rate</span>

            <strong>
              {savingsRate}%
            </strong>

            <small>
              Based on income and expenses
            </small>
          </div>
        </div>

      </div>


      {/* CHARTS */}

      <div className="analytics-main-grid">


        {/* MONTHLY SPENDING */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>
              <h2>Monthly Spending Trend</h2>

              <p>
                Your financial activity over the last six months
              </p>
            </div>

            <div className="chart-toggle">

              <button
                className={
                  trendType === "expense"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setTrendType("expense")
                }
              >
                Expense
              </button>

              <button
                className={
                  trendType === "income"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setTrendType("income")
                }
              >
                Income
              </button>

            </div>

          </div>


          <div className="analytics-chart-large">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart data={monthlyData}>

                <defs>
                  <linearGradient
                    id="expenseGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#ed6257"
                      stopOpacity={0.25}
                    />

                    <stop
                      offset="95%"
                      stopColor="#ed6257"
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient
                    id="incomeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#20a36a"
                      stopOpacity={0.2}
                    />

                    <stop
                      offset="95%"
                      stopColor="#20a36a"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey={trendType}
                  stroke={
                    trendType === "expense"
                      ? "#ed6257"
                      : "#20a36a"
                  }
                  fill={
                    trendType === "expense"
                      ? "url(#expenseGradient)"
                      : "url(#incomeGradient)"
                  }
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* INCOME VS EXPENSE */}

        <div className="analytics-panel">

          <div className="analytics-panel-header">

            <div>
              <h2>Income vs Expense</h2>

              <p>
                Compare your monthly financial activity
              </p>
            </div>

          </div>


          <div className="analytics-chart-large">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#20a36a"
                  radius={[5, 5, 0, 0]}
                />

                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#ed6257"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* FINANCIAL INSIGHTS */}

      <div className="analytics-panel financial-insights">

        <div className="analytics-panel-header">

          <div>
            <h2>Financial Insights</h2>

            <p>
              Key takeaways from your spending
            </p>
          </div>

        </div>


        <div className="financial-insight-grid">

          <div className="financial-item">
            <span>Highest Category</span>

            <strong>
              {highestCategory
                ? highestCategory.name
                : "No data"}
            </strong>

            <small>
              {highestCategory
                ? money(highestCategory.value)
                : "₹0"}
            </small>
          </div>


          <div className="financial-item">
            <span>Average Expense</span>

            <strong>
              {money(averageExpense)}
            </strong>

            <small>
              Per transaction
            </small>
          </div>


          <div className="financial-item">
            <span>Savings Rate</span>

            <strong>
              {savingsRate}%
            </strong>

            <small>
              Of your income
            </small>
          </div>


          <div className="financial-item">
            <span>Expense Transactions</span>

            <strong>
              {expenseTransactions.length}
            </strong>

            <small>
              Total entries
            </small>
          </div>

        </div>

      </div>


      {/* LARGEST EXPENSE */}

      <div className="analytics-panel largest-expense-panel">

        <div className="analytics-panel-header">

          <div>
            <h2>Largest Expense</h2>

            <p>
              Your highest individual spending transaction
            </p>
          </div>

        </div>


        {largestExpense ? (

          <div className="largest-expense-box">

            <div className="largest-expense-icon">
              ₹
            </div>

            <div className="largest-expense-info">

              <strong>
                {largestExpense.category}
              </strong>

              <span>
                {largestExpense.date}
              </span>

              {largestExpense.note && (
                <small>
                  {largestExpense.note}
                </small>
              )}

            </div>

            <strong className="largest-expense-amount">
              {money(largestExpense.amount)}
            </strong>

          </div>

        ) : (

          <p className="no-data">
            No expense data available.
          </p>

        )}

      </div>

    </div>
  );
}

export default Analytics;