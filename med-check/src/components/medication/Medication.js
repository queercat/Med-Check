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
        <header>{name}</header>
        {medicationImage && medicationImage.map((med, index) => <img key={index} src={med}/>)}
    </div>
    );
}

export default Medication;