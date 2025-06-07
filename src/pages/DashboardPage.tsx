import { useEffect, useRef } from "react";
import {
    AppBar,
    Button,
    Container,
    Divider,
    Toolbar,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { generateRandomSamples } from "../utils/randomSamples";
import { initializeSamples } from "../features/manipulator/manipulatorSlice";

import CommandForm from "../components/CommandForm";
import ManipulatorGrid from "../components/ManipulatorGrid";
import HistoryTable from "../components/HistoryTable";
import SnackbarNotification from "../components/SnackbarNotification";
import { logout } from "../features/auth/authSlice";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;
const INITIAL_SAMPLES_COUNT = 5;

export function DashboardPage() {
    const dispatch = useAppDispatch();
    const samples = useAppSelector((state) => state.manipulator.samples);
    const initializedRef = useRef(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (!initializedRef.current && samples.length === 0) {
            const random = generateRandomSamples(
                GRID_WIDTH,
                GRID_HEIGHT,
                INITIAL_SAMPLES_COUNT
            );
            dispatch(initializeSamples(random));
            initializedRef.current = true;
        }
    }, [dispatch, samples.length]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <AppBar position="static" color="primary" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography
                        sx={{
                            fontSize: {
                                xs: "1rem",
                                md: "2rem",
                            },
                        }}
                        variant="h5"
                        component="div"
                    >
                        Подземная лаборатория
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            variant="outlined"
                        >
                            Выход
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Grid container spacing={2} justifyContent="center">
                <Grid size={{ xs: 12, md: 4 }}>
                    <CommandForm
                        gridWidth={GRID_WIDTH}
                        gridHeight={GRID_HEIGHT}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <ManipulatorGrid
                        gridWidth={GRID_WIDTH}
                        gridHeight={GRID_HEIGHT}
                    />
                </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />

            <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                    История выполненных команд
                </Typography>
                <HistoryTable />
            </Grid>

            <SnackbarNotification />
        </Container>
    );
}
