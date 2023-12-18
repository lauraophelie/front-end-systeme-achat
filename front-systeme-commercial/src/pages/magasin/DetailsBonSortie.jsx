/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../../assets/scss/bon_commande.scss";
import axios from "axios";

function DetailsBonSortie(props) {
    const { idBonSortie } = props;

    const [bonSortie, setBonSortie] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const request = "http://localhost:8080/api/magasin/bon_sortie/" + idBonSortie;
        
        const fetchDetails = async() => {
            try {
                const response = await axios.get(request);

                if(response.data.error) {
                    setError(response.data.error);
                    console.log(error);
                } else if(response.data.data) {
                    const bon = response.data.data;
                    setBonSortie(bon);
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
                    Bon de sortie : { idBonSortie }
                </div>
                <div className="details_bon_commande__infos__element">
                    Date : { bonSortie && bonSortie.dateCreation }
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
                        Prix unitaire
                    </div>
                </div>
            </div>

            {bonSortie && bonSortie.detailsBonSorties && bonSortie.detailsBonSorties.map((item, index) => (
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
                        { item.prixUnitaire }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DetailsBonSortie;