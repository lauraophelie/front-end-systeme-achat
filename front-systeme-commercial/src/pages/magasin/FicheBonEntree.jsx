/* eslint-disable react/no-unescaped-entities */
import { useLocation } from "react-router-dom";
import "../../assets/scss/bon_commande.scss";
import DetailsBonEntree from "./DetailsBonEntree";

function FicheBonEntree() {
    const location = useLocation();
    const id = location.state.id;

    return (
        <div className="fiche_bon_commande">
            <h2 className="fiche_bon_commande__title">
                Bon d'entrée
            </h2>

            <div className="fiche_bon_commande__content">
                <DetailsBonEntree idBonEntree={id} />
            </div>
        </div>
    )
}

export default FicheBonEntree;