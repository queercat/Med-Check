import './App.css';

import MedCard from './components/medcard/Medcard';
import LoadingScreen from './components/loading/Loading';

import {useState, useEffect} from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
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
      
      <MedCard medications={[["Spiro", "https://img.medscapestatic.com/pi/features/drugdirectory/octupdate/MUA03290.jpg?output-quality=50"], ["Estrogen", "https://www.drugs.com/images/pills/nlm/005550886.jpg"]]}/>

      {!loading ? (
        offSpinner()
      ) : (<></>)}
    </div>
  );
}

export default App;
