import './medcard.css'
import Medication from '../medication/Medication';

function MedCard({medications, children}) {
    return (
            <>
            {medications && medications.map((med, index) => (
                <div className="medcard">
                    <Medication key={index} name={med[0]} url={med[1]}></Medication>
                </div>
            ))}
            </>
    )
}

export default MedCard;