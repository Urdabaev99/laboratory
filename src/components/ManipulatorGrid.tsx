import { memo, useEffect, useState, useRef, useMemo, FC } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../hooks/useRedux";
import PanToolIcon from "@mui/icons-material/PanTool";
import CircleIcon from "@mui/icons-material/Circle";

interface Props {
    gridWidth: number;
    gridHeight: number;
}

const ManipulatorGrid: FC<Props> = ({ gridWidth, gridHeight }) => {
    console.log("ManipulatorGrid");

    const pos = useAppSelector((s) => s.manipulator.pos);
    const samples = useAppSelector((s) => s.manipulator.samples);
    const animationDelay = useAppSelector((s) => s.manipulator.animationDelay);

    const [size, setSize] = useState({ width: 0, height: 0 });
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const upd = () => {
            if (!ref.current) return;
            const r = ref.current.getBoundingClientRect();
            setSize({ width: r.width, height: r.height });
        };
        upd();
        window.addEventListener("resize", upd);
        return () => window.removeEventListener("resize", upd);
    }, []);

    const labelW = 40,
        labelH = 30,
        dataW = Math.max(0, size.width - labelW),
        dataH = Math.max(0, size.height - labelH),
        cellW = dataW / gridWidth,
        cellH = dataH / gridHeight;

    const gridCells = useMemo(() => {
        const cells = [];
        for (let row = 0; row <= gridHeight; row++) {
            for (let col = 0; col <= gridWidth; col++) {
                const isX = row === 0 && col > 0;
                const isY = col === 0 && row > 0;
                const key = `${row}-${col}`;
                let content: string | null = null;
                let bg = "#fff";

                if (row === 0 && col === 0) bg = "#e0e0e0";
                else if (isX) {
                    bg = "#f0f0f0";
                    content = String(col);
                } else if (isY) {
                    bg = "#f0f0f0";
                    content = String(row);
                }

                cells.push(
                    <Box
                        key={key}
                        sx={{
                            gridColumn: col + 1,
                            gridRow: row + 1,
                            border: "1px solid #ccc",
                            backgroundColor: bg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            boxSizing: "border-box",
                        }}
                    >
                        {content}
                    </Box>
                );
            }
        }
        return cells;
    }, [gridWidth, gridHeight]);

    const sampleIcons = useMemo(() => {
        return samples.map((el) => {
            const x = el.x + 1,
                y = el.y + 1;
            return (
                <CircleIcon
                    key={el.id}
                    fontSize="inherit"
                    sx={{
                        position: "absolute",
                        width: cellW * 0.4,
                        height: cellH * 0.4,
                        left: `calc(${labelW}px + ${(x - 1) * cellW}px + ${cellW * 0.25}px)`,
                        top: `calc(${labelH}px + ${(y - 1) * cellH}px + ${cellH * 0.25}px)`,
                        color: "#1976d2",
                    }}
                />
            );
        });
    }, [samples, cellW, cellH]);

    const manipulatorIcon = useMemo(() => {
        return (
            <PanToolIcon
                fontSize="small"
                sx={{
                    position: "absolute",
                    width: cellW * 0.5,
                    height: cellH * 0.5,
                    left: `calc(${labelW}px + ${pos.x * cellW}px + ${cellW * 0.22}px)`,
                    top: `calc(${labelH}px + ${pos.y * cellH}px + ${cellH * 0.2}px)`,
                    color: "#d32f2f",
                    transition: `top ${animationDelay}ms linear, left ${animationDelay}ms linear`,
                }}
            />
        );
    }, [pos, cellW, cellH, animationDelay]);

    return (
        <Box
            ref={ref}
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: { xs: 240, sm: 400 },
                border: "2px solid #e0e0e0",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: `${labelW}px repeat(${gridWidth}, 1fr)`,
                    gridTemplateRows: `${labelH}px repeat(${gridHeight}, 1fr)`,
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                }}
            >
                {gridCells}
            </Box>
            {sampleIcons}
            {manipulatorIcon}
        </Box>
    );
};

export default memo(ManipulatorGrid);
