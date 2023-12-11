import { useLocation } from "react-router-dom";
import "../../assets/scss/bon_commande.scss";
import DetailsBonReception from "./DetailsBonReception";

function FicheBonReception() {
    const location = useLocation();
    const id = location.state.id;

    return (
        <div className="fiche_bon_commande">
            <h2 className="fiche_bon_commande__title">
                Bon de réception
            </h2>

            <div className="fiche_bon_commande__content">
                <DetailsBonReception idBonReception={id} />
            </div>
        </div>
    )
}

export default FicheBonReception;