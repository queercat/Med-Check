import './medication.css'
import {useState, useEffect} from 'react';

function Medication({name}) {
    const [medicationImage, setMedicationImage] = useState(null);

    useEffect(() => {
        fetch('https://i.imgur.com/qkAtUal.jpeg')
        .then(res => res.url)
        .then(data => setMedicationImage([data]))
    }, []);

    return (
    <div className="medication">
        <a href="#">
            <h1>{name}</h1>
            {medicationImage && medicationImage.map((med, index) => <img className="img" key={index} src={med}/>)}
            <h1>You have <span className="succ">NOT</span> taken</h1>
        </a>
    </div>
    );
}

export default Medication;