import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/scss/besoin.scss";
import Bouton from "../../components/Bouton";

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
                    Paiement
                </div>
                <div className="bon_commande__header--element">
                    
                </div>
            </div>

            {bonCommande && bonCommande.map((item) => (
                <div key={item.id} className="bon_commande__content">
                    <div className="bon_commande__content--element">
                        {item.numero}
                    </div>
                    <div className="bon_commande__content--element">
                        {item.delaiLivraison}
                    </div>
                    <div className="bon_commande__content--element">
                        {item.paiement}
                    </div>
                    <div className="bon_commande__content--element">
                        <Bouton
                            variant="outlined"
                            text="Détails"
                            size="small"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GenerateBonCommande;
