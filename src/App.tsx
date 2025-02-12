import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import BitcoinPrice from "./components/BitcoinPrice";

function App() {
  return (
    <Router>
      <nav className="flex justify-center gap-4 p-4 bg-black-500">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-6 py-3 !text-white text-lg rounded-lg shadow-md transition ${
              isActive ? "bg-blue-500" : "bg-gray-600 hover:bg-gray-700"
            }`
          }
        >
          Home
        </NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col justify-center items-center min-h-screen w-full bg-white">
              <div className="mt-4"> {/* Reduced margin from mt-8 to mt-4 */}
                <BitcoinPrice />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
