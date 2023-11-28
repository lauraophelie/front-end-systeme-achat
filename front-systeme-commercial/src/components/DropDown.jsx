import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/* eslint-disable react/prop-types */
function DropDown(props) {
    const { data, label, value, onChange, required, className, width } = props;

    console.log(data);

    return (
        <Box className={className} sx={{ width: width }}>
            <FormControl required={required} fullWidth>
                <InputLabel> {label} </InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    sx={{ width: width }}
                >
                    {data && data.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.nom}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default DropDown;