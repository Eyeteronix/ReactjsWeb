import React from "react";
import BinanceBtcPrice from "./components/BinanceBtcPrice"; // Adjust the import paths accordingly
import BinanceBitcoinPrice from "./components/BinanceBitcoinPrice";

const App = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mt-6">Crypto Price Dashboard</h1>

      <div className="flex justify-center mt-8 space-x-8"> {/* Flexbox for side-by-side layout */}
        <div className="w-full sm:w-[45%] lg:w-[45%]"> {/* Each component takes 45% of the width */}
          <BinanceBtcPrice /> {/* Display the BinanceBtcPrice component */}
        </div>
        <div className="w-full sm:w-[45%] lg:w-[45%]"> {/* Each component takes 45% of the width */}
          <BinanceBitcoinPrice /> {/* Display the BinanceBitcoinPrice component */}
        </div>
      </div>
    </div>
  );
};

export default App;
