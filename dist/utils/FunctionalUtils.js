export function selectValueBasedOnProbability(mappings) {
    mappings.sort(function (a, b) { return a.probability - b.probability; });
    var randomNumber = Math.random() * 100;
    var accumulatedProbability = 0;
    for (var _i = 0, mappings_1 = mappings; _i < mappings_1.length; _i++) {
        var mapping = mappings_1[_i];
        accumulatedProbability += mapping.probability;
        if (randomNumber <= accumulatedProbability) {
            return mapping.value;
        }
    }
    return mappings[mappings.length - 1].value;
}
export function getRandomInt(min, max, useFloor) {
    if (useFloor) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return Math.random() * (max - min + 1) + min;
}
