import { useState, useCallback, FC, memo } from "react";
import {
    Box,
    Button,
    Divider,
    Typography,
    Grid,
    Chip,
    TextField,
    Slider,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setAnimationDelay } from "../features/manipulator/manipulatorSlice";
import { optimizeCommands } from "../features/manipulator/optimizeLogic";
import { executeCommands } from "../utils/executeCommands";
import { store } from "../store/store";
import type { Sample } from "../types";

interface CommandFormProps {
    gridWidth: number;
    gridHeight: number;
}

interface FormInputs {
    rawCommands: string;
}

const CommandForm: FC<CommandFormProps> = ({ gridWidth, gridHeight }) => {
    const dispatch = useAppDispatch();
    const animationDelay = useAppSelector(
        (state) => state.manipulator.animationDelay
    );

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormInputs>({
        defaultValues: { rawCommands: "" },
    });

    const [, setOptimizedCmd] = useState<string>("");

    const onSubmit: SubmitHandler<FormInputs> = useCallback(
        (data) => {
            const raw = data.rawCommands.trim().toUpperCase();
            const samplesBefore: Sample[] =
                store.getState().manipulator.samples;

            const optimized = optimizeCommands(raw);
            setOptimizedCmd(optimized);

            executeCommands(
                raw,
                optimized,
                gridWidth,
                gridHeight,
                animationDelay,
                samplesBefore,
                dispatch
            )
                .then(() => {
                    reset();
                    window.dispatchEvent(new Event("SHOW_SUCCESS_SNACKBAR"));
                })
                .catch(console.error);
        },
        [dispatch, gridWidth, gridHeight, animationDelay, reset]
    );

    const speedMarks = [
        { value: 300, label: "М" },
        { value: 650, label: "Н" },
        { value: 1000, label: "Б" },
    ];

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#fafafa",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Введите последовательность команд
            </Typography>

            <Controller
                name="rawCommands"
                control={control}
                rules={{
                    required: "Пожалуйста, введите последовательность команд",
                    pattern: {
                        value: /^[ЛлПпВвНнОоБб]+$/u,
                        message: "Допустимы только буквы: Л, П, В, Н, О, Б",
                    },
                }}
                render={({ field }) => (
                    <Box sx={{ position: "relative", mb: 4 }}>
                        <TextField
                            {...field}
                            placeholder="напр. ЛЛВПОН"
                            fullWidth
                            size="small"
                            error={!!errors.rawCommands}
                        />
                        {errors.rawCommands && (
                            <Typography
                                variant="caption"
                                color="error"
                                sx={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    mt: 0.5,
                                }}
                            >
                                {errors.rawCommands.message}
                            </Typography>
                        )}
                    </Box>
                )}
            />

            <Grid
                container
                spacing={1}
                sx={{ mb: 2, gap: 1, display: "flex", flexWrap: "wrap" }}
            >
                <Chip label="Л → влево" size="small" color="primary" />
                <Chip label="П → вправо" size="small" color="primary" />
                <Chip label="В → вверх" size="small" color="primary" />
                <Chip label="Н → вниз" size="small" color="primary" />
                <Chip label="О → взять" size="small" color="secondary" />
                <Chip label="Б → отпустить" size="small" color="secondary" />
            </Grid>

            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mb: 3, textTransform: "none" }}
            >
                Оптимизировать и отправить →
            </Button>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
                Скорость анимации
            </Typography>
            <Slider
                value={animationDelay}
                min={300}
                max={1000}
                step={50}
                marks={speedMarks}
                onChange={(_, val) => dispatch(setAnimationDelay(val))}
                valueLabelDisplay="auto"
                sx={{ mt: 1 }}
            />
        </Box>
    );
};

export default memo(CommandForm);
