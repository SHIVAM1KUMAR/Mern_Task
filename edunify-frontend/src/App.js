import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddSchool from './components/AddSchool';
import ShowSchools from './components/ShowSchools';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/add-school" />} />
        <Route path="/add-school" element={<AddSchool />} />
        <Route path="/show-schools" element={<ShowSchools />} />
      </Routes>
    </Router>
  );
};

export default App;
