/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../assets/scss/besoin.scss";
import BesoinCard from "../components/BesoinCard";
import axios from "axios";

function ListeBesoins() {
    const [besoins, setBesoins] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const s = sessionStorage.getItem('userData');
        const dataService = JSON.parse(s).service;

        const idService = dataService.id;

        const fetchData = async () => {
            try {
                const urlRequest = "http://localhost:8080/api/besoin/" + idService;
                const response = await axios.get(urlRequest);

                if(response.data.error) {
                    setError(response.data.error);
                } else if(response.data.data) {
                    const liste = response.data.data.map(({listeArticles, ...rest}) => rest);
                    setBesoins(liste);
                }
            } catch(error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    console.log(besoins);

    return (
        <div className="liste-besoins">
            <h2 className="liste-besoins__title">
                Liste des besoins
            </h2>

            <div className="liste-besoins__header">
                <div className="liste-besoins__header--title">
                    ID
                </div>
                <div className="liste-besoins__header--title">
                    Date
                </div>
                <div className="liste-besoins__header--title">
                    Date limite
                </div>
                <div className="liste-besoins__header--title">
                    Etat
                </div>
                <div className="liste-besoins__header--title">
                    
                </div>
            </div>

            <div className="liste-besoins__content">
                {besoins.map((item) => (
                    <BesoinCard item={item} />
                ))}
            </div>
        </div>
    )
}

export default ListeBesoins;