import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import './styles/ui.css';
import Home from './Components/Home'
import TripDetail from './Components/TripDetail';
import TripEdit from './Components/TripEdit';
import ExpenseEdit from './Components/ExpenseEdit';
import ExpenseAdd from './Components/ExpenseAdd';
import TripCurrency from './Components/TripCurrency';
import JournalEdit from './Components/JournalEdit';
import Login from "./session/login"
import RequireAuth from './session/RequireAuth';
import { installAuthInterceptors } from './session/authInterceptor';

import { CacheProvider } from './session/CacheContext';

installAuthInterceptors();

function App() {
  return (
    <CacheProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path='/' element={<Home />} />
              <Route path='addtrip/' element={<TripEdit mode='add' />} />
              <Route path='tripedit/:id' element={<TripEdit mode='edit' />} />
              <Route path='tripdetail/:id' element={<TripDetail />} />
              <Route path='tripcurrency/' element={<TripCurrency />} />
              <Route path='ExpenseEdit/:id' element={<ExpenseEdit />} />
              <Route path='ExpenseAdd/' element={<ExpenseAdd />} />
              <Route path='JournalAdd/' element={<JournalEdit />} />
              <Route path='JournalEdit/' element={<JournalEdit />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </CacheProvider>
  );
}

export default App;
