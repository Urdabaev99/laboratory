import { FC, memo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Tooltip,
    Button,
    Box,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { clearHistory } from "../features/history/historySlice";

const formatSamples = (arr: { x: number; y: number }[]) => {
    const parts = arr.slice(0, 3).map((el) => `(${el.x},${el.y})`);
    return arr.length > 3 ? parts.join(", ") + ".." : parts.join(", ");
};

const HistoryTable: FC = () => {
    console.log("HistoryTable");
    const dispatch = useAppDispatch();
    const entries = useAppSelector((state) => state.history.entries);

    return (
        <Box>
            <Box>
                {entries.length > 0 && (
                    <Button
                        size="small"
                        color="secondary"
                        onClick={() => dispatch(clearHistory())}
                        sx={{ mb: 1 }}
                    >
                        Очистить историю
                    </Button>
                )}
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Время</TableCell>
                            <TableCell>Исходная</TableCell>
                            <TableCell>Оптимизированная</TableCell>
                            <TableCell>Образец до</TableCell>
                            <TableCell>Образец после</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell>
                                    {new Date(entry.timestamp).toLocaleString(
                                        "ru-RU"
                                    )}
                                </TableCell>
                                <TableCell>{entry.rawCommand}</TableCell>
                                <TableCell>{entry.optimizedCommand}</TableCell>
                                <TableCell>
                                    <Tooltip
                                        title={JSON.stringify(
                                            entry.samplesBefore
                                        )}
                                        arrow
                                        placement="top"
                                    >
                                        <span>
                                            {formatSamples(entry.samplesBefore)}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip
                                        title={JSON.stringify(
                                            entry.samplesAfter
                                        )}
                                        arrow
                                        placement="top"
                                    >
                                        <span>
                                            {formatSamples(entry.samplesAfter)}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                        {entries.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    История пуста
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default memo(HistoryTable);
