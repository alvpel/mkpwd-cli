import { parseArgs } from "jsr:@std/cli/parse-args";
import { parseBoolean } from "../utils/parseBoolean.ts";
import { PP_DEFAULTS, PW_DEFAULTS } from "./defaults.ts";
import { validateCharacterTypes, validateLength } from "./validations.ts";
import type { Config, PassphraseConfig, PasswordConfig } from "./types.ts";

export function parseConfig(args: string[]): Config {
    const isPassphrase = args.includes("--passphrase");

    if (isPassphrase) {
        return parsePassphraseConfig(args);
    } else {
        return parsePasswordConfig(args);
    }
}

export function parsePasswordConfig(args: string[]): PasswordConfig {
    const parsedArgs = parseArgs(args);

    // Set default values
    const length = parsedArgs.length ? Number(parsedArgs.length) : PW_DEFAULTS.length;
    const useLetters = parseBoolean(parsedArgs.letters, PW_DEFAULTS.useLetters);
    const useNumbers = parseBoolean(parsedArgs.numbers, PW_DEFAULTS.useNumbers);
    const useSpecial = parseBoolean(parsedArgs.special, PW_DEFAULTS.useSpecial);

    validateLength(length);
    validateCharacterTypes(useLetters, useNumbers, useSpecial);

    return { length, useLetters, useNumbers, useSpecial };
}

export function parsePassphraseConfig(args: string[]): PassphraseConfig {
    const parsedArgs = parseArgs(args);

    const wordCount = parsedArgs.length ? Number(parsedArgs.length) : PP_DEFAULTS.wordCount;
    const separator = parsedArgs.separator || PP_DEFAULTS.separator;

    validateLength(wordCount);

    return { wordCount, separator };
}

export function isPassphraseConfig(config: PassphraseConfig | PasswordConfig): config is PassphraseConfig {
    return (config as PassphraseConfig).wordCount !== undefined;
}