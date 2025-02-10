import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { increment, decrement } from "./redux/store"; 
import { RootState } from "./redux/store";

// Home Component
function Home() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-white">
      <div className="bg-blue-500 p-6 rounded-lg shadow-lg w-1/2 text-center mb-8">
        <h1 className="text-2xl font-bold text-yellow mb-4">Home Page</h1>
        <p className="text-blue-100">React, TailwindCSS, React Router, and Redux are working</p>
      </div>

      {/* Counter section below the text */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 text-center">
        <h2 className="text-2xl font-bold mb-4">Redux Counter</h2>
        <p className="text-lg text-gray-800">
          Current Count: <span className="font-bold text-xl">{count}</span>
        </p>
        <div className="mt-4">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition mr-4"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
}

// About Component
function About() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="bg-blue-500 p-6 rounded-lg shadow-lg w-1/2 text-center">
        <h1 className="text-2xl font-bold">About</h1>
        <p className="text-white">Setting up React environment</p>
      </div>
    </div>
  );
}

// App Component
function App() {
  return (
    <Router>
      <nav className="flex justify-center gap-4 p-4 bg-yellow-500">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-6 py-3 !text-white text-lg rounded-lg shadow-md transition ${
              isActive ? "bg-orange-500" : "bg-blue-600 hover:bg-blue-700"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-6 py-3 !text-white text-lg rounded-lg shadow-md transition ${
              isActive ? "bg-orange-500" : "bg-blue-600 hover:bg-blue-700"
            }`
          }
        >
          About
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
