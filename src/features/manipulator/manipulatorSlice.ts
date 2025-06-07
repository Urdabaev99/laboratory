import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ManipulatorState, Sample } from "../../types";

const initialState: ManipulatorState = {
    pos: { x: 0, y: 0 },
    holding: false,
    samples: [],
    animationDelay: 300,
};

const manipulatorSlice = createSlice({
    name: "manipulator",
    initialState,
    reducers: {
        initializeSamples(state, action: PayloadAction<Sample[]>) {
            if (state.samples.length === 0) {
                state.samples = action.payload;
            }
        },
        moveManipulator(
            state,
            action: PayloadAction<{ x: number; y: number }>
        ) {
            state.pos = action.payload;
        },
        pickSample(state, action: PayloadAction<string>) {
            state.holding = true;
            state.samples = state.samples.filter(
                (s) => s.id !== action.payload
            );
        },
        dropSample(state) {
            if (!state.holding) return;
            state.holding = false;
            const newSample: Sample = {
                id: Date.now().toString(),
                x: state.pos.x,
                y: state.pos.y,
            };
            state.samples.push(newSample);
        },
        setAnimationDelay(state, action: PayloadAction<number>) {
            state.animationDelay = action.payload;
        },
    },
});

export const {
    initializeSamples,
    moveManipulator,
    pickSample,
    dropSample,
    setAnimationDelay,
} = manipulatorSlice.actions;
export default manipulatorSlice.reducer;
