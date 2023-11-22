/* eslint-disable react/jsx-key */
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import Bouton from "../components/Bouton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DetailsBesoins(props) {
    const { idBesoin } = props;
    const [besoin, setBesoin] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const request = "http://localhost:8080/api/besoin/findBesoin/" + idBesoin;
        const fetchBesoin = async () => {
            try {
                const response = await axios.post(request);
                console.log(response);

                if(response.data.error) {
                    setError(response.data.error);
                    console.log(error);
                } else if(response.data.data) {
                    setBesoin(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchBesoin();
    }, []);

    const validerBesoin = async (e) => {
        e.preventDefault();

        const data = {
            etat: 1
        }

        try {
            const request = "http://localhost:8080/api/besoin/" + idBesoin;
            const response = await axios.put(request, data);

            if(response.data.error) {
                console.log(error);
                setError(error);
            } else if(response.data.data) {
                navigate("/header/liste_besoins");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{width: 875, height: 325}}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            Besoin : 
                        </TableCell>
                        <TableCell align="center">
                            {idBesoin}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell> Date Besoin </TableCell>
                        <TableCell>
                            {besoin.dateBesoin}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell> Date Limite </TableCell>
                        <TableCell>
                            {besoin.dateLimite}
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell> Etat </TableCell>
                        <TableCell>
                            {besoin.etat === 0 ? "En attente" : (besoin.etat === -1 ? "Refusé" : (besoin.etat === 1 ? "Validé" : "Inconnu"))}
                        </TableCell>
                    </TableRow>
                </TableBody>

                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}>
                            Liste des articles 
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell> Article </TableCell>
                        <TableCell> Quantité </TableCell>
                    </TableRow>
                </TableHead>

                <TableFooter>
                    <TableRow>
                        <TableCell align="center">
                            <Bouton 
                                text="Refuser" 
                                variant="outlined"
                            />
                        </TableCell>
                        <TableCell align="center">
                            <Bouton 
                                text="Valider" 
                                variant="contained"
                                onClick={validerBesoin}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default DetailsBesoins;