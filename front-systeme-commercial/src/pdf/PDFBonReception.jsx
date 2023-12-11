/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles";
import { Document, Page, Text, View } from "@react-pdf/renderer";

function PDFBonReception(props) {
    const { idBonReception } = props;

    const [bonReception, setBonReception] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        const request = "http://localhost:8080/api/bon_reception/" + idBonReception;
        const fetchDetails = async() => {
            try {
                const response = await axios.get(request);

                if(response.data.error) {
                    setError(response.data.error);
                    console.log(error);
                } else if(response.data.data) {
                    const bon = response.data.data;
                    setBonReception(bon);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchDetails();
    }, []);

    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text style={styles.title}> Bon de réception </Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.element}> 
                        Bon de réception : { idBonReception }
                    </Text>
                    <Text style={styles.element}> 
                        Date de réception : { bonReception && bonReception.dateReception }
                    </Text>
                    <Text style={styles.element}> 
                        Bon de commande : { bonReception && bonReception.bonCommande.id }
                    </Text>
                    <Text style={styles.element}> 
                        Fournisseur : { bonReception && bonReception.fournisseur.nom }
                    </Text>
                    <Text style={styles.element}> 
                        Responsable : { bonReception && bonReception.fournisseur.responsable }
                    </Text>
                </View>

                <View style={styles.headerCol}>
                    <Text style={styles.header}> Catégorie </Text>
                    <Text style={styles.header}> Article </Text>
                    <Text style={styles.header}> Quantité </Text>
                    <Text style={styles.header}> Prix unitaire </Text>
                    <Text style={styles.header}> Montant </Text>
                </View>

                {bonReception && bonReception.articlesBonReception && bonReception.articlesBonReception.map((item, index) => (
                    <View style={styles.content} key={index}>
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
                            { item.prixAchat }
                        </Text>
                        <Text style={styles.headerContent}>
                            { item.prixAchat * item.quantite }
                        </Text>
                    </View>
                ))}
            </Page>
        </Document>
    );
}

export default PDFBonReception;