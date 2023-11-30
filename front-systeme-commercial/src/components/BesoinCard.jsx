/* eslint-disable react/prop-types */
import ChipComponent from "./ChipComponent";
import Bouton from "./Bouton";
import { useNavigate } from "react-router-dom";

function BesoinCard(props) {
    const { item } = props;
    const navigate = useNavigate();

    const toDetails = (e) => {
        e.preventDefault();
        navigate("/header/details_besoin", { state: { id: item.id } });
    }

    return (
        <div className="liste-besoins__content--infos">
            <div className="liste-besoins__content--infos__element">
                {item.id}
            </div>
            <div className="liste-besoins__content--infos__element">
                {item.dateBesoin}
            </div>
            <div className="liste-besoins__content--infos__element">
                {item.dateLimite}
            </div>
            <div className="liste-besoins__content--infos__element">
                <ChipComponent variant="outlined" type={item.etat}/>
            </div>
            <div className="liste-besoins__content--infos__element">
                <Bouton 
                    variant="outlined"
                    text="Détails"
                    size="small"
                    onClick={toDetails}
                />
            </div>
        </div>
    )
}

export default BesoinCard;