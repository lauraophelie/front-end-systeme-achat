import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/* eslint-disable react/prop-types */
function DropDown(props) {
    const { data, label, value, onChange, required, className, width, name } = props;

    return (
        <Box className={className} sx={{ width: width }}>
            <FormControl required={required} fullWidth>
                <InputLabel> {label} </InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    sx={{ width: width }}
                    name={name}
                >
                    {data && data.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.nom || item.designation || item.reference || item.id}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default DropDown;