// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import Transactions from "./components/Transactions";
// import Analytics from "./components/Analytics";
// import Budget from "./components/Budget";
// import "./App.css";

// function App() {
//   const [screen, setScreen] = useState("home");
//   const [page, setPage] = useState("dashboard");

//   const [transactions, setTransactions] = useState([
//     {
//       id: 1,
//       title: "Swiggy Order",
//       type: "expense",
//       amount: 460,
//       category: "Food",
//       date: "2026-09-13",
//       note: "Dinner with friends"
//     },
//     {
//       id: 2,
//       title: "Freelance Payment",
//       type: "income",
//       amount: 12000,
//       category: "Income",
//       date: "2026-09-12",
//       note: "Logo design project"
//     },
//     {
//       id: 3,
//       title: "Ola Cab",
//       type: "expense",
//       amount: 220,
//       category: "Transport",
//       date: "2026-09-12",
//       note: "Airport drop"
//     },
//     {
//       id: 4,
//       title: "Electricity Bill",
//       type: "expense",
//       amount: 1840,
//       category: "Bills",
//       date: "2026-09-10",
//       note: "September cycle"
//     },
//     {
//       id: 5,
//       title: "Uber Rides",
//       type: "expense",
//       amount: 980,
//       category: "Transport",
//       date: "2026-09-09",
//       note: "Weekly commute"
//     },
//     {
//       id: 6,
//       title: "Grocery Store",
//       type: "expense",
//       amount: 2340,
//       category: "Food",
//       date: "2026-09-07",
//       note: "Monthly essentials"
//     },
//     {
//       id: 7,
//       title: "Salary Credit",
//       type: "income",
//       amount: 56000,
//       category: "Income",
//       date: "2026-09-01",
//       note: "September payout"
//     }
//   ]);

//   const [budgets, setBudgets] = useState({
//     Food: 9000,
//     Transport: 6000,
//     Shopping: 10000,
//     Bills: 8000
//   });

//   if (screen === "home") {
//     return (
//       <Home
//         onGetStarted={() => setScreen("login")}
//       />
//     );
//   }

//   if (screen === "login") {
//     return (
//       <Login
//         onLogin={() => setScreen("app")}
//         onBack={() => setScreen("home")}
//       />
//     );
//   }

//   return (
//     <div className="app">
//       <Navbar
//         page={page}
//         setPage={setPage}
//       />

//       <main className="main-content">

//         {page === "dashboard" && (
//           <Dashboard
//             transactions={transactions}
//             setPage={setPage}
//           />
//         )}

//         {page === "transactions" && (
//           <Transactions
//             transactions={transactions}
//             setTransactions={setTransactions}
//             budgets={budgets}
//           />
//         )}

//         {page === "analytics" && (
//           <Analytics
//             transactions={transactions}
//           />
//         )}

//         {page === "budget" && (
//           <Budget
//             transactions={transactions}
//             budgets={budgets}
//             setBudgets={setBudgets}
//           />
//         )}

//       </main>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Analytics from "./components/Analytics";
import Budget from "./components/Budget";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [page, setPage] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);

  const [budgets, setBudgets] = useState({
    Food: 9000,
    Transport: 6000,
    Shopping: 10000,
    Bills: 8000
  });

  const handleLogin = () => {
    const email = localStorage.getItem("userEmail");

    if (email) {
      const savedTransactions = localStorage.getItem(
        `expenseIQ_transactions_${email}`
      );

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        setTransactions([]);
      }
    } else {
      setTransactions([]);
    }

    setPage("dashboard");
    setScreen("app");
  };

  const handleTransactionsChange = (newTransactions) => {
    setTransactions(newTransactions);

    const email = localStorage.getItem("userEmail");

    if (email) {
      localStorage.setItem(
        `expenseIQ_transactions_${email}`,
        JSON.stringify(newTransactions)
      );
    }
  };

  if (screen === "home") {
    return (
      <Home
        onGetStarted={() => setScreen("login")}
      />
    );
  }

  if (screen === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onBack={() => setScreen("home")}
      />
    );
  }

  return (
    <div className="app">
      <Navbar
        page={page}
        setPage={setPage}
      />

      <main className="main-content">

        {page === "dashboard" && (
          <Dashboard
            transactions={transactions}
            setPage={setPage}
          />
        )}

        {page === "transactions" && (
          <Transactions
            transactions={transactions}
            setTransactions={handleTransactionsChange}
            budgets={budgets}
          />
        )}

        {page === "analytics" && (
          <Analytics
            transactions={transactions}
          />
        )}

        {page === "budget" && (
          <Budget
            transactions={transactions}
            budgets={budgets}
            setBudgets={setBudgets}
          />
        )}

      </main>
    </div>
  );
}

export default App;