import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

function Analytics({ transactions }) {

  const income = transactions
    .filter(item => item.type === "income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const expense = transactions
    .filter(item => item.type === "expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const categories = [
    "Food",
    "Transport",
    "Bills",
    "Shopping",
    "Entertainment"
  ];

  const categoryData = categories
    .map(category => ({
      name: category,
      value: transactions
        .filter(
          item =>
            item.type === "expense" &&
            item.category === category
        )
        .reduce(
          (sum, item) => sum + Number(item.amount),
          0
        )
    }))
    .filter(item => item.value > 0);

  const monthlyData = [
    { month: "Apr", income: 42000, expense: 18000 },
    { month: "May", income: 48000, expense: 22000 },
    { month: "Jun", income: 52000, expense: 24500 },
    { month: "Jul", income: 56000, expense: 21000 },
    { month: "Aug", income: 62000, expense: 19800 },
    { month: "Sep", income, expense }
  ];

  function money(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
  }

  return (
    <div className="page analytics-page">

      <div className="page-header">

        <div>
          <div className="eyebrow">INSIGHTS</div>

          <h1>Analytics</h1>

          <p>
            Understand your spending patterns and financial trends.
          </p>
        </div>

      </div>

      <div className="analytics-stats">

        <div className="analytics-stat">
          <span>Total Income</span>
          <strong className="income-text">
            {money(income)}
          </strong>
        </div>

        <div className="analytics-stat">
          <span>Total Expense</span>
          <strong className="expense-text">
            {money(expense)}
          </strong>
        </div>

        <div className="analytics-stat">
          <span>Net Savings</span>
          <strong>
            {money(income - expense)}
          </strong>
        </div>

      </div>

      <div className="analytics-grid">

        <div className="panel">

          <div className="panel-heading">
            <div>
              <h2>Monthly Income vs Expense</h2>
              <p>Six month financial trend</p>
            </div>
          </div>

          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="#20a36a"
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#ed6257"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        <div className="panel">

          <div className="panel-heading">
            <div>
              <h2>Expense Distribution</h2>
              <p>Where your money goes</p>
            </div>
          </div>

          <div className="analytics-donut">

            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={3}
                  >
                    {categoryData.map((item, index) => (
                      <Cell
                        key={index}
                        fill={
                          [
                            "#f5a623",
                            "#5264a3",
                            "#20a36a",
                            "#b45ac8",
                            "#e76f51"
                          ][index % 5]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="no-data">
                No expense data available.
              </p>
            )}

          </div>

          <div className="analytics-category-list">

            {categoryData.map(item => (
              <div
                className="analytics-category"
                key={item.name}
              >
                <span>{item.name}</span>
                <strong>{money(item.value)}</strong>
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;