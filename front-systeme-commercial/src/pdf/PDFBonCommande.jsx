/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
    title: { 
        marginLeft: "25px", 
        marginTop: "25px", 
        fontSize: "25px"
    },
    element: {  
        fontSize: "10px",
        paddingTop: "15px" 
    },
    headerCol: { 
        flexDirection: "row", 
        fontSize: "12px", 
        width: "90%", 
        marginLeft: "5%", 
        marginTop: "25px", 
        height: "35px",
        color: "whitesmoke", 
        backgroundColor: "rgb(29, 29, 93)"
    },
    info: {
        marginLeft: "5%",
        marginTop: "20px",
    },
    header: { 
        textAlign: "center", 
        fontSize: "10px", 
        width: "15%",
        paddingTop: "10px"
    },
    content: {
        flexDirection: "row",
        width: "90%",
        border: "1px solid rgb(237, 237, 237)",
        height: "35px",
        marginLeft: "5%",
    },
    headerContent: { 
        textAlign: "center", 
        fontSize: "10px", 
        width: "15%",
        paddingTop: "9px",
        color: "rgb(116, 116, 116)"
    },
    footer: {
        marginLeft: "5%",
        marginTop: "25px",
        height: "35px",
        fontSize: "10px"
    },
    arret: {
        textAlign: "center",
        color: "rgb(116, 116, 116)"
    },
    signature: {
        flexDirection: "row"
    },
    signature_element: {
        width: "50%",
        textAlign: "center",
        fontSize: "10px",
        color: "rgb(116, 116, 116)"
    }
});

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
                        Livraison partielle : 
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