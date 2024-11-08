import type { PasswordConfig } from "../config/parseArgs.ts";
import { pickRandom } from "../utils/random.ts";
import { LETTERS, NUMBERS, SPECIAL } from "./charSet.ts";

export function ensureCharacterTypes(config: PasswordConfig): string[] {
    const password: string[] = [];

    if (config.useLetters) password.push(pickRandom(LETTERS + LETTERS.toLocaleUpperCase()));
    if (config.useNumbers) password.push(pickRandom(NUMBERS));
    if (config.useSpecial) password.push(pickRandom(SPECIAL));

    return password;
}