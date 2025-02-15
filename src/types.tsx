type Levels = (number | null)[][];

interface GameLevels {
    [key: string]: {
        grid: Levels;
        pass: number;
        time: number;
    };
}
