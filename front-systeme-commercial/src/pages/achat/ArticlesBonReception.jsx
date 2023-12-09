import { useLocation } from "react-router-dom";
import "../../assets/scss/bon_reception.scss";
import TextInput from "../../components/TextInput";

function ArticlesBonReception() {
    const location = useLocation();
    const reception = location.state.reception;

    console.log(reception);

    return (
        <div className="article_bon_reception">
            <h2 className="bon_reception__title">
                Générer bon de réception
            </h2>

            <div className="bon_reception__form">
                <div className="article_bon_reception__element">
                    <div className="article_bon_reception__element--input">
                        <TextInput
                            label="Article"
                            defaultValue="A"
                        />
                    </div>
                    <div className="article_bon_reception__element--input">
                        <TextInput
                            label="Quantité"
                            required={true}
                        />
                    </div>
                    <div className="article_bon_reception__element--input">
                        <TextInput
                            label="Prix unitaire"
                            required={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticlesBonReception;