import "../../assets/scss/etat_stock.scss";
import Bouton from "../../components/Bouton";
import DropDown from "../../components/DropDown";
import DateInput from "../../components/DateInput";
import { useEffect, useState } from "react";
import axios from "axios";

function EtatStock() {
    const [articles, setArticles] = useState(null);
    const [etatStock, setEtatStock] = useState();

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

    const [etatStockContent, setEtatStockContent] = useState({
        dateDebut: "",
        dateFin: "",
        idArticle: ""
    });

    const handleChange = (name, event) => {
        setEtatStockContent((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }));
    };

    const handleChangeDate = (dateInput, value) => {
        const date = new Date(value.format('YYYY-MM-DD'));
        value = date.toISOString();

        setEtatStockContent((prevState) => ({
            ...prevState,
            [dateInput]: value
        }));
    };

    const getEtatStock = async(e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:8080/api/etat_stock";
            const response = await axios.post(url, etatStockContent);

            if(response.data.error) {
                alert(response.data.error);
            } else if(response.data.data) {
                const data = response.data.data;
                setEtatStock(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="etat_stock">
            <h2 className="etat_stock__title">
                Etat des stocks
            </h2>

            <div className="etat_stock__form">
                <div className="etat_stock__form__element">
                    <DateInput
                        label="Date début"
                        className="etat_stock__form__input"
                        onChange={(value) => handleChangeDate("dateDebut", value)}
                    />
                </div>
                <div className="etat_stock__form__element">
                    <DateInput 
                        label="Date fin"
                        className="etat_stock__form__input"
                        onChange={(value) => handleChangeDate("dateFin", value)}
                    />
                </div>
                <div className="etat_stock__form__element">
                    <DropDown 
                        label="Article"
                        className="etat_stock__form__input"
                        data={articles}
                        onChange={(value) => handleChange("idArticle", value)}
                    />
                </div>
                <div className="etat_stock__form__element">
                    <Bouton
                        variant="contained"
                        text="Valider"
                        className="etat_stock__form__button"
                        onClick={getEtatStock}
                    />
                </div>
            </div>

            {etatStock && (
                <div className="etat_stock__content">
                    <div className="etat_stock__content__header">
                        <div className="etat_stock__content__element">
                            Article
                        </div>
                        <div className="etat_stock__content__element">
                            Quantité initiale
                        </div>
                        <div className="etat_stock__content__element">
                            Quantité sortie
                        </div>
                        <div className="etat_stock__content__element">
                            Reste
                        </div>
                        <div className="etat_stock__content__element">
                            Montant
                        </div>
                        <div className="etat_stock__content__element">
                            Prix unitaire
                        </div>
                    </div>

                    <div className="etat_stock__content__etat">
                        <div className="etat_stock__content__element">
                            {etatStock && etatStock.idArticle}
                        </div>
                        <div className="etat_stock__content__element">
                            {etatStock && etatStock.qteInitial}
                        </div>
                        <div className="etat_stock__content__element">
                            {etatStock && etatStock.qteSortie}
                        </div>
                        <div className="etat_stock__content__element">
                            {etatStock && etatStock.reste}
                        </div>
                        <div className="etat_stock__content__element">
                            {etatStock && etatStock.montant}
                        </div>
                        <div className="etat_stock__content__element">
                            e
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EtatStock;