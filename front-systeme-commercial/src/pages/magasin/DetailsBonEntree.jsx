/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "../../assets/scss/bon_commande.scss";
import axios from "axios";

function DetailsBonEntree(props) {
    const { idBonEntree } = props;

    const [bonEntree, setBonEntree] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const request = "http://localhost:8080/api/magasin/bon_entree/" + idBonEntree;
        
        const fetchDetails = async() => {
            try {
                const response = await axios.get(request);

                if(response.data.error) {
                    setError(response.data.error);
                    console.log(error);
                } else if(response.data.data) {
                    const bon = response.data.data;
                    setBonEntree(bon);
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
                    Bon d'entrée : { idBonEntree }
                </div>
                <div className="details_bon_commande__infos__element">
                    Date : { bonEntree && bonEntree.dateEntree }
                </div>
                <div className="details_bon_commande__infos__element">
                    Bon de réception : { bonEntree && bonEntree.bonReception.id }
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
                            Prix d'achat
                        </div>
                    </div>
                </div>

                {bonEntree && bonEntree.detailsBonEntree && bonEntree.detailsBonEntree.map((item, index) => (
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
                    </div>
                ))}
        </div>
    )
}

export default DetailsBonEntree;