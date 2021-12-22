import './medication.css'
import {useState, useEffect} from 'react';

function Medication({name, url}) {
    const [medicationImage, setMedicationImage] = useState(null);
    const [hasTaken, setHasTaken] = useState(false);

    useEffect(() => {
        setMedicationImage([{url}.url])
    }, []);

    useEffect(() => {
        // see if a cookie exists for our medication, if not create one.
        let cookie = document.cookie;
        if (!cookie.includes(name)) {
            cookie += name + '=false:'
        }

        let isTaken = (cookie.split(':')
        .find(row => row.startsWith(name + '='))
        .split('=')[1]) === 'true';

        setHasTaken(isTaken);
        document.cookie = cookie;
    }, []);

    const flipTaken = () => {
        let cookie = document.cookie;
        setHasTaken(!hasTaken);

        let searchPhrase = name + '=';

        if (!hasTaken) {
            cookie = cookie.replace(searchPhrase + 'false', searchPhrase + 'true');
        } else {
            cookie = cookie.replace(searchPhrase + 'true', searchPhrase + 'false');
        }

        document.cookie = cookie;
    }

    return (
    <div className="medication">
        <a href="#" onClick={flipTaken}>
            <h1>{name}</h1>
            {medicationImage && medicationImage.map((med, index) => <img className="img" key={index} src={med}/>)}
            {hasTaken ? (
                <h1>You have <span className="fail">NOT</span> taken</h1>
            ) : (
                <h1>You <span className="success">HAVE</span> taken</h1>
            )}
            
        </a>
    </div>
    );
}

export default Medication;