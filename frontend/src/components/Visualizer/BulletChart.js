import React from 'react';
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BulletChartComponent = ({ data }) => {
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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={topTenData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BulletChartComponent;
