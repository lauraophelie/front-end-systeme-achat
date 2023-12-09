import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFBonCommande from "./PDFBonCommande";

function PDFView() {
    return (
        <>
            <PDFViewer width="1250px" height="650px">
                <PDFBonCommande />
            </PDFViewer>

            <PDFDownloadLink document={<PDFBonCommande />} fileName="somename.pdf">
                {({loading}) => loading ? 'Loading' : 'Download'}
            </PDFDownloadLink>
        </>
    );
}

export default PDFView;