import { useLocation } from "react-router-dom";

function DefArticleBesoin() {
    const location = useLocation();
    const data = location.state.formData 

    console.log(JSON.stringify(data, null, 2));

    return (
        <>
        </>
    )
}

export default DefArticleBesoin;