import { useLocation } from "react-router-dom";
import DetailsBonCommande from "./DetailsBonCommande";
import "../../assets/scss/bon_commande.scss";

function FicheBonCommande() {
    const location = useLocation();
    const id = location.state.id;

    return (
        <div className="fiche_bon_commande">
            <h2 className="fiche_bon_commande__title">
                Bon de commande
            </h2>

            <div className="fiche_bon_commande__content">
                <DetailsBonCommande idBonCommande={id} />
            </div>
        </div>
    )
}

export default FicheBonCommande;