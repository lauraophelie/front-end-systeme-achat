import { Link } from "react-router-dom";

function HorizentalHeader() {
    const session = sessionStorage.getItem('userData');
    const data = JSON.parse(session).service;
    const codeService = data.codeService;

    return (
        <nav className="navigation">
            <Link to="/header/liste_besoins" className="navigation__element"> Besoins </Link>
            <Link to="/header/besoin" className="navigation__element"> Ajout besoin </Link>

            {codeService === "SA" && (
                <>
                    <Link to="/header/achat/besoins_global" className="navigation__element"> Besoins global </Link>
                    <Link to="/header/achat/bons_commande" className="navigation__element"> Bons de commande </Link>
                    <Link to="/header/achat/saisie_proforma" className="navigation__element"> Saisie de Proforma </Link>
                </>
            )}
        </nav>
    )
}

export default HorizentalHeader;