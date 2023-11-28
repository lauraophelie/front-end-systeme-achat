import { Typography } from "@mui/material";
import Liste from "../components/Liste";
import { useEffect, useState } from 'react';
import Bouton from "../components/Bouton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertSection from "../components/AlertSection";

function createData(data) {
    const result = {};

    for(const prop in data) {
        if(data.hasOwnProperty(prop)) {
            result[prop] = data[prop];
        }
    }
    return result;
}

function ListeBesoins() {
    const [service, setService] = useState(null);
    const [besoins, setBesoins] = useState([]);
    const [keys, setKeys] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const s = sessionStorage.getItem('userData');
        const dataService = JSON.parse(s).service;

        setService(dataService);

        const idService = dataService.id;

        const fetchData = async () => {
            try {
                const urlRequest = "http://localhost:8080/api/besoin/" + idService;
                const response = await axios.get(urlRequest);

                if(response.data.error) {
                    setError(response.data.error);
                } else if(response.data.data) {
                    const liste = response.data.data.map(({listeArticles, ...rest}) => rest);

                    const data = createData(Object.keys(liste[0]));
                    const header = [];

                    for (var key in data) {
                        header.push(data[key]);
                    }
                    setBesoins(liste);
                    setKeys(header);
                }
            } catch(error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="liste-besoins">
            <Typography variant="h4" className="liste-besoins__title">
                Liste des besoins
            </Typography>

            <div className="liste-besoins__add-besoin">
                <Bouton
                    text="Définir besoin"
                    variant="outlined"
                    className="liste-besoins__add-besoin--button"
                    onClick={() => navigate("/header/besoin")}
                />
            </div>

            {error && (
                <div className="liste-besoins__error">
                    <AlertSection severity="info" message={error}/>
                </div>
            )}

            {!error && (
                <div className="liste-besoins__table">
                    <Liste
                        detailsRow={true}
                        keys={keys}
                        rows={besoins.map(row => ({
                            ...row,
                            etat: row.etat === 0 ? "En attente" : (row.etat === -1 ? "Refusé" : (row.etat === 1 ? "Validé" : "Inconnu")),
                            etatEmail: row.etatEmail === 0 ? "En attente" : (row.etatEmail === -1 ? "Refusé" : (row.etatEmail === 1 ? "Validé" : "Inconnu"))
                        }))}
                    />
                </div>
            )}
        </div>
    );
}

export default ListeBesoins;

