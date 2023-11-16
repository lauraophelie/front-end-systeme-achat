import { Button } from "@mui/material";

function Bouton(props) {
    const { onClick, variant, endIcon, text, id, className } = props;

    return (
        <Button variant={variant} endIcon={endIcon} onClick={onClick} id={id} className={className}>
            {text}
        </Button>
    )
}

export default Bouton;