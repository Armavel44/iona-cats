import React, {Dispatch} from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

interface NotificationProps {
    open: boolean;
    success: boolean;
    setOpen: Dispatch<boolean>;
    successMessage: string;
    failureMessage: string;
}

export const Index = ({ open, success, setOpen, successMessage, failureMessage }: NotificationProps) => {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            {success ?
                <MuiAlert onClose={handleClose} severity="success">
                    {successMessage}
                </MuiAlert> :
                <MuiAlert onClose={handleClose} severity="error">
                    {failureMessage}
                </MuiAlert>
            }
        </Snackbar>
    )
}
