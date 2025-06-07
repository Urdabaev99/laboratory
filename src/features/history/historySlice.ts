import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { HistoryState, CommandHistoryEntry } from "../../types";

const initialState: HistoryState = {
    entries: [],
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addEntry(state, action: PayloadAction<CommandHistoryEntry>) {
            state.entries.unshift(action.payload);
        },
        clearHistory(state) {
            state.entries = [];
        },
    },
});

export const { addEntry, clearHistory } = historySlice.actions;
export default historySlice.reducer;
