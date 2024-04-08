import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const AnimatedBarGraph = ({ data }) => {
  const [animationData, setAnimationData] = useState([]);

  useEffect(() => {
    if (!data || typeof data !== "object") {
      return;
    }

    const dataEntries = Object.entries(data);
    const formattedData = dataEntries.map(([algorithm, Efficiency], index) => ({
      algorithm,
      Efficiency,
      fill: `#${Math.floor(Math.random()*16777215).toString(16)}` // Generate a random color
    }));

    setAnimationData(formattedData);
  }, [data]);

  return (
    <div>
      <h2>Algorithm Efficiency</h2>
      <BarChart width={800} height={300} data={animationData}>
        <XAxis dataKey="algorithm" type="category" />
        <YAxis dataKey="Efficiency" type="number" domain={[0, 'dataMax']} tickFormatter={(value) => value.toFixed(2)} />
        <Tooltip />
        <Legend />
        {animationData.map((entry, index) => (
          <Bar key={index} dataKey="Efficiency" fill={entry.fill} animationBegin={index * 100} animationDuration={1000} />
        ))}
      </BarChart>
    </div>
  );
};

export default AnimatedBarGraph;
