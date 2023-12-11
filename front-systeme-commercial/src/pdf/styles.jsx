import { StyleSheet } from "@react-pdf/renderer";

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

export default styles;