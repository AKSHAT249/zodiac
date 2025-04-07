

import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LineChart from './components/LineChart'
// import BarChart from './components/BarChart';
import PieChart from "./components/PieChart";
import BarChart from './components/BarChart';
import Navbar from './components/Navbar';

const App = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<LineChart />} />
        <Route path="/pie" element={<PieChart />} />
        <Route path="/bar" element={<BarChart />} />
      </Routes>
    </BrowserRouter>
      // <LineChart />
      
    
  )
}

export default App

