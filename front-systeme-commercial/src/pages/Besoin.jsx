import "../assets/scss/besoin.scss";
import { Typography } from "@mui/material";
import DateInput from "../components/DateInput";
import CheckBoxesListe from "../components/CheckBoxesListe";
import Bouton from "../components/Bouton";
import Header from "../components/Header";

const data = [
    {title: "Stylo"},
    {title: "Ordinateur"},
    {title: "Crayon"},
    {title: "Disque dur"}
]

function Besoin() {
    const btn = {
        variant: "contained",
        text: "Suivant",
        className: "def-besoin__form--submit-besoin__button"
    };

    return (
        <>
            <Header />
            <div className="def-besoin">
                <Typography variant="h4" className="def-besoin__title">
                    Besoins
                </Typography>
                <div className="def-besoin__form">
                    <div className="def-besoin__form--input">
                        <div className="def-besoin__form--input__one">
                            <DateInput label="Date besoin" className="def-besoin__form--input__input" />
                        </div>
                        <div className="def-besoin__form--input__two">
                            <DateInput label="Date limite" className="def-besoin__form--input__input" />
                        </div>
                    </div>
                    <div className="def-besoin__form--articles">
                        <CheckBoxesListe data={data} placeHolder="Article" label="Articles" limitTags={3} className="def-besoin__form--input"/>
                    </div>
                    <div className="def-besoin__form--submit-besoin">
                        <Bouton variant={btn.variant} text={btn.text} className={btn.className} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Besoin;