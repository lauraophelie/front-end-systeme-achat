import { useEffect, useState } from "react";
import "../../assets/scss/magasin.scss";
import Bouton from "../../components/Bouton";
import DateInput from "../../components/DateInput";
import DropDown from "../../components/DropDown";
import TextInput from "../../components/TextInput";
import axios from "axios";

function EntreeStock() {
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            const baseUrl = "http://localhost:8080/api/";
            const articlesUrl = baseUrl + "articles";

            try {
                const articlesResponse = await axios.get(articlesUrl);

                if (articlesResponse.data.error) {
                    console.error(articlesResponse.data.error);
                } else if (articlesResponse.data.data) {
                    const articlesData = articlesResponse.data.data;

                    const dataArticles = articlesData.map((article) => ({
                        id: article.id,
                        nom: article.nomArticle,
                        categorie: article.categorie.nomCategorie
                    }));
                    setArticles(dataArticles);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const [entree, setEntree] = useState({
        dateEntree: "",
        article: "",
        quantite: "",
        prixUnitaire: ""
    });

    const handleChange = (name, event) => {
        setEntree((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }));
    };

    const handleChangeDate = (value) => {
        const date = new Date(value.format('YYYY-MM-DD'));
        value = date.toISOString();

        setEntree((prevState) => ({
            ...prevState,
            ["dateEntree"]: value
        }));
    };

    const validerEntree = async (e) => {
        e.preventDefault();
        
        const dataEntree = {
            dateEntree: entree.dateEntree,
            idArticle: [entree.article],
            qteEntree: [entree.quantite],
            prix: [entree.prixUnitaire]
        }
        
        try {
            const url = "http://localhost:8080/api/entree/new";
            const response = await axios.post(url, dataEntree);

            if(response.data.error) {
                alert(response.data.error);
            } else if(response.data.data) {
                alert(response.data.data);
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="stock">
            <div className="stock__form">
                <h2 className="stock__title"> 
                    Entrée de stock 
                </h2>

                <DateInput
                    label="Date entrée"
                    className="stock__form__input"
                    onChange={(value) => handleChangeDate(value)}
                />

                <DropDown
                    label="Article"
                    data={articles}
                    className="stock__form__input"
                    onChange={(value) => handleChange("article", value)}
                />

                <TextInput
                    label="Prix unitaire"
                    className="stock__form__input"
                    onChange={(value) => handleChange("prixUnitaire", value)}
                />

                <TextInput
                    label="Quantité"
                    className="stock__form__input"
                    onChange={(value) => handleChange("quantite", value)}
                />

                <Bouton
                    text="Valider"
                    variant="contained"
                    className="stock__form__button"
                    onClick={validerEntree}
                />
            </div>
            <div></div>
        </div>
    )
}

export default EntreeStock;