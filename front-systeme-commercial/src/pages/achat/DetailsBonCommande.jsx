/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../../assets/scss/bon_commande.scss";
import axios from "axios";

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
                    Livraison partielle : 
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
        </div>
    )
}

export default DetailsBonCommande;