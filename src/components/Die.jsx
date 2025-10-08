export default function Die({value, isHeld, hold}) {
    const styles = {
        backgroundColor: isHeld ? "#59E391" : "white"
    }
    return (
        <button 
            style={styles} 
            className="dieButton" 
            onClick={hold}
            aria-pressed={hold}
            aria-label={`Die with ${value} value, ${isHeld ? "held" : "not held"}`}
        >{value}</button>
    )
}