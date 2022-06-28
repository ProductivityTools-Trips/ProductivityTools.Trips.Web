import { useEffect, useState } from 'react';
import './App.css';
import { getDate } from './services/apiService'

function App() {

  const [date, setDate] = useState(null);

  useEffect(() => {
    let date = getDate();
    setDate(date);
  }, [])


  return (
    <div className="App">
      <p>{date}</p>
      Hello
    </div>
  );
}

export default App;
