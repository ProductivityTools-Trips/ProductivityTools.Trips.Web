import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Components/Home'
import TripEdit from './Components/TripEdit';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='tripedit/:id' element={<TripEdit />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
