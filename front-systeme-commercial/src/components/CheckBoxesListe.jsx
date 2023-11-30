/* eslint-disable react/prop-types */
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete, Checkbox, TextField } from "@mui/material";

function CheckBoxesListe(props) {
    const { data, placeholder, limitTags, label, className, onChange } = props;

    const icon = <CheckBoxOutlineBlank fontSize="small" />;
    const checkedIcon = <CheckBox fontSize="small" />;

    const handleChange = (_, selectedItems) => {
        onChange(selectedItems);
    };

    return (
        <Autocomplete
            className={className}
            multiple
            options={data}
            disableCloseOnSelect
            limitTags={limitTags}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) => option.title === value.title}
            onChange={handleChange}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.title}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} />
            )}
        />
    );
}

export default CheckBoxesListe;

