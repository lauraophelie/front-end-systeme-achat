import { Autocomplete, TextField } from "@mui/material";

function ComboBox(props) {
    const { data, label, className } = props;

    return (
        <Autocomplete
            className={className} disablePortal options={data} sx={{ width: 300 }} renderInput={(params) => <TextField {...params} label={label} />}
        />
    )
}

export default ComboBox;