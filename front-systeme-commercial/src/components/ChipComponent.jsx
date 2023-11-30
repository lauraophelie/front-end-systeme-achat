/* eslint-disable react/prop-types */
import { Done } from "@mui/icons-material";
import { Chip } from "@mui/material";

function ChipComponent(props) {
    const { type, variant } = props;

    var color = null;
    var label = null;
    var icon = null;

    if(type == 0) {
        color = "primary";
        label = "En attente";
    } else if(type == 1) {
        color = "success";
        label = "Validé";
        icon = <Done />;
    } else if(type == -1) {
        color = "error";
        label = "Refusé";
    }

    return (
        <Chip variant={variant} color={color} label={label} icon={icon}/>
    )
}

export default ChipComponent;