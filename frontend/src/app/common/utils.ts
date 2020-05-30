export function intersectArrays<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
    return arr1.filter((value) => arr2.includes(value));
}

export const percentToWeeklyAvailableHours = (percent?: number): string => {
    if (!percent) {
        return '0 hours/week';
    }
    return `${(50 * percent) / 100} hours/week`;
};
