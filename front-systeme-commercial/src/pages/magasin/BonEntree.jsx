/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "../../assets/scss/bon_entree.scss";
import Bouton from "../../components/Bouton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BonEntree() {
    const [bonEntree, setBonEntree] = useState();

    useEffect(() => {
        const url = "http://localhost:8080/api/magasin/bon_entree";
        const fetchData = async() => {
            try {
                const request = await axios.get(url);
                
                if(request.data.error) {
                    console.log(request.data.error);
                } else if(request.data.data) {
                    const data = request.data.data;
                    setBonEntree(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();

    const genererEntree = async (idBonEntree) => {
        console.log(idBonEntree);
        const request = "http://localhost:8080/api/magasin/bon_entree/" + idBonEntree;

        try {
            const response = await axios.get(request);

            if(response.data.error) {
                console.log(response.data.error);
            } else if(response.data.data) {
                const bon = response.data.data;
                const articles = bon.detailsBonEntree;

                const idArticle = articles.map(function(item) {
                    return item.article.id;
                });
                
                const qteEntree = articles.map(function(item) {
                    return item.quantite;
                });

                const prix = articles.map(function(item) {
                    return item.prixAchat;
                });

                const data = {
                    dateEntree: Date.now(),
                    idArticle: idArticle,
                    qteEntree: qteEntree,
                    prix: prix
                }
                const send = await axios.post("http://localhost:8080/api/entree/new", data);

                if(send.data.error) {
                    alert(send.data.error);
                } else {
                    alert("ok");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }   

    return (
        <div className="bon_entree">
            <h2 className="bon_entree__title">
                Bons d'entrée
            </h2>

            <div className="bon_entree__header">
                <div className="bon_entree__header--element">
                    Numéro
                </div>
                <div className="bon_entree__header--element">
                    Date de création
                </div>
                <div className="bon_entree__header--element">
                    Bon de réception
                </div>
                <div className="bon_entree__header--element">

                </div>
                <div className="bon_entree__header--element">

                </div>
            </div>

            {bonEntree && bonEntree.map((item, index) => (
                <div className="bon_entree__content" key={index}>
                    <div className="bon_entree__content--element">
                        {item.id}
                    </div>
                    <div className="bon_entree__content--element">
                        {item.dateEntree}
                    </div>
                    <div className="bon_entree__content--element">
                        {item.bonReception.id}
                    </div>
                    <div className="bon_entree__content--element">
                        <Bouton
                            variant="outlined"
                            text="Détails"
                            size="small"
                            onClick={() => { navigate("/header/magasin/details_bon_entree", { state: { id: item.id } }) }}
                        />
                    </div>
                    <div className="bon_entree__content--element">
                        <Bouton
                            variant="contained"
                            text="Générer entrées"
                            size="small"
                            onClick={() => genererEntree(item.id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BonEntree;