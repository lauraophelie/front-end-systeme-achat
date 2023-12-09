import { useEffect, useState } from "react";
import "../../assets/scss/moinsdisant.scss";
import axios from "axios";

function MoinsDisant() {
    const [moinsDisant, setMoinsDisant] = useState(null);

    useEffect(() => {
        const urlRequest = "http://localhost:8080/api/proforma-min/all";
        const fetchData = async () => {
            try {
                const response = await axios.get(urlRequest);
                console.log(response.data);
                setMoinsDisant(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    console.log(moinsDisant);

    return (
        <div className="moins-disant">
            <h2 className="moins-disant__title">
                Moins disant
            </h2>

            <div className="moins-disant__content">
                <div className="moins-disant__content--header">
                    <div className="moins-disant__content--header__element">
                        Article
                    </div>
                    <div className="moins-disant__content--header__element">
                        Prix total
                    </div>
                    <div className="moins-disant__content--header__element">
                        Fournisseur
                    </div>
                </div>

                {moinsDisant && moinsDisant.map((item) => (
                    <div key={item.id} className="moins-disant__content--card">
                        <div className="moins-disant__content--card__element">
                            {item.nomArticle}
                        </div>
                        <div className="moins-disant__content--card__element">
                            {item.prixTotal}
                        </div>
                        <div className="moins-disant__content--card__element">
                            {item.nomFournisseur}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MoinsDisant;
