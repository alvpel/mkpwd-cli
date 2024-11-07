import { parseArgs } from "jsr:@std/cli/parse-args";
import { parseBoolean } from "../utils/parseBoolean.ts";
import { DEFAULTS } from "./defaults.ts";
import { validateCharacterTypes, validateLength } from "./validations.ts";

export interface PasswordConfig {
    length: number;
    useLetters: boolean;
    useNumbers: boolean;
    useSpecial: boolean;
}

export function parseConfig(args: string[]): PasswordConfig {
    const parsedArgs = parseArgs(args);

    // Set default values
    const length = parsedArgs.length ? Number(parsedArgs.length) : DEFAULTS.length;
    const useLetters = parseBoolean(parsedArgs.letters, DEFAULTS.useLetters);
    const useNumbers = parseBoolean(parsedArgs.numbers, DEFAULTS.useNumbers);
    const useSpecial = parseBoolean(parsedArgs.special, DEFAULTS.useSpecial);

    validateLength(length);
    validateCharacterTypes(useLetters, useNumbers, useSpecial);

    return { length, useLetters, useNumbers, useSpecial };
}