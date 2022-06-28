import { useEffect, useState } from 'react';
import './App.css';
import service from './services/apiService'

function App() {

  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {


      const dt = await service.getDate();
      setDate(dt);
    }
    fetchData();
  }, [])


  return (
    <div className="App">
      <p>{date}</p>
      Hello
    </div>
  );
}

export default App;
