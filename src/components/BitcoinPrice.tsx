import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchBitcoinPrice } from "../redux/bitcoinSlice";

const BitcoinPrice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { price, loading, error } = useSelector((state: RootState) => state.bitcoin);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)

  useEffect(() => {
    dispatch(fetchBitcoinPrice());

    // Set an interval to update the price every 5 minutes
    const priceInterval = setInterval(() => {
      dispatch(fetchBitcoinPrice());
      setTimeLeft(300); // Reset countdown after fetching price
    }, 5 * 60 * 1000);

    // Timer countdown every second
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(timerInterval);
    };
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchBitcoinPrice());
    setTimeLeft(300); // Reset countdown
  };

  return (
    <div className="flex flex-col items-center p-4 bg-blue-500 rounded-md shadow-md">
      <h2 className="text-xl font-bold">Bitcoin Price (USD)</h2>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {price !== null && <p className="text-green-400 text-2xl">${price}</p>}
      
      {/* Countdown Timer */}
      <p className="text-white mt-4">Next update in: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</p>
      
      {/* Refresh Button */}
      <button 
        onClick={handleRefresh} 
        className="mt-4 px-4 py-2 bg-white text-blue-500 font-bold rounded shadow hover:bg-gray-200 transition"
      >
        Refresh
      </button>
    </div>
  );
};

export default BitcoinPrice;
