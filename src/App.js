import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/favorites';
import Layout from './pages/layout';

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/Favorites' element={<Favorites />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
