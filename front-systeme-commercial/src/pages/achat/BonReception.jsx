import { useEffect, useState } from "react";
import "../../assets/scss/bon_reception.scss";
import Bouton from "../../components/Bouton";
import DateInput from "../../components/DateInput";
import DropDown from "../../components/DropDown";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BonReception() {
    const [fournisseur, setFournisseurs] = useState();
    const [bonCommandeValide, setBonCommandeValide] = useState(); 

    useEffect(() => {
        const fetchData = async () => {
            const baseUrl = "http://localhost:8080/api/";
            const fournisseursUrl = baseUrl + "fournisseur";
            const bonCommandeUrl = baseUrl + "bon-commande/all/envoi";

            console.log(bonCommandeUrl);

            try {
                const fournisseurData = await axios.get(fournisseursUrl);

                if(fournisseurData.data.error) {
                    console.error("Error: " + fournisseurData.data.error);
                } else if(fournisseurData.data.data) {
                    const data = fournisseurData.data.data;
                    setFournisseurs(data);
                }

                const bonCommandeData = await axios.get(bonCommandeUrl);
                console.log(bonCommandeData.data);

                if(bonCommandeData.data.error) {
                    console.log(bonCommandeData.data.error);
                } else if(bonCommandeData.data.data) {
                    const data =bonCommandeData.data.data;
                    setBonCommandeValide(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const [reception, setReception] = useState({
        dateReception: "",
        fournisseur: "",
        bonCommande: ""
    });

    const handleChangeDate = (value) => {
        const date = new Date(value.format('YYYY-MM-DD'));
        value = date.toISOString();

        setReception((prevState) => ({
            ...prevState,
            ["dateReception"]: value
        }));
    };

    const handleChange = (name, event) => {
        console.log(`Setting ${name} to:`, event.target.value);
        setReception(prevState => ({
            ...prevState,
            [name]: event.target.value
        }));
    };

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/header/achat/articles_bon_reception", { state : { reception : reception } });
    }

    console.log(reception);

    return (
        <div className="bon_reception">
            <h2 className="bon_reception__title">
                Générer bon de réception
            </h2>

            <div className="bon_reception__form">
                <div className="bon_reception__form--element">
                    <DateInput
                        label="Date de réception"
                        name="dateReception"
                        className="bon_reception__form--element--date"
                        onChange={(value) => handleChangeDate(value)}
                    />
                </div>

                <div className="bon_reception__form--element__one">
                    <div className="bon_reception__form--element__one__input">
                        <DropDown
                            label="Fournisseur"
                            className="bon_reception__form--element__one__input--select"
                            data={fournisseur}
                            required={true}
                            onChange={(value) => handleChange("fournisseur", value)}
                        />
                    </div>
                    <div className="bon_reception__form--element__one__input">
                        <DropDown
                            label="Bon de commande"
                            data={bonCommandeValide}
                            required={true}
                            onChange={(value) => handleChange("bonCommande", value)}
                        />
                    </div>
                </div>
            </div>

            <div className="bon_reception__submit">
                <Bouton
                    text="Suivant"
                    variant="contained"
                    className="bon_reception__submit--button"
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}

export default BonReception;