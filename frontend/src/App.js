import React from 'react';
import Navbar from './components/Navbar'; // Importing the Navbar component
import './App.css'; // Importing CSS styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importing components from react-router-dom
import Home from './components/Home/Home'; // Importing the Home component
//import Footer from './components/Footer/Footer'; // Importing the Footer component
import MainPage from './components/WordAnalyzer/Mainpage'; // Importing the MainPage component
import Analyzer from './components/Visualizer/MainPage2'; // Importing the Analyzer component
import Recommendation from './components/Recommendation/Recommendation'; // Importing the Recommendation component

function App() {
  return (
    // Routing through all the components using Router, Routes, and Route components from react-router-dom
    <Router>
      <Navbar /> {/* Render the Navbar component */}
      <Routes> {/* Define routes for different components */}
        <Route path='/' element={<Home />} /> {/* Route for the Home component */}
        <Route path='/home' element={<Home />} /> {/* Route for the Home component */}
        <Route path='/main' element={<MainPage />} /> {/* Route for the MainPage component */}
        <Route path='/analyzer' element={<Analyzer />} /> {/* Route for the Analyzer component */}
        <Route path='/recommender' element={<Recommendation />} /> {/* Route for the Recommendation component */}
      </Routes>
       {/* Render the Footer component */}
    </Router>
  );
}

export default App;
