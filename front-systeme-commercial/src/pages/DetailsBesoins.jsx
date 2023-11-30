/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Done } from "@mui/icons-material";
import "../assets/scss/besoin.scss";
import Bouton from "../components/Bouton";
import { useEffect, useState } from "react";
import axios from "axios";
import getArticle from "../util/Util";
import { useNavigate } from "react-router-dom";

function DetailsBesoins(props) {
    const { idBesoin } = props;

    const [besoin, setBesoin] = useState([]);
    const [error, setError] = useState(null);

    const session = sessionStorage.getItem('userData');
    const dataSession = JSON.parse(session).role;
    const idRole = dataSession.id;
    const role = dataSession.nom;

    useEffect(() => {
        const request = "http://localhost:8080/api/besoin/findBesoin/" + idBesoin;
        const fetchBesoin = async () => {
            try {
                const response = await axios.post(request);
                console.log(response);

                if(response.data.error) {
                    setError(response.data.error);
                    console.log(error);
                } else if(response.data.data) {
                    const articlesDetails = await Promise.all(
                        response.data.data.listeArticles.map(async (article) => {
                            const articleDetails = await getArticle(article.idArticle);
                            return {
                                id: articleDetails.id,
                                nomArticle: articleDetails.nomArticle,
                                categorie: articleDetails.categorie,
                                quantite: article.quantite,
                            };
                        })
                    );
                    setBesoin({
                        ...response.data.data,
                        listeArticles: articlesDetails,
                    });
                    console.log(besoin);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBesoin();
    }, []);

    const navigate = useNavigate();

    const validerBesoin = async (e) => {
        e.preventDefault();
        const data = {
            etat: 1
        }

        try {
            if(idRole === "ROL1" || role === "Chef de service") {
                const request = "http://localhost:8080/api/besoin/" + idBesoin;
                const response = await axios.put(request, data);

                if(response.data.error) {
                    console.log(error);
                    setError(error);
                } else if(response.data.data) {
                    navigate("/header/liste_besoins");
                }
            } else {
                alert("Vous ne pouvez pas valider ce besoin");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const refuserBesoin = async (e) => {
        e.preventDefault();

        const data = {
            etat: -1
        }

        try {
            const request = "http://localhost:8080/api/besoin/" + idBesoin;
            const response = await axios.put(request, data);

            if(response.data.error) {
                console.log(error);
                setError(error);
            } else if(response.data.data) {
                navigate("/header/liste_besoins");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="details-besoin">
            <div className="details-besoin__infos">
                <div className="details-besoin__infos__element">
                    ID : {besoin.id}
                </div>
                <div className="details-besoin__infos__element">
                    Date : {besoin.dateBesoin}
                </div>
                <div className="details-besoin__infos__element">
                    Date Limite : {besoin.dateLimite}
                </div>
            </div>

            <div className="details-besoin__articles">
                <div className="details-besoin__articles--header">
                    <div className="details-besoin__articles--header__element">
                        Catégorie
                    </div>
                    <div className="details-besoin__articles--header__element">
                        Article
                    </div>
                    <div className="details-besoin__articles--header__element">
                        Quantité
                    </div>
                </div>

                {besoin.listeArticles && besoin.listeArticles.map((article) => (
                    <div className="details-besoin__articles--content">
                        <div className="details-besoin__articles--content__element">
                            {article.categorie}
                        </div>
                        <div className="details-besoin__articles--content__element">
                            {article.nomArticle}
                        </div>
                        <div className="details-besoin__articles--content__element">
                            {article.quantite}
                        </div>
                    </div>
                ))}

                <div className="details-besoin__buttons">
                    <div className="details-besoin__buttons__element">
                        <Bouton 
                            text="Refuser"
                            variant="outlined"
                            color="secondary"
                            className="details-besoin__buttons__element--button"
                            onClick={refuserBesoin}
                        />
                    </div>
                    <div className="details-besoin__buttons__element">
                        <Bouton 
                            text="Valider"
                            variant="outlined"
                            endIcon={<Done />}
                            color="success"
                            className="details-besoin__buttons__element--button"
                            onClick={validerBesoin}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsBesoins;