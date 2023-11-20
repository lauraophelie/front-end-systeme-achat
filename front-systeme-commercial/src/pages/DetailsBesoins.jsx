import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import Bouton from "../components/Bouton";

function DetailsBesoins(props) {
    const { idBesoin } = props;
    const besoin = { id: "BES1", dateBesoin: "2023-11-11", dateLimite: "2023-11-15", etat: 0};
    return (
        <TableContainer component={Paper}>
            <Table sx={{width: 850, height: 325}}>
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
                            {besoin.etat}
                        </TableCell>
                    </TableRow>
                </TableBody>

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
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default DetailsBesoins;