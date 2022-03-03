import "./Tomato.css"
import TomatoPNG from '../../assets/tomato.png'
function Tomato() {
    return (
        <div className="Tomato">
            <h1 className="TomatoTitle">Tomato</h1>
            <img src={TomatoPNG} alt='Tomato' className="TomatoPNG"></img>
        </div>
    );
}

export default Tomato;
