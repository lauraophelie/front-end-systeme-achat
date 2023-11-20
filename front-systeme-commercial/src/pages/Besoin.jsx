import "../assets/scss/besoin.scss";
import { Typography } from "@mui/material";
import DateInput from "../components/DateInput";
import CheckBoxesListe from "../components/CheckBoxesListe";
import Bouton from "../components/Bouton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const data = [
    { id: "ART001", title: "Stylo", quantite: 0 },
    { id: "ART002", title: "Ordinateur", quantite: 0 },
    { id: "ART003", title: "Crayon", quantite: 0 },
    { id: "ART004", title: "Disque dur", quantite: 0 }
];

function Besoin() {
    const btn = {
        variant: "contained",
        text: "Suivant",
        className: "def-besoin__form--submit-besoin__button"
    };

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
    const [error, setError] = useState(null);

    const createBesoin = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formValues, null, 2));

        const formattedFormValues = {
            ...formValues,
            date: formValues.date.format('YYYY-MM-DD'),
            dateLimite: formValues.dateLimite.format('YYYY-MM-DD')
        };

        /*
        const besoin = {
            serviceConcerne: "",
            dateBesoin: formValues.date.format('YYYY-MM-DD'),
            dateLimite: formValues.dateLimite.format('YYYY-MM-DD'),
            etat: 0
        }

        try {
            const response = await axios.post("", besoin);

            if(response.data.error) {
                console.log(error)
                setError(response.data.error)
            } else if(response.data.data) {
                navigate("/header/besoin_articles", { state : { formData: formattedFormValues } });
            }
        } catch (e) {
            console.error(e);
        }
        */
        navigate("/header/besoin_articles", { state : { formData: formattedFormValues } });
    };

    return (
        <>
            <div className="def-besoin">
                <Typography variant="h4" className="def-besoin__title">
                    Besoins
                </Typography>
                
                <div className="def-besoin__form">
                    <div className="def-besoin__form--input__one">
                        <DateInput 
                            label="Date" 
                            className="def-besoin__form--input__input"
                            onChange={(value) => handleChange("date", value)} 
                        />
                    </div>

                    <div className="def-besoin__form--input__two">
                        <DateInput 
                            label="Date limite" 
                            className="def-besoin__form--input__input"
                            onChange={(value) => handleChange("dateLimite", value)}
                        />
                    </div>

                    <div className="def-besoin__form--articles">
                        <CheckBoxesListe 
                            data={data} 
                            limitTags={2} 
                            label="Articles"
                            onChange={(selectedItems) => handleChange("articles", selectedItems)}
                        />
                    </div>

                    <div className="def-besoin__form--submit-besoin">
                        <Bouton
                            variant={btn.variant}
                            text={btn.text}
                            className={btn.className}
                            onClick={createBesoin}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Besoin;
