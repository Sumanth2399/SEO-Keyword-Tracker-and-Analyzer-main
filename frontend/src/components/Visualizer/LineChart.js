import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const LineChartComponent = ({ data }) => {
  if (!data || typeof data !== "object") {
    return <div>Loading...</div>;
  }

  // Convert data object to array
  const dataArray = Object.entries(data).map(([name, count]) => ({ name, count }));

  // Sort array by count in descending order and get top 10
  const topTenData = dataArray.sort((a, b) => b.count - a.count).slice(0, 10);

  return (
    <div>
      <h2>Top 10 Keywords Count</h2>
      <LineChart width={800} height={300} data={topTenData}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="rgb(75, 192, 192)" dot={false} animationDuration={1000} />
      </LineChart>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default LineChartComponent;
