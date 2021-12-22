import './App.css';

import Medication from './components/medication/Medication';
import MedCard from './components/medcard/Medcard';
import LoadingScreen from './components/loading/Loading';

import {useState, useEffect} from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const destroySpinner = () => {
    const spinner = document.getElementById('spinner-container');
    spinner.style = "display: none";
  }

  const offSpinner = () => {
    const spinner = document.getElementById('spinner-container');
    spinner.style = "opacity: 0; transform: translate(0%, -10%)"

    setTimeout(() => destroySpinner(), 300);
  }

  return (
    <div className="App">
      <LoadingScreen/>
      
      <MedCard>
        <Medication name="Spiro"/>
      </MedCard>

      {!loading ? (
        offSpinner()
      ) : (<></>)}
    </div>
  );
}

export default App;
