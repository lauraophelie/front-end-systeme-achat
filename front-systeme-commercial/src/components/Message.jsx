/* eslint-disable react/prop-types */
import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";
import { Fragment, useState } from "react";

function Message(props) {
    const { message, opening } = props;
    const [open, setOpen] = useState(opening);
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const action = (
        <Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        </Fragment>
    );

    return (
        <div>
            <Snackbar
                open={opening}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </div>
    )
}

export default Message;