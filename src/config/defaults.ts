import { PasswordConfig } from "./parseArgs.ts";

export const DEFAULTS: PasswordConfig = {
    length: 12,
    useLetters: true,
    useNumbers: true,
    useSpecial: false,
};