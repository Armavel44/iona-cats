import React, {Dispatch} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface NotificationProps {
    open: boolean;
    success: boolean;
    setOpen: Dispatch<boolean>;
    successMessage: string;
    failureMessage: string;
}

/**
 * Default notification component for use everywhere in the app
 * @param open - open state of the notification popup
 * @param success - type of notification (error or success)
 * @param setOpen - dispatcher for changing the open state of the popup
 * @param successMessage - text to display for successful notifications
 * @param failureMessage - text to display for failed notifications
 */
export const Notification = ({ open, success, setOpen, successMessage, failureMessage }: NotificationProps) => {
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
    );
};
