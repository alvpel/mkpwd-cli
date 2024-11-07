export function parseBoolean(value: string | boolean | undefined, defaultValue: boolean): boolean {
    if (value === undefined) return defaultValue;
    if (typeof value === "boolean") return value;
    return value.toLowerCase() !== "false";
}