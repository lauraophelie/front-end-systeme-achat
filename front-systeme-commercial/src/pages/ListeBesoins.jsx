import { Typography } from "@mui/material";
import Liste from "../components/Liste";
import { useEffect, useState } from 'react';

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
    const [besoins, setBesoins] = useState([]);
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        const liste = [
            { id: "BES1", dateBesoins: "2023-11-10", dateLimite: "2023-11-25", etat: 0},
            { id: "BES2", dateBesoins: "2023-11-10", dateLimite: "2023-11-25", etat: 0},
            { id: "BES3", dateBesoins: "2023-11-10", dateLimite: "2023-11-25", etat: 0},
            { id: "BES5", dateBesoins: "2023-11-10", dateLimite: "2023-11-25", etat: 0},
            { id: "BES6", dateBesoins: "2023-11-10", dateLimite: "2023-11-25", etat: 0},
            { id: "BES7", dateBesoins: "2023-11-10", dateLimite: "2023-11-25", etat: 0},
            { id: "BES8", dateBesoins: "2023-11-10", dateLimite: "2023-11-25", etat: 0}
        ];

        const data = createData(Object.keys(liste[0]));
        const header = [];

        for (var key in data) {
            header.push(data[key]);
        }
        setBesoins(liste);
        setKeys(header);
    }, []);

    return (
        <div className="liste-besoins">
            <Typography variant="h4" className="liste-besoins__title">
                Liste des besoins
            </Typography>

            <div className="liste-besoins__table">
                <Liste
                    keys={keys}
                    rows={besoins.map(row => ({
                        ...row,
                        etat: row.etat === 0 ? "En attente" : (row.etat === -1 ? "Refusé" : (row.etat === 1 ? "Validé" : "Inconnu"))
                    }))}
                />
            </div>
        </div>
    );
}

export default ListeBesoins;

