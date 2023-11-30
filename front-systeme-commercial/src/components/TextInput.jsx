/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";

function TextInput(props) {

    const { type, label, id, className, name, required, onChange, value } = props;

    return (
        <TextField 
            id={id} type={type} label={label} 
            className={className} name={name} 
            required={required} onChange={onChange} 
            value={value}
        />
    )
}

export default TextInput;