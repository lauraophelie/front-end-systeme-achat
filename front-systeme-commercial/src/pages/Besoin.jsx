import "../assets/scss/besoin.scss";
import { Typography } from "@mui/material";
import DateInput from "../components/DateInput";
import CheckBoxesListe from "../components/CheckBoxesListe";
import Bouton from "../components/Bouton";
import { useState } from "react";

const data = [
    { title: "Stylo" },
    { title: "Ordinateur" },
    { title: "Crayon" },
    { title: "Disque dur" }
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

    const createBesoin = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formValues, null, 2));
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
