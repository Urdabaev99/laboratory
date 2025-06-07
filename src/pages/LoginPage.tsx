import { useForm, SubmitHandler } from "react-hook-form";
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useAppDispatch } from "../hooks/useRedux";
import { login } from "../features/auth/authSlice";

interface LoginFormInputs {
    username: string;
    password: string;
}

export function LoginPage() {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        const { username, password } = data;
        if (username === "admin" && password === "admin") {
            dispatch(login());
        } else {
            setError("password", { message: "Неверные логин или пароль" });
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Вход в систему
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <TextField
                        {...register("username", { required: "Введите логин" })}
                        margin="normal"
                        fullWidth
                        label="Логин"
                        error={!!errors.username}
                        helperText={
                            errors.username ? errors.username.message : ""
                        }
                    />
                    <TextField
                        {...register("password", {
                            required: "Введите пароль",
                        })}
                        margin="normal"
                        fullWidth
                        type="password"
                        label="Пароль"
                        error={!!errors.password}
                        helperText={
                            errors.password ? errors.password.message : ""
                        }
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Войти
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
