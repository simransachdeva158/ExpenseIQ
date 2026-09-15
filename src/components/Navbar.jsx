import { useState } from "react";

function Navbar() {
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || "Guest"
  );

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail("Guest");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>ExpenseIQ</h2>
      </div>

      <div className="navbar-right">
        <span>{userEmail}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;