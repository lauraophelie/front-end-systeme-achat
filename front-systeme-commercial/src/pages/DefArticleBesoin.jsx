import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "../assets/scss/besoin.scss";
import ArticleBesoins from "../components/ArticleBesoin";
import Bouton from "../components/Bouton";

function DefArticleBesoin() {
    const location = useLocation();
    const data = location.state.formData 

    const articles = data.articles;

    console.log(articles);

    return (
        <div className="def-articles">
            <Typography variant="h4" className="def-articles__title">
                Articles
            </Typography>

            <ArticleBesoins 
                data={articles} 
                className="def-articles__articles"
                inputClassName="def-articles__articles--items"
            />

            <div className="def-articles__submit">
                <Bouton 
                    text="Valider" 
                    variant="contained"
                    className="def-articles__submit--button"
                /> 
            </div>
        </div>
    )
}

export default DefArticleBesoin;