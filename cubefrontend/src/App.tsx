

import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LineChart from './components/LineChart'
import BarChart from './components/BarChart';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="vizard/preview/react-typescript-chartjs-area+bar+doughnut+line+pie/" element={<BarChart />} />
      </Routes>
    </BrowserRouter>
      // <LineChart />
      
    
  )
}

export default App

