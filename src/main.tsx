import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import App from "./App";

import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CssBaseline />
                <App />
            </PersistGate>
        </Provider>
    </StrictMode>
);
