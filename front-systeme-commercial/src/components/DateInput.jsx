import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function DateInput(props) {
    const { label, onChange, className, id, value, name} = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={label} className={className} onChange={onChange} 
                id={id} format="DD-MM-YYYY" value={value} name={name}
            />
        </LocalizationProvider>
    )
}

export default DateInput;