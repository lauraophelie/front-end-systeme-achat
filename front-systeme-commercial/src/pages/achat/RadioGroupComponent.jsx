import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

function RadioGroupComponent() {
    return (
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label"> Livraison partielle </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="true" control={<Radio />} label="Oui" />
          <FormControlLabel value="false" control={<Radio />} label="Non" />
        </RadioGroup>
      </FormControl>
    )
}

export default RadioGroupComponent;