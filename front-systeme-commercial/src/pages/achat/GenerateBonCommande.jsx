import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/scss/bon_commande.scss";
import Bouton from "../../components/Bouton";
import ChipComponent from "../../components/ChipComponent";
import { useNavigate } from "react-router-dom";
import { Download } from "@mui/icons-material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFBonCommande from "../../pdf/PDFBonCommande";

function GenerateBonCommande() {
    const [bonCommande, setBonCommande] = useState(null);

    useEffect(() => {
        const urlRequest = "http://localhost:8080/api/bon-commande/all";
        const fetchData = async () => {
            try {
                const response = await axios.get(urlRequest);

                if (response.data) {
                    setBonCommande(response.data);
                    console.log(bonCommande);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="bon_commande">
            <h2 className="bon_commande__title">
                Bons de commande
            </h2>

            <div className="bon_commande__header">
                <div className="bon_commande__header--element">
                    Numéro
                </div>
                <div className="bon_commande__header--element">
                    Délai livraison
                </div>
                <div className="bon_commande__header--element">
                    Etat
                </div>
                <div className="bon_commande__header--element">
                    
                </div>
                <div className="bon_commande__header--element">
                    
                </div>
            </div>

            {bonCommande && bonCommande.map((item) => (
                <div key={item.id} className="bon_commande__content">
                    <div className="bon_commande__content--element">
                        {item.id}
                    </div>
                    <div className="bon_commande__content--element">
                        {item.delaiLivraison}
                    </div>
                    <div className="bon_commande__content--element">
                        <ChipComponent variant="outlined" type={item.etat}/>
                    </div>
                    <div className="bon_commande__content--element">
                        <Bouton
                            variant="outlined"
                            text="Détails"
                            size="small"
                            onClick={() => { navigate("/header/achat/details_bon_commande", { state: { id: item.id } })}}
                        />
                    </div>
                    <div className="bon_commande__content--element">
                        <PDFDownloadLink document={<PDFBonCommande idBonCommande={item.id} />} fileName={"commande_" + item.id + ".pdf"}>
                            {({loading}) => loading ? 'Loading' :
                                <Bouton variant="outlined" text="PDF" size="small" endIcon={<Download />} />
                            }
                        </PDFDownloadLink>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GenerateBonCommande;
