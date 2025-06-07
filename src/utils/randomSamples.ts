import { Sample } from "../types";

export function generateRandomSamples(
    width: number,
    height: number,
    count: number
): Sample[] {
    const samples: Sample[] = [];
    const usedPositions = new Set<string>();

    while (samples.length < count) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const key = `${x},${y}`;
        if (!usedPositions.has(key)) {
            usedPositions.add(key);
            samples.push({
                id: Date.now().toString() + "_" + samples.length,
                x,
                y,
            });
        }
    }

    return samples;
}
