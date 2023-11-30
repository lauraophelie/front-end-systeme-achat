/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import "../assets/scss/besoin.scss";
import axios from "axios";

function ListeBesoinsGlobals() {
    const [besoinsGlobal, setBesoinsGlobal] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const urlRequest = "http://localhost:8080/api/besoinglobal/byservice";
        const fetchData = async() => {
            try {
                const response = await axios.get(urlRequest);
                
                if(response.data.error) {
                    console.log(error);
                    setError(error);
                } else if(response.data.data) {
                    setBesoinsGlobal(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="besoins_global">
            <h2 className="besoins_global__title">
                Besoin globals
            </h2>

            <div className="besoins_global__header">
                <div className="besoins_global__header__element">
                    Semaine
                </div>
                <div className="besoins_global__header__element">
                    Service
                </div>
                <div className="besoins_global__header__element">
                    Article
                </div>
                <div className="besoins_global__header__element">
                    Quantité
                </div>
            </div>

            {besoinsGlobal && besoinsGlobal.map((item) => (
                <div className="besoins_global__content">
                    <div className="besoins_global__content--element">
                        {item.semaine}
                    </div>
                    <div className="besoins_global__content--element">
                        {item.nomService}
                    </div>
                    <div className="besoins_global__content--element">
                        {item.nomArticle}
                    </div>
                    <div className="besoins_global__content--element">
                        {item.quantite}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListeBesoinsGlobals;