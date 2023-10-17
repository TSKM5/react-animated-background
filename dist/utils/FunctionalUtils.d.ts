export declare function selectValueBasedOnProbability<T>(mappings: ProbabilityMapping<T>[]): T;
export type ProbabilityMapping<T> = {
    value: T;
    probability: number;
};
export declare function getRandomInt(min: number, max: number, useFloor?: boolean): number;
