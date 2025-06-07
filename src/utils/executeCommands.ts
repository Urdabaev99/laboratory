import { Dispatch } from "@reduxjs/toolkit";
import { store } from "../store/store";
import {
    moveManipulator,
    pickSample,
    dropSample,
} from "../features/manipulator/manipulatorSlice";
import { addEntry } from "../features/history/historySlice";
import type { Sample, CommandHistoryEntry } from "../types";

export async function executeCommands(
    raw: string,
    optimized: string,
    gridWidth: number,
    gridHeight: number,
    animationDelay: number,
    samplesBefore: Sample[],
    dispatch: Dispatch
) {
    const commands = raw.split("");
    for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                const { pos: currentPos } = store.getState().manipulator;

                switch (cmd) {
                    case "Л": {
                        const newX = Math.max(0, currentPos.x - 1);
                        dispatch(moveManipulator({ x: newX, y: currentPos.y }));
                        break;
                    }
                    case "П": {
                        const newX = Math.min(gridWidth - 1, currentPos.x + 1);
                        dispatch(moveManipulator({ x: newX, y: currentPos.y }));
                        break;
                    }
                    case "В": {
                        const newY = Math.max(0, currentPos.y - 1);
                        dispatch(moveManipulator({ x: currentPos.x, y: newY }));
                        break;
                    }
                    case "Н": {
                        const newY = Math.min(gridHeight - 1, currentPos.y + 1);
                        dispatch(moveManipulator({ x: currentPos.x, y: newY }));
                        break;
                    }
                    case "О": {
                        const sampleAtPos = store
                            .getState()
                            .manipulator.samples.find(
                                (s) =>
                                    s.x === currentPos.x && s.y === currentPos.y
                            );
                        if (sampleAtPos) {
                            dispatch(pickSample(sampleAtPos.id));
                        }
                        break;
                    }
                    case "Б":
                        dispatch(dropSample());
                        break;
                    default:
                        break;
                }

                resolve();
            }, animationDelay);
        });
    }
    const samplesAfterRaw: Sample[] = store.getState().manipulator.samples;

    const fixCoords = (arr: Sample[]): Sample[] =>
        arr.map((s) => ({ ...s, x: s.x + 1, y: s.y + 1 }));

    const entry: CommandHistoryEntry = {
        id: Date.now().toString(),
        rawCommand: raw,
        optimizedCommand: optimized,
        timestamp: new Date().toISOString(),
        samplesBefore: fixCoords(samplesBefore),
        samplesAfter: fixCoords(samplesAfterRaw),
    };
    dispatch(addEntry(entry));
}
