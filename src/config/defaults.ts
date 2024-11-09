import type { PassphraseConfig, PasswordConfig } from "./types.ts";

export const PW_DEFAULTS: PasswordConfig = {
    length: 12,
    useLetters: true,
    useNumbers: true,
    useSpecial: false,
};

export const PP_DEFAULTS: PassphraseConfig = {
    wordCount: 4,
    separator: "-",
}