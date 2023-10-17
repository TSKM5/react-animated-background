export function selectValueBasedOnProbability<T>(mappings: ProbabilityMapping<T>[]): T {
    mappings.sort((a, b) => a.probability - b.probability);

    let randomNumber = Math.random() * 100;

    let accumulatedProbability = 0;
    for (let mapping of mappings) {
        accumulatedProbability += mapping.probability;
        if (randomNumber <= accumulatedProbability) {
            return mapping.value;
        }
    }
    
    return mappings[mappings.length - 1].value;
}
export type ProbabilityMapping<T> = {
    value: T;
    probability: number;
};

export function getRandomInt(min: number, max: number, useFloor?:boolean): number {
    if(useFloor){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return Math.random() * (max - min + 1) + min;
}