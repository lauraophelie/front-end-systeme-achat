import { useLocation } from "react-router-dom";
import "../assets/scss/besoin.scss";
import DetailsBesoins from "../pages/DetailsBesoins";

function FicheBesoin() {
    const location = useLocation();
    const id = location.state.id;

    return (
        <div className="fiche-besoin">
            <h2 className="fiche-besoin__title">
                Fiche besoin
            </h2>

            <div className="fiche-besoin__content">
                <DetailsBesoins idBesoin={id} />
            </div>
        </div>
    )
}

export default FicheBesoin;