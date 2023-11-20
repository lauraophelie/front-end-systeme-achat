import { useLocation } from "react-router-dom";
import Header from "./Header";
import DetailsBesoins from "../pages/DetailsBesoins";
import { Typography } from "@mui/material";

function FicheBesoin() {
    const location = useLocation();
    const id = location.state.id;

    console.log(id);

    return (
        <>
            <Header />
            <div className="fiche-besoin">
                <Typography variant="h4" className="fiche-besoin__title">
                    Fiche de Besoin
                </Typography>
                
                <div className="fiche-besoin__table">
                    <DetailsBesoins idBesoin={id} />
                </div>
            </div>
        </>
    )
}

export default FicheBesoin;