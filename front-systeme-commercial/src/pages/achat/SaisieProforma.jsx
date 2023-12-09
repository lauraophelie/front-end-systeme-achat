/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import "../../assets/scss/proforma.scss";
import DateInput from "../../components/DateInput";
import DropDown from "../../components/DropDown";
import axios from "axios";
import TextInput from "../../components/TextInput";
import Bouton from "../../components/Bouton";
import { useNavigate } from "react-router-dom";

function SaisieProforma() {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [articles, setArticles] = useState([]);

    const [proforma, setProforma] = useState({
        fournisseur: "",
        dateSaisie: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const fournisseursUrl = "http://localhost:8080/api/fournisseur";
            const articlesUrl = "http://localhost:8080/api/articles";

            try {
                const fournisseursResponse = await axios.get(fournisseursUrl);

                if (fournisseursResponse.data.error) {
                    console.error(fournisseursResponse.data.error);
                } else if (fournisseursResponse.data.data) {
                    const fournisseursData = fournisseursResponse.data.data;
                    setFournisseurs(fournisseursData);
                }
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
        };
        fetchData();
    }, []);

    const [articlesProforma, setArticlesProforma] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [prixUnitaire, setPrixUnitaire] = useState("");
    const [quantite, setQuantite] = useState("");

    const handleChange = (name, event) => {
        console.log(`Setting ${name} to:`, event.target.value);
        console.log("Name:", name);
        console.log("Event:", event);
        console.log("Event target value:", event.target.value);

        setProforma((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }), () => {
            console.log("Updated proforma:", proforma);
        });
    };

    const handleArticleChange = (event) => {
        setSelectedArticle(event.target.value);
    };

    const handlePrixUnitaireChange = (event) => {
        setPrixUnitaire(event.target.value);
    };

    const handleQuantiteChange = (event) => {
        setQuantite(event.target.value);
    };

    const handleAjouter = () => {
        if (selectedArticle && prixUnitaire) {
            console.log("SelectedArticle : " + selectedArticle);

            const existingArticleIndex = articlesProforma.findIndex(
                (item) => item.article.id === selectedArticle
            );

            if (existingArticleIndex !== -1) {
                setArticlesProforma((prevState) => {
                    const updatedArticles = [...prevState];
                    updatedArticles[existingArticleIndex].prixUnitaire = prixUnitaire;
                    updatedArticles[existingArticleIndex].quantite = quantite;
                    return updatedArticles;
                });
            } else {
                setArticlesProforma((prevState) => [
                    ...prevState,
                    {
                        article: selectedArticle,
                        prixUnitaire: prixUnitaire,
                        quantite: quantite
                    }
                ]);
            }
            setSelectedArticle(null);
            setPrixUnitaire("");
            setQuantite("");
        }
    };

    const navigate = useNavigate();

    const saisieProforma = async (e) => {
        e.preventDefault();
    
        const dataProforma = {
            idArticle: articlesProforma.map((item) => item.article),
            prixU: articlesProforma.map((item) => Number(item.prixUnitaire)),
            quantites: articlesProforma.map((item) => Number(item.quantite)),
            idFournisseurs: proforma.fournisseur,
            date: Date.now()
        };
        
        console.log(JSON.stringify(dataProforma));

        try {
            const urlRequest = "http://localhost:8080/api/proforma/new";
            const response = await axios.post(urlRequest, dataProforma);
            navigate("/header/achat/saisie_proforma");
            
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="saisie_proforma">
            <h2 className="saisie_proforma__title">
                Saisie de proforma
            </h2>

            <div className="saisie_proforma__form">
                <div className="saisie_proforma__form__element">
                    <DropDown
                        label="Fournisseur"
                        className="saisie_proforma__form__element--select"
                        data={fournisseurs}
                        onChange={(value) => handleChange("fournisseur", value)}
                        name="fournisseur"
                    />
                </div>
                <div className="saisie_proforma__form__element">
                    <DateInput
                        label="Date saisie"
                        className="saisie_proforma__form__element--date"
                        onChange={(value) => handleChange("dateSaisie", value)}
                        name="dateSaisie"
                    />
                </div>
            </div>

            <div className="saisie_proforma__content">
                <div className="saisie_proforma__content__element">
                    <DropDown 
                        label="Article"
                        data={articles}
                        className="saisie_proforma__content__element--select"
                        onChange={handleArticleChange}
                    />
                </div>
                <div className="saisie_proforma__content__element">
                    <TextInput 
                        label="Prix unitaire"
                        type="number"
                        className="saisie_proforma__content__element--input"
                        value={prixUnitaire}
                        onChange={handlePrixUnitaireChange}
                    />
                </div>
                <div className="saisie_proforma__content__element">
                    <TextInput 
                        label="Quantité"
                        type="number"
                        value={quantite}
                        className="saisie_proforma__content__element--input"
                        onChange={handleQuantiteChange}
                    />
                </div>
                <div className="saisie_proforma__content__element">
                    <Bouton
                        variant="outlined"
                        text="Ajouter"
                        className="saisie_proforma__content__element--button"
                        onClick={handleAjouter}
                    />
                </div>
            </div>

            {articlesProforma && articlesProforma.map((item, index) => (
                <div className="saisie_proforma__data" key={index}>
                    <div className="saisie_proforma__data__element">
                        {item.article}
                    </div>
                    <div className="saisie_proforma__data__element">
                        {item.prixUnitaire}
                    </div>
                    <div className="saisie_proforma__data__element">
                        {item.quantite}
                    </div>
                </div>
            ))}

            <div className="saisie_proforma__submit">
                <Bouton 
                    text="Valider"
                    onClick={saisieProforma}
                    variant="outlined"
                />
            </div>
        </div>
    );
}

export default SaisieProforma;
