import React, { useEffect, useState } from "react";
import BulletChartComponent from "./BulletChart"; // Import the BulletChart component
import AnimatedBarGraph from "./AnimatedBarGraph";
import "./MainPage2.css"; // Import a CSS file for styling
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const MainPage2 = () => {
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = localStorage.getItem("responseData");

    if (storedData) {
      const data = JSON.parse(storedData);
      setResponseData(data);
    } else {
      console.log("No response data found in localStorage");
    }
  }, []);

  console.log("Inside Charts", responseData);

  const handleBackClick = () => {
    navigate(-1); // This will take you back to the previous page in the history stack
  };

  const handleRefreshClick = () => {
    navigate(0); // This will take you back to the previous page in the history stack
  };

  return (
    <div className="main-page-container">
      <div className="charts-container">
        <div className="chart-container">
          <h2>Bar Graph</h2>
          <AnimatedBarGraph data={responseData?.process_time} />
        </div>
        <div className="chart-container">
          <h2>Bullet Chart</h2>
          <BulletChartComponent data={responseData?.data} /> {/* Use BulletChartComponent instead */}
        </div>
      </div>
      <div className="button-container">
        <Button variant="contained" color="secondary" onClick={handleRefreshClick} style={{ marginRight: '10px' }}>
          Refresh
        </Button>
        <Button variant="contained" color="primary" onClick={handleBackClick}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default MainPage2;