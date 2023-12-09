import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import "../../assets/scss/bon_commande.scss";
import DateInput from "../../components/DateInput";
import DropDown from "../../components/DropDown";
import TextInput from "../../components/TextInput";
import Bouton from "../../components/Bouton";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BonCommande() {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [articles, setArticles] = useState([]);
    const [modePaiement, setModePaiement] = useState([]);
    const [tva, setTva] = useState();

    const [bonCommande, setBonCommande] = useState({
        fournisseur: "",
        delaiLivraison: null,
        modePaiement: "",
        livraisonPartielle: ""
    })

    useEffect(() => {
        const fetchData = async() => {
            const baseUrl = "http://localhost:8080/api/";

            const fournisseursUrl = baseUrl + "fournisseur";
            const articlesUrl = baseUrl + "articles";
            const modePaiementUrl = baseUrl + "mode_paiement";
            const tvaUrl = baseUrl + "tva";

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

                const modePaiementResponse = await axios.get(modePaiementUrl);

                if(modePaiementResponse.data.error) {
                    console.error(modePaiementResponse.data.error)
                } else if(modePaiementResponse.data.data) {
                    const modePaiementData = modePaiementResponse.data.data;
                    setModePaiement(modePaiementData);
                }

                const tvaResponse = await axios.get(tvaUrl);

                if(tvaResponse.data.error) {
                    console.error('Error: ' + tvaResponse.date.error);
                } else if(tvaResponse.data.data) {
                    const tvaData = tvaResponse.data.data;
                    setTva(tvaData);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const [articlesBonCommande, setArticlesBonCommande] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [prixUnitaire, setPrixUnitaire] = useState("");
    const [quantite, setQuantite] = useState("");

    const handleChange = (name, event) => {
        setBonCommande((prevState) => ({
            ...prevState,
            [name]: event.target.value
        }), () => {
            console.log("Updated proforma:", bonCommande);
        });
    };

    const handleChangeDate = (value) => {
        const date = new Date(value.format('YYYY-MM-DD'));
        value = date.toISOString();

        setBonCommande((prevState) => ({
            ...prevState,
            ["delaiLivraison"]: value
        }), () => {
            console.log("Updated bon de commande :", bonCommande);
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

            const existingArticleIndex = articlesBonCommande.findIndex(
                (item) => item.article.id === selectedArticle
            );

            if (existingArticleIndex !== -1) {
                setArticlesBonCommande((prevState) => {
                    const updatedArticles = [...prevState];

                    updatedArticles[existingArticleIndex].prixUnitaire = prixUnitaire;
                    updatedArticles[existingArticleIndex].quantite = quantite;

                    return updatedArticles;
                });
            } else {
                setArticlesBonCommande((prevState) => [
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

    const genererBonCommande = async (e) => {
        e.preventDefault();
    
        const bon = {
            dateCreation: Date.now(),
            fournisseur: {
                id: bonCommande.fournisseur
            },
            delaiLivraison: bonCommande.delaiLivraison,
            livraisonPartielle: bonCommande.livraisonPartielle,
            modePaiement: {
                id: bonCommande.modePaiement
            },
            articlesBonCommande: articlesBonCommande.map((article) => ({
                article: {
                    id: article.article
                },
                tva: Number(tva.valueTva),
                quantite: Number(article.quantite),
                puHT: Number(article.prixUnitaire),
                puTTC: (Number(article.prixUnitaire) + (Number(article.prixUnitaire)*(Number(tva.valueTva)/100)))
            }))
        };
        console.log(JSON.stringify(bon));

        try {
            const url = "http://localhost:8080/api/bon-commande/add";
            const response = await axios.post(url, bon);

            navigate("/header/achat/bons_commande");
            
            console.log(response);
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    };

    return (
        <div className="saisie_bon_commande">
            <h2 className="saisie_bon_commande__title">
                Générer bon de commande
            </h2>

            <div className="saisie_bon_commande__form">
                <div className="saisie_bon_commande__form__infos">
                    <div className="saisie_bon_commande__form__infos--element">
                        <DropDown
                            label="Fournisseur"
                            required={true}
                            name="fournisseur"
                            data={fournisseurs}
                            className="saisie_bon_commande__form__infos--select"
                            onChange={(value) => handleChange("fournisseur", value)}
                        />
                    </div>

                    <div className="saisie_bon_commande__form__infos--element">
                        <DateInput
                            label="Délai de livraison"
                            className="saisie_bon_commande__form__infos--date"
                            onChange={(value) => handleChangeDate(value)}
                            name="delaiLivraison"
                        />
                    </div>

                    <div className="saisie_bon_commande__form__infos--element">
                        <DropDown
                            label="Mode de paiement"
                            required={true}
                            name="paiement"
                            data={modePaiement}
                            className="saisie_bon_commande__form__infos--select"
                            onChange={(value) => handleChange("modePaiement", value)}
                        />
                    </div>

                    <div className="saisie_bon_commande__form__infos--element">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label"> Livraison partielle </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    onChange={(value) => handleChange("livraisonPartielle", value)}
                                >
                                    <FormControlLabel value="true" control={<Radio />} label="Oui" />
                                    <FormControlLabel value="false" control={<Radio />} label="Non" />
                                </RadioGroup>
                        </FormControl>
                    </div>
                </div>

                <div className="saisie_bon_commande__form__articles">
                    <div className="saisie_bon_commande__form__articles--element">
                        <DropDown
                            label="Article"
                            required={true}
                            name="article"
                            data={articles}
                            onChange={handleArticleChange}
                        />
                    </div>

                    <div className="saisie_bon_commande__form__articles--element">
                        <TextInput
                            label="Quantité"
                            name="quantite"
                            required={true}
                            type="text"
                            value={quantite}
                            onChange={handleQuantiteChange}
                        />
                    </div>

                    <div className="saisie_bon_commande__form__articles--element">
                        <TextInput
                            label="Prix unitaire"
                            name="prix_unitaire"
                            required={true}
                            type="text"
                            value={prixUnitaire}
                            onChange={handlePrixUnitaireChange}
                        />
                    </div>

                    <div className="saisie_bon_commande__form__articles--element">
                        <Bouton
                            text="Ajouter"
                            endIcon={<Add />}
                            variant="outlined"
                            className="saisie_bon_commande__form__articles--add"
                            onClick={handleAjouter}
                        />
                    </div>
                </div>

                {articlesBonCommande && articlesBonCommande.map((item, index) => (
                    <div className="saisie_bon_commande__form__content" key={index}>
                        <div className="saisie_bon_commande__form__content--element">
                            {item.article}
                        </div>
                        <div className="saisie_bon_commande__form__content--element">
                            {item.quantite}
                        </div>
                        <div className="saisie_bon_commande__form__content--element">
                            {item.prixUnitaire}
                        </div>
                        <div className="saisie_bon_commande__form__content--element">
                            #
                        </div>
                    </div>
                ))}
            </div>

            <div className="saisie_bon_commande__submit">
                <Bouton
                    text="Générer"
                    variant="contained"
                    className="saisie_bon_commande__submit--add"
                    onClick={genererBonCommande}
                />
            </div>
        </div>
    )
}

export default BonCommande;