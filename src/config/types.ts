export type LocalCourseData = {
    id: number;
    name: string;
    description: string;
    organization: string;
    exercises: Array<{
        id: number;
        passed: boolean;
    }>;
    availablePoints: number;
    awardedPoints: number;
};

export type LocalExerciseData = {
    id: number;
    name: string;
    course: string;
    organization: string;
    checksum: string;
    updateAvailable: boolean;
    status: ExerciseStatus;
    deadline: string | null;
    softDeadline: string | null;
    oldSubmissions: number[];
};

export enum ExerciseStatus {
    OPEN,
    CLOSED,
    MISSING,
}

export type ExtensionSettings = {
    dataPath: string;
};
