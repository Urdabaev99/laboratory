import { useAppSelector } from "./hooks/useRedux";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { FC } from "react";

const App: FC = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    return <>{isLoggedIn ? <DashboardPage /> : <LoginPage />}</>;
};

export default App;
