import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/scss/bon_reception.scss";
import Bouton from "../../components/Bouton";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFBonReception from "../../pdf/PDFBonReception";
import { Download } from "@mui/icons-material";

function ListeBonReception() {
    const [bonReception, setBonReception] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const url = "http://localhost:8080/api/bon_reception";
            try {
                const response = await axios.get(url);
                if(response.data.error) {
                    console.error("Error: " + response.data.error);
                } else if(response.data.data) {
                    const data = response.data.data;
                    setBonReception(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();

    const genererBonEntree = async (bonReception) => {
        console.log(bonReception);
        console.log(JSON.stringify(bonReception));

        const url = "http://localhost:8080/api/magasin/bon_entree/generate";

        try {
            const request = await axios.post(url, bonReception);
            if(request.data.error) {
                setError(request.data.error);
                alert(error);
            } else if(request.data.data) {
                console.log(request.data.data);
            }
        } catch (error) {
            console.error(error);  
        }
    }

    return (
        <div className="liste_bon_reception">
            <h2 className="liste_bon_reception__title">
                Bons de réception
            </h2>

            <div className="liste_bon_reception__header">
                <div className="liste_bon_reception__header--element">
                    Numéro
                </div>
                <div className="liste_bon_reception__header--element">
                    Date de réception
                </div>
                <div className="liste_bon_reception__header--element">
                    Bon de commande
                </div>
                <div className="liste_bon_reception__header--element">
                    Détails
                </div>
                <div className="liste_bon_reception__header--element">
                    Export
                </div>
                <div className="liste_bon_reception__header--element">
                    Générer
                </div>
            </div>

            {bonReception && bonReception.map((item, index) => (
                <div className="liste_bon_reception__content" key={index}>
                    <div className="liste_bon_reception__content--element">
                        {item.id}
                    </div>
                    <div className="liste_bon_reception__content--element">
                        {item.dateReception}
                    </div>
                    <div className="liste_bon_reception__content--element">
                        {item.bonCommande.id}
                    </div>
                    <div className="liste_bon_reception__content--element">
                        <Bouton
                            variant="outlined"
                            text="Détails"
                            size="small"
                            onClick={() => { navigate("/header/achat/details_bon_reception", { state: { id: item.id } })}}
                        />
                    </div>
                    <div className="liste_bon_reception__content--element">
                        <PDFDownloadLink document={<PDFBonReception idBonReception={item.id} />} fileName={"reception_" + item.id + ".pdf"}>
                            {({loading}) => loading ? 'Loading' :
                                <Bouton variant="outlined" text="PDF" size="small" endIcon={<Download />} />
                            }
                        </PDFDownloadLink>
                    </div>
                    <div className="liste_bon_reception__content--element">
                        <Bouton
                            variant="contained"
                            text="Bon d'entrée"
                            size="small"
                            onClick={() => genererBonEntree(item)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListeBonReception;