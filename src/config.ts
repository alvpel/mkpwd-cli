import { parseArgs } from "jsr:@std/cli/parse-args";

export interface ParsedArgs {
    length: number;
    useLetters: boolean;
    useNumbers: boolean;
    useSpecial: boolean;
}

export function getConfig(args: string[]): ParsedArgs {
    const parsedArgs = parseArgs(args);

    const defaults: ParsedArgs = {
        length: 12,
        useLetters: true,
        useNumbers: true,
        useSpecial: false,
    };

    // Set default values
    const length = parsedArgs.length ? Number(parsedArgs.length) : defaults.length;
    const useLetters = parseBoolean(parsedArgs.letters, defaults.useLetters);
    const useNumbers = parseBoolean(parsedArgs.numbers, defaults.useNumbers);
    const useSpecial = parseBoolean(parsedArgs.special, defaults.useSpecial);

    if (isNaN(length) || length <= 0) throw new Error("Invalid length");
    if (!useLetters && !useNumbers && !useSpecial) throw new Error("Select at least one character type");

    return { length, useLetters, useNumbers, useSpecial };
}

function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
    if (value === undefined) return defaultValue;
    return value.toLowerCase() !== "false";
}