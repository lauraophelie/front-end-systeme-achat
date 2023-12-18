import { useLocation } from "react-router-dom";
import "../../assets/scss/bon_commande.scss";
import DetailsBonSortie from "./DetailsBonSortie";

function FicheBonSortie() {
    const location = useLocation();
    const id = location.state.id;

    return (
        <div className="fiche_bon_commande">
            <h2 className="fiche_bon_commande__title">
                Bon de sortie
            </h2>

            <div className="fiche_bon_commande__content">
                <DetailsBonSortie idBonSortie={id} />
            </div>
        </div>
    )
}

export default FicheBonSortie;