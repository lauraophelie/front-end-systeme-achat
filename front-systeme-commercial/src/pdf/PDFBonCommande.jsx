/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Document, Page, Text, View } from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles";

function PDFBonCommande(props) {
    const { idBonCommande } = props;

    const [bonCommande, setBonCommande] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const request = "http://localhost:8080/api/bon-commande/all/" + idBonCommande;
        const fetchDetails = async() => {
            try {
                const response = await axios.get(request);

                if(response.data.error) {
                    setError(response.data.error);
                    console.log(error);
                } else if(response.data.data) {
                    const bon = response.data.data;
                    setBonCommande(bon);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetails();
    }, []);

    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text style={styles.title}> Bon de commande </Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.element}> 
                        Bon de commande : { idBonCommande }
                    </Text>
                    <Text style={styles.element}> 
                        Fournisseur : { bonCommande && bonCommande.fournisseur.nom }
                    </Text>
                    <Text style={styles.element}> 
                        Responsable : { bonCommande && bonCommande.fournisseur.responsable }
                    </Text>
                    <Text style={styles.element}> 
                        Date : { bonCommande && bonCommande.dateCreation }
                    </Text>
                    <Text style={styles.element}> 
                        Délai de livraison : { bonCommande && bonCommande.delaiLivraison }
                    </Text>
                    <Text style={styles.element}> 
                        Livraison partielle : { bonCommande && bonCommande.livraisonPartielle == true ? "Oui" : "Non"}
                    </Text>
                    <Text style={styles.element}> 
                        Paiement : { bonCommande && bonCommande.modePaiement.designation }
                    </Text>
                </View>

                <View style={styles.headerCol}>
                    <Text style={styles.header}> Catégorie </Text>
                    <Text style={styles.header}> Article </Text>
                    <Text style={styles.header}> Quantité </Text>
                    <Text style={styles.header}> PU HT </Text>
                    <Text style={styles.header}> % TVA </Text>
                    <Text style={styles.header}> PU TTC </Text>
                </View>

                {bonCommande && bonCommande.articlesBonCommande && bonCommande.articlesBonCommande.map((item) => (
                    <View style={styles.content}>
                        <Text style={styles.headerContent}> 
                            { item.article.categorie.nomCategorie }
                        </Text>
                        <Text style={styles.headerContent}>
                            { item.article.nomArticle }
                        </Text>
                        <Text style={styles.headerContent}>
                            { item.quantite }
                        </Text>
                        <Text style={styles.headerContent}>
                            { item.puHT }
                        </Text>
                        <Text style={styles.headerContent}>
                            { item.tva }
                        </Text>
                        <Text style={styles.headerContent}>
                            { item.puTTC }
                        </Text>
                    </View>
                ))}

                <View style={styles.footer}>
                    <Text style={styles.arret}>
                        Arrêté le présent bon de commande à la somme de [ lettres ttc ]
                    </Text>
                </View>

                <View style={styles.signature}>
                    <Text style={styles.signature_element}>
                        La société
                    </Text>
                    <Text style={styles.signature_element}>
                        Le fournisseur
                    </Text>
                </View>
            </Page>
        </Document>
    );
}

export default PDFBonCommande;