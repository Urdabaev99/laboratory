export interface Sample {
    id: string;
    x: number;
    y: number;
}

export interface CommandHistoryEntry {
    id: string;
    rawCommand: string;
    optimizedCommand: string;
    timestamp: string;
    samplesBefore: Sample[];
    samplesAfter: Sample[];
}

export interface AuthState {
    isLoggedIn: boolean;
}

export interface ManipulatorState {
    pos: { x: number; y: number };
    holding: boolean;
    samples: Sample[];
    animationDelay: number;
}

export interface HistoryState {
    entries: CommandHistoryEntry[];
}
