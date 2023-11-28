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
        { id: "FRN1", nom: "Super U"}
    ];
    const article = [
        { id: "ART1", nom: "Stylo"}
    ];

    const [data, setData] = useState([]);

    const [proforma, setProforma] = useState({
        fournisseur: "",
        article: "",
        quantite: 0,
        prixUnitaire: 0
    });

    const handleChange = (name, event) => {
        console.log(`Setting ${name} to:`, event.target.value);
        setProforma(prevState => ({
            ...prevState,
            [name]: event.target.value
        }));
    }; 

    const handleClick = (e) => {
        e.preventDefault();
        setData(prevData => [...prevData, proforma]);
    }  
    
    const validerProforma = async (e) => {
        e.preventDefault();

        let groupedData = data.reduce((acc, item) => {
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
            idFournisseurs: Object.keys(groupedData)[0],
            date: Date.now()
        }
        console.log(dataProforma);

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

            <div className="proforma__input">
                <DropDown
                    data={fournisseur} 
                    width="200px"
                    label="Fournisseur"
                    onChange={(value) => handleChange("fournisseur", value)}
                />

                <DropDown
                    data={article} 
                    width="200px"
                    label="Article"
                    onChange={(value) => handleChange("article", value)}
                />

                <TextInput 
                    type="text" 
                    label="Quantité" 
                    onChange={(value) => handleChange("quantite", value)}
                />
                
                <TextInput 
                    type="text" 
                    label="Prix Unitaire"
                    onChange={(value) => handleChange("prixUnitaire", value)}
                />

                <Bouton 
                    text="Ajouter" 
                    variant="outlined"
                    className="proforma__add"
                    onClick={handleClick}
                />
            </div>

            {data && data.map((item) => {
                return (
                    <div className="proforma__content">
                        <div className="proforma__content__box">
                            <Typography variant="subtitle1" sx={{ paddingTop: "15px"}}>
                                {fournisseur.find(fournisseur => fournisseur.id === item.fournisseur).nom}
                            </Typography>
                        </div>
                        <div className="proforma__content__box">
                            <Typography variant="subtitle1" sx={{ paddingTop: "15px"}}>
                                {article.find(article => article.id === item.article).nom}
                            </Typography>
                        </div>
                        <div className="proforma__content__box">
                            <Typography variant="subtitle1" sx={{ paddingTop: "15px"}}>
                                {item.quantite}
                            </Typography>
                        </div>
                        <div className="proforma__content__box">
                            <Typography variant="subtitle1" sx={{ paddingTop: "15px"}}>
                                {item.prixUnitaire}
                            </Typography>
                        </div>
                    </div>
                )
            })}

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

 