"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchBtcPrice } from "../redux/btcPriceSlice";
import { Card, LineChart, List, ListItem } from "@tremor/react";

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function BinanceBtcPrice() {
  const dispatch = useDispatch<AppDispatch>();
  const { prices, loading } = useSelector((state: RootState) => state.btcPrice);

  useEffect(() => {
    dispatch(fetchBtcPrice());

    const interval = setInterval(() => {
      dispatch(fetchBtcPrice());
    }, 60 * 60 * 1000); // Fetch every 1 hour

    return () => clearInterval(interval);
  }, [dispatch]);

  // Default values when data is empty
  const latestPrice = prices.length > 0 ? prices[prices.length - 1].price : 0;
  const openPrice = prices.length > 0 ? prices[0].price : 0;
  const highPrice = prices.length > 0 ? Math.max(...prices.map((p) => p.price)) : 0;
  const lowPrice = prices.length > 0 ? Math.min(...prices.map((p) => p.price)) : 0;
  const closePrice = latestPrice;
  const priceDifference = closePrice - openPrice;
  const priceDifferencePercentage = (priceDifference * 100) / openPrice;
  const PD = priceDifference.toFixed(1);
  const PDP = priceDifferencePercentage.toFixed(2);

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
          Past 24 hours
        </span>
      </p>
      <LineChart
        data={prices}
        index="date"
        categories={["price"]}
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        showXAxis={true}
        minValue={Math.min(...prices.map((p) => p.price)) * 0.98}
        maxValue={Math.max(...prices.map((p) => p.price)) * 1.02}
        className="mt-6 h-48"
        style={{ stroke: "#ff6347" }}
        tickGap={6}
        
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
