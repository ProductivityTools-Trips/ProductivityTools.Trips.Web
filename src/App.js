import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './Components/Home'
//import TripAdd from './Components/TripAdd';
import TripDetail from './Components/TripDetail';
import TripEdit from './Components/TripEdit';
import ExpenseEdit from './Components/ExpenseEdit';
import ExpenseAdd from './Components/ExpenseAdd';
import TripCurrency from './Components/TripCurrency';
import JournalEdit from './Components/JournalEdit';
import { ToastContainer } from "react-toastify";
import Login from "./session/login"

import { CacheContext, CacheProvider } from './session/CacheContext';


function App() {
  return (
    <CacheProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path='/' element={<Home />}></Route>
            <Route path='addtrip/' element={<TripEdit mode='add' />}></Route>
            <Route path='tripedit/:id' element={<TripEdit mode='edit' />}></Route>
            <Route path='tripdetail/:id' element={<TripDetail />}></Route>
            <Route path='tripcurrency/' element={<TripCurrency />}></Route>
            <Route path='ExpenseEdit/:id' element={<ExpenseEdit />}></Route>
            <Route path='ExpenseAdd/' element={<ExpenseAdd />}></Route>
            <Route path='JournalAdd/' element={<JournalEdit />}></Route>
            <Route path='JournalEdit/' element={<JournalEdit />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </CacheProvider>
  );
}

export default App;
