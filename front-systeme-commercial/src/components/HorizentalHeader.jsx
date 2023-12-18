/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

function HorizentalHeader() {
    const session = sessionStorage.getItem('userData');
    const data = JSON.parse(session).service;
    const codeService = data.codeService;
    const nomService = data.nomService;

    const achat = "/header/achat/"
    const magasin = "/header/magasin/";

    return (
        <div className="header-navigation">
            <div className="nav">
                {nomService}
            </div>
            <nav className="navigation">
                <Link to="/header/liste_besoins" className="navigation__element"> Besoins </Link>
                <Link to="/header/besoin" className="navigation__element"> Ajout besoin </Link>

                {codeService === "SA" && (
                    <>
                        <Link to={achat + "besoins_global"} className="navigation__element"> Besoins global </Link>
                        <Link to={achat + "bons_commande"} className="navigation__element"> Bons de commande </Link>
                        <Link to={achat + "bons_reception"} className="navigation__element"> Bons de réception </Link>
                        <Link to={achat + "saisie_proforma"} className="navigation__element"> Saisie de Proforma </Link>
                    </>
                )}
                {codeService === "MA" && (
                    <>
                        <Link to={magasin + "bon_entree"} className="navigation__element"> Bons d'entrée </Link>
                        <Link to={magasin + "entree_stock"} className="navigation__element"> Entrée </Link>
                        <Link to={magasin + "etat_stock"} className="navigation__element"> Etat de stocks </Link>
                        <Link to={magasin + "sortie_stock"} className="navigation__element"> Sortie </Link>
                        <Link to={magasin + "bon_sortie"} className="navigation__element"> Bons de sorties </Link>
                    </>
                )}
            </nav>
        </div>
    )
}

export default HorizentalHeader;