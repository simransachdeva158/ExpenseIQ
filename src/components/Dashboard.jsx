// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell
// } from "recharts";

// function Dashboard({ transactions, setPage }) {

//   const income = transactions
//     .filter(item => item.type === "income")
//     .reduce((sum, item) => sum + Number(item.amount), 0);

//   const expense = transactions
//     .filter(item => item.type === "expense")
//     .reduce((sum, item) => sum + Number(item.amount), 0);

//   const balance = income - expense;

//   const savingsRate =
//     income > 0 ? Math.round((balance / income) * 100) : 0;

//   const categoryData = [
//     "Food",
//     "Transport",
//     "Bills",
//     "Shopping"
//   ]
//     .map(category => ({
//       name: category,
//       value: transactions
//         .filter(
//           item =>
//             item.type === "expense" &&
//             item.category === category
//         )
//         .reduce(
//           (sum, item) => sum + Number(item.amount),
//           0
//         )
//     }))
//     .filter(item => item.value > 0);

//   const monthlyData = [
//     { month: "Apr", income: 42000, expense: 18000 },
//     { month: "May", income: 48000, expense: 22000 },
//     { month: "Jun", income: 52000, expense: 24500 },
//     { month: "Jul", income: 56000, expense: 21000 },
//     { month: "Aug", income: 62000, expense: 19800 },
//     { month: "Sep", income, expense }
//   ];

//   const recent = [...transactions]
//     .sort((a, b) => b.date.localeCompare(a.date))
//     .slice(0, 5);

//   function money(value) {
//     return "₹" + Number(value).toLocaleString("en-IN");
//   }

//   return (
//     <div className="page dashboard-page">

//       <div className="page-header">

//         <div>
//           <div className="eyebrow">OVERVIEW</div>

//           <h1>Your financial snapshot</h1>

//           <p>
//             Everything you need to understand where your money is going.
//           </p>
//         </div>

//         <button
//           className="primary-btn"
//           onClick={() => setPage("transactions")}
//         >
//           + Add Transaction
//         </button>

//       </div>

//       <div className="summary-grid">

//         <div className="summary-card balance">
//           <div className="card-icon">₹</div>
//           <span>Current Balance</span>
//           <h2>{money(balance)}</h2>
//           <small>↑ 8.2% vs last month</small>
//         </div>

//         <div className="summary-card income">
//           <div className="card-icon">↗</div>
//           <span>Total Income</span>
//           <h2>{money(income)}</h2>
//           <small>Money received</small>
//         </div>

//         <div className="summary-card expense">
//           <div className="card-icon">↘</div>
//           <span>Total Expense</span>
//           <h2>{money(expense)}</h2>
//           <small>Money spent</small>
//         </div>

//         <div className="summary-card savings">
//           <div className="card-icon">%</div>
//           <span>Savings Rate</span>
//           <h2>{savingsRate}%</h2>
//           <small>Keep it up!</small>
//         </div>

//       </div>

//       <div className="charts-grid">

//         <div className="panel large-panel">

//           <div className="panel-heading">
//             <div>
//               <h2>Income vs Expenses</h2>
//               <p>Monthly financial trend</p>
//             </div>

//             <span className="period-label">
//               Last 6 months
//             </span>
//           </div>

//           <div className="chart-box">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={monthlyData}>
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar
//                   dataKey="income"
//                   name="Income"
//                   fill="#20a36a"
//                   radius={[4, 4, 0, 0]}
//                 />
//                 <Bar
//                   dataKey="expense"
//                   name="Expense"
//                   fill="#ed6257"
//                   radius={[4, 4, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//         </div>

//         <div className="panel">

//           <div className="panel-heading">
//             <div>
//               <h2>Spending by Category</h2>
//               <p>This month's breakdown</p>
//             </div>
//           </div>

//           <div className="donut-box">

