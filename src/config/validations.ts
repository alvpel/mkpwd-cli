export function validateLength(length: number): void {
    if (!Number.isInteger(length) || length <= 0) {
        throw new Error("Invalid length");
    }
}

export function validateCharacterTypes(
    useLetters: boolean,
    useNumbers: boolean,
    useSpecial: boolean
): void {
    if (!useLetters && !useNumbers && !useSpecial) {
        throw new Error("Select at least one character type");
    }
}
