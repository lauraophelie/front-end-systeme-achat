/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "../../assets/scss/bon_entree.scss";
import Bouton from "../../components/Bouton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BonEntree() {
    const [bonEntree, setBonEntree] = useState();

    useEffect(() => {
        const url = "http://localhost:8080/api/magasin/bon_entree";
        const fetchData = async() => {
            try {
                const request = await axios.get(url);
                
                if(request.data.error) {
                    console.log(request.data.error);
                } else if(request.data.data) {
                    const data = request.data.data;
                    setBonEntree(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="bon_entree">
            <h2 className="bon_entree__title">
                Bons d'entrée
            </h2>

            <div className="bon_entree__header">
                <div className="bon_entree__header--element">
                    Numéro
                </div>
                <div className="bon_entree__header--element">
                    Date de création
                </div>
                <div className="bon_entree__header--element">
                    Bon de réception
                </div>
                <div className="bon_entree__header--element">

                </div>
                <div className="bon_entree__header--element">

                </div>
            </div>

            {bonEntree && bonEntree.map((item, index) => (
                <div className="bon_entree__content" key={index}>
                    <div className="bon_entree__content--element">
                        {item.id}
                    </div>
                    <div className="bon_entree__content--element">
                        {item.dateEntree}
                    </div>
                    <div className="bon_entree__content--element">
                        {item.bonReception.id}
                    </div>
                    <div className="bon_entree__content--element">
                        <Bouton
                            variant="outlined"
                            text="Détails"
                            size="small"
                            onClick={() => { navigate("/header/magasin/details_bon_entree", { state: { id: item.id } }) }}
                        />
                    </div>
                    <div className="bon_entree__content--element">

                    </div>
                </div>
            ))}
        </div>
    )
}

export default BonEntree;