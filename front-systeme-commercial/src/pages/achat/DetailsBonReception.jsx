/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/scss/bon_commande.scss";

function DetailsBonReception(props) {
    const { idBonReception } = props;

    const [bonReception, setBonReception] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const request = "http://localhost:8080/api/bon_reception/" + idBonReception;
        const fetchDetails = async() => {
            try {
                const response = await axios.get(request);

                if(response.data.error) {
                    setError(response.data.error);
                    console.log(error);
                } else if(response.data.data) {
                    const bon = response.data.data;
                    setBonReception(bon);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchDetails();
    }, []);

    return (
        <div className="details_bon_commande">
            <div className="details_bon_commande__infos">
                <div className="details_bon_commande__infos__element">
                    Bon de réception : { bonReception && bonReception.id }
                </div>
                <div className="details_bon_commande__infos__element">
                    Date de réception : { bonReception && bonReception.dateReception}
                </div>
                <div className="details_bon_commande__infos__element">
                    Bon de commande : { bonReception && bonReception.bonCommande.id }
                </div>
                <div className="details_bon_commande__infos__element">
                    Fournisseur : { bonReception && bonReception.fournisseur.nom }
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
                        Prix
                    </div>
                    <div className="details_bon_commande__articles__element">
                        Montant
                    </div>
                </div>

                {bonReception && bonReception.articlesBonReception && bonReception.articlesBonReception.map((item, index) => (
                    <div className="details_bon_commande__articles--content" key={index}>
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
                            { item.prixAchat }
                        </div>
                        <div className="details_bon_commande__articles__element">
                            { item.prixAchat * item.quantite }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DetailsBonReception;