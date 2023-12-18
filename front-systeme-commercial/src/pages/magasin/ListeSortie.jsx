import { useEffect, useState } from "react";
import "../../assets/scss/bon_entree.scss";
import axios from "axios";

function ListeSortie() {
    const [sorties, setSorties] = useState();

    useEffect(() => {
        const url = "http://localhost:8080/api/sortie";
        const fetchData = async() => {
            try {
                const request = await axios.get(url);
                
                if(request.data.error) {
                    console.log(request.data.error);
                } else if(request.data.data) {
                    const data = request.data.data;
                    setSorties(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="bon_entree">
            <h2 className="bon_entree__title">
                Liste des sorties
            </h2>

            <div className="bon_entree__header">
                <div className="bon_entree__header--element">
                    Date
                </div>
                <div className="bon_entree__header--element">
                    Article
                </div>
                <div className="bon_entree__header--element">
                    Quantité sortie
                </div>
            </div>

            {sorties && sorties.map((item, index) => (
                <div className="bon_entree__content" key={index}>
                    <div className="bon_entree__content--element">
                        {item.dateSortie}
                    </div>
                    <div className="bon_entree__content--element">
                        {item.idArticle}
                    </div>
                    <div className="bon_entree__content--element">
                        {item.qteSortie}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListeSortie;