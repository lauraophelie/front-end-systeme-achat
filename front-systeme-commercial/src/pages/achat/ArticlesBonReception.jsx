import { useLocation } from "react-router-dom";
import "../../assets/scss/bon_reception.scss";
import TextInput from "../../components/TextInput";
import Bouton from "../../components/Bouton";
import { useEffect, useState } from "react";
import axios from "axios";

function ArticlesBonReception() {
    const location = useLocation();
    const reception = location.state.reception;

    const [articles, setArticles] = useState(null);
    const [quantiteValues, setQuantiteValues] = useState({});
    const [prixUnitaireValues, setPrixUnitaireValues] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const urlArticles = "http://localhost:8080/api/bon-commande/all/" + reception.bonCommande;
            try {
                const response = await axios.get(urlArticles);

                if (response.data.error) {
                    console.log(response.data.error);
                    setError(response.data.error);
                } else if (response.data.data) {
                    const dataArticles = response.data.data.articlesBonCommande;
                    setArticles(dataArticles);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    console.log(error);

    const handleQuantiteChange = (index, event) => {
        setQuantiteValues((prevValues) => ({
            ...prevValues,
            [index]: event.target.value,
        }));
    };

    const handlePrixUnitaireChange = (index, event) => {
        setPrixUnitaireValues((prevValues) => ({
            ...prevValues,
            [index]: event.target.value,
        }));
    };

    const genererBonReception = async () => {
        console.log("Quantités:", quantiteValues);
        console.log("Prix unitaires:", prixUnitaireValues);
        
        const dataBonReception = {
            dateReception: reception.dateReception,
            fournisseur: {
                id: reception.fournisseur
            },
            bonCommande: {
                id: reception.bonCommande
            },
            articlesBonReception: articles.map((item, index) => ({
                article: {
                    id: item.article.id
                },
                quantite: Number(quantiteValues[index]),
                prixAchat: Number(prixUnitaireValues[index])
            }))
        };
        console.log(JSON.stringify(dataBonReception));

        try {
            const url = "http://localhost:8080/api/bon_reception/generate";
            const response = await axios.post(url, dataBonReception);

            if(response.data.error) {
                alert(response.data.error);
            } else if(response.data.data) {
                console.log(response.data.data);
            } 
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="article_bon_reception">
            <h2 className="bon_reception__title">
                Générer bon de réception (2)
            </h2>

            <div className="bon_reception__form">
                {articles && articles.map((item, index) => (
                    <div className="article_bon_reception__element" key={index}>
                        <div className="article_bon_reception__element--input">
                            <TextInput
                                label="Article"
                                value={item.article.nomArticle}
                                ariaReadonly={true}
                            />
                        </div>
                        <div className="article_bon_reception__element--input">
                            <TextInput
                                label="Quantité"
                                required={true}
                                onChange={(e) => handleQuantiteChange(index, e)}
                            />
                        </div>
                        <div className="article_bon_reception__element--input">
                            <TextInput
                                label="Prix unitaire"
                                required={true}
                                onChange={(e) => handlePrixUnitaireChange(index, e)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="article_bon_reception__submit">
                <Bouton
                    text="Générer"
                    variant="contained"
                    className="article_bon_reception__submit--button"
                    onClick={genererBonReception}
                />
            </div>
        </div>
    );
}

export default ArticlesBonReception;
