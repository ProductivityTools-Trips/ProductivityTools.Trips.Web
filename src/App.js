import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Components/Home'
import TripDetail from './Components/TripDetail';
import TripEdit from './Components/TripEdit';
import ExpenseEdit from './Components/ExpenseEdit';
import ExpenseAdd from './Components/ExpenseAdd';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='tripedit/:id' element={<TripEdit />}></Route>
          <Route path='tripdetail/:id' element={<TripDetail />}></Route>
          <Route path='ExpenseEdit/:id' element={<ExpenseEdit/>}></Route>
          <Route path='ExpenseAdd/' element={<ExpenseAdd/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
