import { FC, useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarNotification: FC = () => {
    const [open, setOpen] = useState(false);
    console.log("SnackbarNotification");
    useEffect(() => {
        const handler = () => {
            setOpen(true);
        };
        window.addEventListener("SHOW_SUCCESS_SNACKBAR", handler);
        return () => {
            window.removeEventListener("SHOW_SUCCESS_SNACKBAR", handler);
        };
    }, []);

    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                severity="success"
                onClose={handleClose}
                sx={{ width: "100%" }}
            >
                Операция выполнена успешно.
            </Alert>
        </Snackbar>
    );
};

export default SnackbarNotification;
