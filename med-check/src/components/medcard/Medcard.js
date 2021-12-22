import './medcard.css'

function MedCard({children}) {
    return (
        <div className="medcard">
            {children}
        </div>
    )
}

export default MedCard;