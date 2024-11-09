import type { PasswordConfig } from "../config/parseArgs.ts";
import { pickRandom } from "../utils/random.ts";
import { CHAR_SET } from "./charSets/charSet.ts";

export function ensureCharacterTypes(config: PasswordConfig): string[] {
    const password: string[] = [];

    if (config.useLetters) password.push(pickRandom(CHAR_SET.letters));
    if (config.useNumbers) password.push(pickRandom(CHAR_SET.numbers));
    if (config.useSpecial) password.push(pickRandom(CHAR_SET.special));

    return password;
}