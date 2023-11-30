import axios from "axios";
import "../assets/scss/besoin.scss";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArticleBesoins from "../components/ArticleBesoin";
import Bouton from "../components/Bouton";

function DefArticleBesoin() {
    const location = useLocation();
    const data = location.state.formData 

    const articles = data.articles;

    console.log(articles);

    const [quantites, setQuantites] = useState(
        articles.reduce((acc, article) => {
            acc[article.id] = article.quantite;
            return acc;
        }, {})
    );

    const handleQuantityChange = (articleId, quantite) => {
        setQuantites(prevQuantites => ({
            ...prevQuantites,
            [articleId]: quantite
        }))
    };

    const updatedArticles = articles.map(article => ({
        ...article,
        quantite: quantites[article.id] || 0
    }));

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const setArticles = async (e) => {
        e.preventDefault();
        console.log("Quantite actuelles : ", quantites);
        console.log("Articles : ", updatedArticles);

        const keysArticles = Object.keys(quantites);
        const quantitesData = Object.values(quantites).map(Number);

        const articlesBesoin = {
            idArticles: keysArticles,
            qte: quantitesData
        }

        try {
            const response = await axios.post("http://localhost:8080/api/besoin/createWithArticles", articlesBesoin);

            if(response.data.error) {
                console.log(error);
                setError(error);
            } else if(response.data.data) {
                navigate("/header/liste_besoins");
            }
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="articles_besoin">
            <h2 className="articles_besoin__title">
                Besoin
            </h2>

            <div className="articles_besoin__form">
                <ArticleBesoins
                    data={articles} 
                    className="articles_besoin__form--input"
                    quantites={quantites}
                    inputClassName="def-articles__articles--items"
                    onQuantityChange={handleQuantityChange}
                />
            </div>

            <div className="articles_besoin__submit">
                <Bouton
                    variant="outlined"
                    color="primary"
                    text="Ajouter"
                    className="articles_besoin__submit--button"
                    onClick={setArticles}
                />
            </div>
        </div>
    )
}

export default DefArticleBesoin;