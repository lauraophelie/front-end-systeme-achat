/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../../assets/scss/bon_commande.scss";
import axios from "axios";
import Bouton from "../../components/Bouton";
import { useNavigate } from "react-router-dom";

function DetailsBonCommande(props) {
    const { idBonCommande } = props;

    const [bonCommande, setBonCommande] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const request = "http://localhost:8080/api/bon-commande/all/" + idBonCommande;
        const fetchDetails = async() => {
            try {
                const response = await axios.get(request);

                if(response.data.error) {
                    setError(response.data.error);
                    console.log(error);
                } else if(response.data.data) {
                    const bon = response.data.data;
                    setBonCommande(bon);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetails();
    }, []);

    const session = sessionStorage.getItem('userData');
    const dataSession = JSON.parse(session);
    const codeService = dataSession.service.codeService;
    const idRole = dataSession.role.id;
    console.log(codeService);

    const navigate = useNavigate();

    const validerBonCommande = async (etat) => {
        try {
            if (codeService === "FI" || idRole === "ROL6" || codeService === "DI")  {
                var validationFinance = 0;
                var validationDg = 0;

                if(codeService == "FI") {
                    validationFinance = etat;
                    validationDg = 0;
                } else {
                    validationFinance = etat;
                    validationDg = etat;
                }
                const data = {
                    dateValidation: Date.now(),
                    bonCommande: idBonCommande,
                    validationFinance: validationFinance,
                    validationDg: validationDg
                }
                const request = "http://localhost:8080/api/bon-commande/valider/" + idBonCommande;
                const response = await axios.put(request, data);

                if(response.data.error) {
                    console.log(error);
                    setError(error);
                } else if(response.data.data) {
                    navigate("/header/achat/bons_commande");
                }
                console.log(data);
            } else {
                alert("Vous ne pouvez pas valider ce bon de commande");
            }
        } catch (error) {
            alert("Error: " + error);
        }
    }

    return (
        <div className="details_bon_commande">
            <div className="details_bon_commande__infos">
                <div className="details_bon_commande__infos__element">
                    Bon de commande : { idBonCommande }
                </div>
                <div className="details_bon_commande__infos__element">
                    Fournisseur : { bonCommande && bonCommande.fournisseur.nom }
                </div>
                <div className="details_bon_commande__infos__element">
                    Responsable : { bonCommande && bonCommande.fournisseur.responsable }
                </div>
                <div className="details_bon_commande__infos__element">
                    Date : { bonCommande && bonCommande.dateCreation }
                </div>
                <div className="details_bon_commande__infos__element">
                    Délai de livraison : { bonCommande && bonCommande.delaiLivraison }
                </div>
                <div className="details_bon_commande__infos__element">
                    Livraison partielle : { bonCommande && bonCommande.livraisonPartielle == true ? "Oui": "Non"}
                </div>
                <div className="details_bon_commande__infos__element">
                    Paiement : { bonCommande && bonCommande.modePaiement.designation }
                </div>
            </div>

            <div className="details_bon_commande__articles">
                <div className="details_bon_commande__articles--header">
                    <div className="details_bon_commande__articles__element">
                        Catégorie
                    </div>
                    <div className="details_bon_commande__articles__element">
                        Article
                    </div>
                    <div className="details_bon_commande__articles__element">
                        Quantité 
                    </div>
                    <div className="details_bon_commande__articles__element">
                        PU HT
                    </div>
                    <div className="details_bon_commande__articles__element">
                        % TVA
                    </div>
                    <div className="details_bon_commande__articles__element">
                        PU TTC
                    </div>
                </div>

                {bonCommande && bonCommande.articlesBonCommande && bonCommande.articlesBonCommande.map((item) => (
                    <div className="details_bon_commande__articles--content">
                        <div className="details_bon_commande__articles__element">
                            { item.article.categorie.nomCategorie }
                        </div>
                        <div className="details_bon_commande__articles__element">
                            { item.article.nomArticle }
                        </div>
                        <div className="details_bon_commande__articles__element">
                            { item.quantite }
                        </div>
                        <div className="details_bon_commande__articles__element">
                            { item.puHT }
                        </div>
                        <div className="details_bon_commande__articles__element">
                            { item.tva }
                        </div>
                        <div className="details_bon_commande__articles__element">
                            { item.puTTC }
                        </div>
                    </div>
                ))}

                <div className="details_bon_commande__signature">
                    <div className="details_bon_commande__signature__arret">
                        <p className="details_bon_commande__signature__arret--content">
                            Arrêté le présent bon de commande à la somme de [ lettres ttc ]
                        </p>
                    </div>
                    <div className="details_bon_commande__signature__sign">
                        <div className="details_bon_commande__signature__sign__element">
                            La société
                        </div>
                        <div className="details_bon_commande__signature__sign__element">
                            Le fournisseur
                        </div>
                    </div>
                </div>
            </div>

            <div className="details_bon_commande__validation">
                <div className="details_bon_commande__validation__element">
                    <Bouton
                        text="Annuler"
                        variant="outlined"
                        className="details_bon_commande__validation__element--button"
                        onClick={() => validerBonCommande(-10)}
                        /*disabled={bonCommande && bonCommande.etat === 15 ? true : false}*/
                    />
                </div>
                <div className="details_bon_commande__validation__element">
                    <Bouton
                        text="Valider"
                        variant="contained"
                        className="details_bon_commande__validation__element--button"
                        onClick={() => validerBonCommande(10)}
                        /*disabled={bonCommande && bonCommande.etat === 15 || bonCommande.etat === 10 ? true : false}*/
                    />
                </div>
            </div>
        </div>
    )
}

export default DetailsBonCommande;