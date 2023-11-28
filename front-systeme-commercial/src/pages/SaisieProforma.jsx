/* eslint-disable react/jsx-key */
import { Typography } from "@mui/material";
import TextInput from "../components/TextInput";
import "../assets/scss/proforma.scss";
import Bouton from "../components/Bouton";
import DropDown from "../components/DropDown";
import { useState } from "react";
import axios from "axios";

function SaisieProforma() {
    const fournisseur = [
        { id: "FRN1", nom: "Super U"},
        { id: "FRN2", nom: "Jumbo Score"}
    ];
    const article = [
        { id: "ART1", nom: "Stylo"},
        { id: "ART2", nom: "Crayon"}
    ];

    /*const [data, setData] = useState([]);

    const [proforma, setProforma] = useState({
        fournisseur: "",
        article: "",
        quantite: 0,
        prixUnitaire: 0
    });

    const handleChange = (name, event) => {
        //console.log(`Setting ${name} to:`, event.target.value);
        /*setProforma(prevState => ({
            ...prevState,
            [name]: event.target.value
        }));
    };*/

    /*const handleClick = (e) => {
        e.preventDefault();
        setData(prevData => [...prevData, proforma]);
    }*/
    
    const validerProforma = async (e) => {
        e.preventDefault();

        /*let groupedData = data.reduce((acc, item) => {
            const { fournisseur, article, quantite, prixUnitaire } = item;
            if (!acc[fournisseur]) {
                acc[fournisseur] = [];
            }
            acc[fournisseur].push({
                idArticle: article,
                quantites: Number(quantite),
                prixU: Number(prixUnitaire)
            });
            return acc;
        }, {});

        let dataProforma = {
            idArticle: Object.values(groupedData).flatMap(item => item.map(i => i.idArticle)),
            quantites: Object.values(groupedData).flatMap(item => item.map(i => i.quantites)),
            prixU: Object.values(groupedData).flatMap(item => item.map(i => i.prixU)),
            idFournisseurs: Object.keys(groupedData),
            date: Date.now()
        }
        console.log(JSON.stringify(dataProforma));*/

        /*try {
            const response = await axios.post("http://localhost:8080/api/proforma/new", dataProforma);
            console.log(response);
        } catch (error) {
            console.error(error);
        }*/
    }

    return (
        <div className="proforma">
            <Typography variant="h4" className="proforma__title">
                Saisie de proforma
            </Typography>

            <div className="proforma__input__one">
                <DropDown
                    data={fournisseur} 
                    width="200px"
                    label="Fournisseur"
                />

                <DropDown
                    data={article} 
                    width="200px"
                    label="Article"
                />
            </div>

            <div className="proforma__input__two">
                <TextInput 
                    type="text" 
                    label="Quantité" 
                />
                
                <TextInput 
                    type="text" 
                    label="Prix Unitaire"
                />
            </div>

            <div className="proforma__submit">
                <Bouton
                    text="Valider"
                    variant="outlined"
                    className="proforma__submit--button"
                    onClick={validerProforma}
                />
            </div>
        </div>
    )
}

export default SaisieProforma;

 