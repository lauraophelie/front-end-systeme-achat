/* eslint-disable no-useless-catch */
import axios from "axios";

const getArticle = async (idArticle) => {
    const urlRequest = "http://localhost:8080/api/articles/" + idArticle;
    try {
        const response = await axios.get(urlRequest);

        if (response.data.error) {
            console.error(response.data.error);
        } else if (response.data.data) {
            const data = response.data.data;

            const article = {
                id: data.id,
                nomArticle: data.nomArticle,
                categorie: data.categorie.nomCategorie
            };
            return article;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getFournisseurs = async () => {
    const urlRequest = "http://localhost:8080/api/fournisseur";
    try {
        const response = await axios.get(urlRequest);

        if (response.data.error) {
            console.error(response.data.error);
            throw new Error(response.data.error);
        } else if (response.data.data) {
            const data = response.data.data;
            const fournisseurs = Object.values(data);
            console.log(fournisseurs);
            return fournisseurs;
        }
    } catch (error) {
        throw error;
    }
};

const getFournisseurById = async(idFournisseur) => {
    const urlRequest = "http://localhost:8080/api/fournisseur/" + idFournisseur;
    try {
        const response = await axios.get(urlRequest);

        if (response.data.error) {
            console.error(response.data.error);
        } else if (response.data.data) {
            const data = response.data.data;
            
            const fournisseur = {
                id: data.id,
                nom: data.nom,
                email: data.email,
                adresse: data.adresse,
                responsable: data.responsable
            };
            return fournisseur;
        }
    } catch (error) {
        throw error;
    }
};

export default { getArticle, getFournisseurs, getFournisseurById };