//             {categoryData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={categoryData}
//                     dataKey="value"
//                     nameKey="name"
//                     innerRadius={65}
//                     outerRadius={95}
//                     paddingAngle={4}
//                   >
//                     {categoryData.map((entry, index) => (
//                       <Cell
//                         key={index}
//                         fill={
//                           [
//                             "#f5a623",
//                             "#5264a3",
//                             "#20a36a",
//                             "#b45ac8"
//                           ][index % 4]
//                         }
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             ) : (
//               <p className="no-data">No spending data</p>
//             )}

//           </div>

//           <div className="category-list">

//             {categoryData.map(item => (
//               <div className="category-row" key={item.name}>
//                 <span>
//                   <i></i>
//                   {item.name}
//                 </span>

//                 <strong>{money(item.value)}</strong>
//               </div>
//             ))}

//           </div>

//         </div>

//       </div>

//       <div className="panel recent-panel">

//         <div className="panel-heading">

//           <div>
//             <h2>Recent Transactions</h2>
//             <p>Your latest activity</p>
//           </div>

//           <button
//             className="text-btn"
//             onClick={() => setPage("transactions")}
//           >
//             View all →
//           </button>

//         </div>

//         <div className="recent-list">

//           {recent.map(item => (
//             <div className="recent-item" key={item.id}>

//               <div className={`transaction-icon ${item.type}`}>
//                 {item.type === "income" ? "↗" : "↘"}
//               </div>

//               <div className="recent-info">
//                 <strong>{item.title}</strong>
//                 <span>
//                   {item.category} • {item.date}
//                 </span>
//               </div>

//               <strong
//                 className={
//                   item.type === "income"
//                     ? "amount income-text"
//                     : "amount expense-text"
//                 }
//               >
//                 {item.type === "income" ? "+" : "-"}
//                 {money(item.amount)}
//               </strong>

//             </div>
//           ))}

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Dashboard;

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

function Dashboard({ transactions, setPage }) {

  const income = transactions
    .filter(item => item.type === "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const expense = transactions
    .filter(item => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = income - expense;

  const savingsRate =
    income > 0 ? Math.round((balance / income) * 100) : 0;

  const categoryData = [
    "Food & Dining",
    "Transport",
    "Shopping",
    "Bills & Utilities",
    "Entertainment",
    "Other"
  ]
    .map(category => ({
      name: category,
      value: transactions
        .filter(
          item =>
            item.type === "Expense" &&
            item.category === category
        )
        .reduce(
          (sum, item) => sum + Number(item.amount),
          0
        )
    }))
    .filter(item => item.value > 0);

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

  const recent = [...transactions]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  function money(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
  }

  return (
    <div className="page dashboard-page">

      <div className="page-header">

        <div>
          <div className="eyebrow">OVERVIEW</div>

          <h1>Your financial snapshot</h1>

          <p>
            Everything you need to understand where your money is going.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setPage("transactions")}
        >
          + Add Transaction
        </button>

      </div>

      <div className="summary-grid">

        <div className="summary-card balance">
          <div className="card-icon">₹</div>
          <span>Current Balance</span>
          <h2>{money(balance)}</h2>
          <small>Updated automatically</small>
        </div>

        <div className="summary-card income">
          <div className="card-icon">↗</div>
          <span>Total Income</span>
          <h2>{money(income)}</h2>
          <small>Money received</small>
        </div>

        <div className="summary-card expense">
          <div className="card-icon">↘</div>
          <span>Total Expense</span>
          <h2>{money(expense)}</h2>
          <small>Money spent</small>
        </div>

        <div className="summary-card savings">
          <div className="card-icon">%</div>
          <span>Savings Rate</span>
          <h2>{savingsRate}%</h2>
          <small>Based on your income</small>
        </div>

      </div>

      <div className="charts-grid">

        <div className="panel large-panel">

          <div className="panel-heading">

            <div>
              <h2>Income vs Expenses</h2>
              <p>Monthly financial trend</p>
            </div>

            <span className="period-label">
              Last 6 months
            </span>

          </div>

          <div className="chart-box">

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
                  radius={[4, 4, 0, 0]}
                />

                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="#ed6257"
                  radius={[4, 4, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="panel">

          <div className="panel-heading">

            <div>
              <h2>Spending by Category</h2>
              <p>This month's breakdown</p>
            </div>

          </div>

          <div className="donut-box">

            {categoryData.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                  >

                    {categoryData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          [
                            "#f5a623",
                            "#5264a3",
                            "#20a36a",
                            "#b45ac8",
                            "#ed6257",
                            "#7b8cde"
                          ][index % 6]
                        }
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            ) : (

              <p className="no-data">
                No spending data
              </p>

            )}

          </div>

          <div className="category-list">

            {categoryData.map(item => (

              <div
                className="category-row"
                key={item.name}
              >

                <span>
                  <i></i>
                  {item.name}
                </span>

                <strong>
                  {money(item.value)}
                </strong>

              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="panel recent-panel">

        <div className="panel-heading">

          <div>
            <h2>Recent Transactions</h2>
            <p>Your latest activity</p>
          </div>

          <button
            className="text-btn"
            onClick={() => setPage("transactions")}
          >
            View all →
          </button>

        </div>

        <div className="recent-list">

          {recent.length === 0 ? (

            <p className="no-data">
              No transactions yet
            </p>

          ) : (

            recent.map(item => (

              <div
                className="recent-item"
                key={item.id}
              >

                <div
                  className={`transaction-icon ${
                    item.type === "Income"
                      ? "income"
                      : "expense"
                  }`}
                >
                  {item.type === "Income"
                    ? "↗"
                    : "↘"}
                </div>

                <div className="recent-info">

                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {item.category} • {item.date}
                  </span>

                </div>

                <strong
                  className={
                    item.type === "Income"
                      ? "amount income-text"
                      : "amount expense-text"
                  }
                >

                  {item.type === "Income"
                    ? "+"
                    : "-"}

                  {money(item.amount)}

                </strong>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;