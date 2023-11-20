import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import Bouton from "../components/Bouton";
import { Send } from "@mui/icons-material";

function ListeBesoinsGlobal() {

    const data = [
        {
            debut: "2023-11-12", 
            fin: "2023-11-15",
            articles: [
                { id: "ART001", title: "Stylo", quantite: 50 },
                { id: "ART002", title: "Ordinateur", quantite: 50 },
                { id: "ART003", title: "Crayon", quantite: 50 },
                { id: "ART004", title: "Disque dur", quantite: 50 }
            ]
        },
        {
            debut: "2023-11-12", 
            fin: "2023-11-15",
            articles: [
                { id: "ART001", title: "Stylo", quantite: 50 },
                { id: "ART002", title: "Ordinateur", quantite: 50 },
                { id: "ART003", title: "Crayon", quantite: 50 },
                { id: "ART004", title: "Disque dur", quantite: 50 }
            ]
        }
    ]

    console.log(data);

    return (
        <div className="besoins-global">
            <Typography variant="h4" color={"black"} className="besoins-global__title">
                Besoins global
            </Typography>

            {data.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <div className="besoins-global__data">
                    <TableContainer component={Paper}>
                        <Table sx={{width: 900, height: 250}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        Du : {item.debut}
                                    </TableCell>
                                    <TableCell align="left">
                                        Au : {item.fin}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell align="center"> Article </TableCell>
                                    <TableCell align="center"> Quantité </TableCell>
                                </TableRow>
                            </TableHead>
                            
                            {item.articles.map((article) => (
                                <TableBody key={article.id}>
                                    <TableRow>
                                        <TableCell> {article.title} </TableCell>
                                        <TableCell align="center"> {article.quantite} </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                            
                            <TableFooter>
                                <TableRow>
                                    <TableCell align="right" colSpan={2}>
                                        <Bouton
                                            text="Envoyer email"
                                            endIcon={<Send />}
                                            className="besoins-global__data--button"
                                        /> 
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
            ))}
        </div>
    )
}

export default ListeBesoinsGlobal;