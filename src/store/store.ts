import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";
import manipulatorReducer from "../features/manipulator/manipulatorSlice";
import historyReducer from "../features/history/historySlice";

const rootReducer = combineReducers({
    auth: authReducer,
    manipulator: manipulatorReducer,
    history: historyReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "manipulator", "history"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
