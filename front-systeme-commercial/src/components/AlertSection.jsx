import { Alert } from "@mui/material";

function AlertSection(props) {
    const { message, severity } = props;

    return (
        <Alert severity={severity} >
            { message }
        </Alert>
    )
}

export default AlertSection;