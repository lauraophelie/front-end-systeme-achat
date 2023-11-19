import { Box, InputAdornment, TextField } from "@mui/material";

function ArticleBesoins(props) {
    const { data, className, inputClassName } = props;

    return (
        <div className={className} >
            {data.map((item) => (
                <Box key={item.id} sx={{ width: '75%', maxWidth: '100%' }} className={inputClassName}>
                    <TextField 
                        fullWidth 
                        label={item.title}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"> Quantité </InputAdornment>
                        }}
                    />
                </Box>
            ))}
        </div>
    );
}

export default ArticleBesoins;
