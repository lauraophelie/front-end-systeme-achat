import { useEffect, useState } from "react";
import "../assets/scss/besoin.scss";
import Bouton from "../components/Bouton";
import CheckBoxesListe from "../components/CheckBoxesListe";
import DateInput from "../components/DateInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Besoin() {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/articles");
    
                if(response.data.error) {
                    setError(response.data.error);
                } else if(response.data.data) {
                    const liste = response.data.data.map((item) => ({
                        id: item.id,
                        title: item.nomArticle,
                        quantite: 0,
                        categorie: item.categorie.nomCategorie
                    }));
                    setArticles(liste);
                }
            } catch(error) {
                console.error(error);
            }
        }
        fetchArticle();
    }, []);

    const [formValues, setFormValues] = useState({
        date: "",
        dateLimite: "",
        articles: []
    })

    const handleChange = (name, value) => {
        console.log(`Setting ${name} to:`, value);
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const createBesoin = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formValues, null, 2));

        const formattedFormValues = {
            ...formValues,
            date: formValues.date.format('YYYY-MM-DD'),
            dateLimite: formValues.dateLimite.format('YYYY-MM-DD')
        };

        const session = sessionStorage.getItem("userData");
        const service = JSON.parse(session).service;
        const idService = service.id;

        const besoin = {
            idService: idService,
            dateBesoin: formValues.date.format('YYYY-MM-DD'),
            dateLimite: formValues.dateLimite.format('YYYY-MM-DD'),
            etat: 0
        }

        try {
            const response = await axios.post("http://localhost:8080/api/besoin/create", besoin);

            if(response.data.error) {
                console.log(error)
                setError(response.data.error)
            } else if(response.data.data) {
                navigate("/header/besoin_articles", { state : { formData: formattedFormValues } });
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="ajout-besoin">
            <h2 className="ajout-besoin__title">
                Besoin
            </h2>

            <div className="ajout-besoin__form">
                <div className="ajout-besoin__form__title">
                    <h3 className="ajout-besoin__form--element">
                        Définir un besoin
                    </h3>
                </div>
                <div className="ajout-besoin__form__content">
                    <div className="ajout-besoin__form__content--input__one">
                        <DateInput 
                            label="Date besoin"
                            className="ajout-besoin__form__content--input__date--def"
                            onChange={(value) => handleChange("date", value)}
                        />
                        <DateInput 
                            label="Date Limite"
                            className="ajout-besoin__form__content--input__date--limit"
                            onChange={(value) => handleChange("dateLimite", value)}
                        />
                    </div>

                    <div className="ajout-besoin__form__content--input__select">
                        <CheckBoxesListe 
                            data={articles}
                            limitTags={3}
                            placeholder="Article"
                            label="Choisisez des articles"
                            className="ajout-besoin__form__content--input__select--input"
                            onChange={(selectedItems) => handleChange("articles", selectedItems)}
                        />
                    </div>

                    <div className="ajout-besoin__form__content--input__submit">
                        <div className="ajout-besoin__form__content--input__submit__element">
                            <Bouton
                                text="Retour"
                                variant="outlined"
                                color="secondary"
                                className="ajout-besoin__form__content--input__submit--button"
                                onClick={() => navigate("/header/liste_besoins")}
                            />
                        </div>
                        <div className="ajout-besoin__form__content--input__submit__element">
                            <Bouton
                                text="Suivant"
                                variant="outlined"
                                color="primary"
                                className="ajout-besoin__form__content--input__submit--button"
                                onClick={createBesoin}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Besoin;