import { useEffect, useState } from "react";
import "../../assets/scss/magasin.scss"
import axios from "axios";
import TextInput from "../../components/TextInput";
import Bouton from "../../components/Bouton";
import DropDown from "../../components/DropDown";
import DateInput from "../../components/DateInput";

function SortieStock() {
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

    const [sortie, setsortie] = useState({
        dateSortie: "",
        article: "",
        quantite: ""
    });

    const handleChange = (name, event) => {
        setsortie((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }));
    };

    const handleChangeDate = (value) => {
        const date = new Date(value.format('YYYY-MM-DD'));
        value = date.toISOString();

        setsortie((prevState) => ({
            ...prevState,
            ["dateSortie"]: value
        }));
    };

    const validersortie = async (e) => {
        e.preventDefault();
        
        const dataSortie = {
            dateSortie: sortie.dateSortie,
            idArticle: [sortie.article],
            qteSortie: [Number(sortie.quantite)]
        }

        console.log(JSON.stringify(dataSortie));
        
        try {
            const url = "http://localhost:8080/api/sortie/new";
            const response = await axios.post(url, dataSortie);

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
                    Sortie de stock 
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
                    label="Quantité"
                    className="stock__form__input"
                    onChange={(value) => handleChange("quantite", value)}
                />

                <Bouton
                    text="Valider"
                    variant="contained"
                    className="stock__form__button"
                    onClick={validersortie}
                />
            </div>
            <div></div>
        </div>
    )
}

export default SortieStock;