/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

function Bouton(props) {
    const { onClick, variant, endIcon, text, id, className, size, color } = props;

    return (
        <Button 
            variant={variant} endIcon={endIcon} 
            onClick={onClick} id={id} 
            className={className} size={size}
            color={color}
        >
            {text}
        </Button>
    )
}

export default Bouton;