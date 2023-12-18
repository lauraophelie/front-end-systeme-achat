import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/scss/bon_entree.scss";
import { Checkbox } from "@mui/material";
import Bouton from "../../components/Bouton";
import { useNavigate } from "react-router-dom";

function GenerateBonSortie() {
    const [sorties, setSorties] = useState();

    useEffect(() => {
        const url = "http://localhost:8080/api/sortie";
        const fetchData = async() => {
            try {
                const request = await axios.get(url);
                
                if(request.data.error) {
                    console.log(request.data.error);
                } else if(request.data.data) {
                    const data = request.data.data;
                    setSorties(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const checkedSorties = [];

    const checkSortie = (item) => {
        checkedSorties.push(item);
    }

    const navigate = useNavigate();

    const generateBonSortie = async (e) => {
        e.preventDefault();
        console.log(checkedSorties);

        const data = {
            dateCreation: Date.now(),
            detailsBonSorties: checkedSorties.map((item) => ({
                article: {
                    id: item.idArticle
                },
                quantite: item.qteSortie,
                prixUnitaire: 0
            }))
        }
        try {
            const url = "http://localhost:8080/api/magasin/bon_sortie/generate";
            const request = await axios.post(url, data);

            if(request.data.error) {
                alert(request.data.error);
            } else if(request.data.data) {
                navigate("/header/magasin/bon_sortie");
                console.log(request.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="bon_entree">
            <h2 className="bon_entree__title">
                Générer un bon de sortie
            </h2>

            <div className="bon_entree__header">
                <div className="bon_entree__header--element">
                    
                </div>
                <div className="bon_entree__header--element">
                    Date
                </div>
                <div className="bon_entree__header--element">
                    Article
                </div>
                <div className="bon_entree__header--element">
                    Quantité sortie
                </div>
            </div>

            {sorties && sorties.map((item, index) => (
                <div className="bon_entree__content" key={index}>
                    <div className="bon_entree__content--element">
                        <Checkbox 
                            value={item.idSortie}
                            onChange={() => checkSortie(item)}
                        />
                    </div>
                    <div className="bon_entree__content--element">
                        {item.dateSortie}
                    </div>
                    <div className="bon_entree__content--element">
                        {item.idArticle}
                    </div>
                    <div className="bon_entree__content--element">
                        {item.qteSortie}
                    </div>
                </div>
            ))}

            <div className="bon_sortie__submit">
                <Bouton
                    text="Génerer bon de sortie"
                    variant="contained"
                    className="bon_sortie__submit--button"
                    onClick={generateBonSortie}
                />
            </div>
        </div>
    )
}

export default GenerateBonSortie;