"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchBinancePrice } from "../redux/binanceSlice";
import { Card, LineChart, List, ListItem } from "@tremor/react";

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function BinanceBitcoinPrice() {
  const dispatch = useDispatch<AppDispatch>();
  const { prices, loading } = useSelector((state: RootState) => state.binance);

  useEffect(() => {
    dispatch(fetchBinancePrice());

    const interval = setInterval(() => {
      dispatch(fetchBinancePrice());
    }, 5 * 60 * 1000); // Fetch every 5 minutes

    return () => clearInterval(interval);
  }, [dispatch]);

  // Default values when data is empty
  const latestPrice = prices.length > 0 ? prices[prices.length - 1].price : 0;

  const openPrice = prices.length > 0 ? prices[0].price : 0;
  const highPrice = prices.length > 0 ? Math.max(...prices.map(p => p.price)) : 0;
  const lowPrice = prices.length > 0 ? Math.min(...prices.map(p => p.price)) : 0;
  const closePrice = latestPrice;
  const PriceDifference = closePrice - openPrice;
  const PriceDifferncePercentage = (PriceDifference * 100) / openPrice;
  const PD = PriceDifference.toFixed(1);
  const PDP = PriceDifferncePercentage.toFixed(2);

  // Remove Market Cap and Volume from the summary
  const summary = [
    { name: "High", value: valueFormatter(highPrice) },
    { name: "Low", value: valueFormatter(lowPrice) }, 
    { name: "First", value: valueFormatter(openPrice) },
    { name: "Last", value: valueFormatter(closePrice) },
  ];

  return (
    <Card className="sm:mx-auto sm:max-w-lg">
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        Bitcoin (BTC)
      </h3>
      <p className="mt-1 text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {valueFormatter(latestPrice)}
      </p>
      <p className="mt-1 text-tremor-default font-medium">
        <span className="text-emerald-700 dark:text-emerald-500">
          {PD} ({PDP}%)
        </span>{" "}
        <span className="font-normal text-tremor-content dark:text-dark-tremor-content">
          Past hour
        </span>
      </p>
      <LineChart
        data={prices}
        index="date"
        categories={["price"]}
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        showXAxis={true}  // Ensure Y-axis is visible
        minValue={Math.min(...prices.map(p => p.price)) * 0.99} // Slightly below min
        maxValue={Math.max(...prices.map(p => p.price)) * 1.01}
        className="mt-6 h-48"
        style={{ stroke: "#ff6347" }}
      />
      <div className="mt-4 flex items-center gap-6">
        <List className="truncate">
          {summary.slice(0, 2).map((item) => (
            <ListItem key={item.name}>
              <span className="truncate">{item.name}</span>
              <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.value}
              </span>
            </ListItem>
          ))}
        </List>
        <List className="truncate">
          {summary.slice(2).map((item) => (
            <ListItem key={item.name}>
              <span className="truncate">{item.name}</span>
              <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {item.value}
              </span>
            </ListItem>
          ))}
        </List>
      </div>
    </Card>
  );
}
