import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Components/Home'
import TripAdd from './Components/TripAdd';
import TripDetail from './Components/TripDetail';
import TripEdit from './Components/TripEdit';
import ExpenseEdit from './Components/ExpenseEdit';
import ExpenseAdd from './Components/ExpenseAdd';
import TripCurrency from './Components/TripCurrency';
import JournalAdd from './Components/JournalAdd';

import { CacheContext, CacheProvider } from './session/CacheContext';


function App() {
  return (
    <CacheProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='addtrip/' element={<TripAdd />}></Route>
            <Route path='tripedit/:id' element={<TripEdit mode='edit'/>}></Route>
            <Route path='tripdetail/:id' element={<TripDetail />}></Route>
            <Route path='tripcurrency/' element={<TripCurrency />}></Route>
            <Route path='ExpenseEdit/:id' element={<ExpenseEdit  />}></Route>
            <Route path='ExpenseAdd/' element={<ExpenseAdd />}></Route>
            <Route path='JournalAdd/' element={<JournalAdd />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </CacheProvider>
  );
}

export default App;
