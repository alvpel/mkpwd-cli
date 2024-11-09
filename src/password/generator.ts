import { pickRandom, shuffleArray } from "../utils/random.ts";
import type { PasswordConfig } from "../config/types.ts";
import { LETTERS, NUMBERS, SPECIAL } from "./charSet.ts";
import { ensureCharacterTypes } from "./ensureTypes.ts";

export function generatePassword(config: PasswordConfig): string {
    if (config.length <= 0) return "";

    let characters = "";
    if (config.useLetters) characters += LETTERS + LETTERS.toUpperCase();
    if (config.useNumbers) characters += NUMBERS;
    if (config.useSpecial) characters += SPECIAL;

    const password = ensureCharacterTypes(config)

    // fill the rest of the password
    for (let i = password.length; i < config.length; i++) {
        password.push(pickRandom(characters));
    }

    return shuffleArray(password).join("");
}