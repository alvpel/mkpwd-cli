import { pickRandom, shuffleArray } from "../utils/random.ts";
import type { PasswordConfig } from "../config/types.ts";
import { CHAR_SET } from "./charSets/charSet.ts";
import { ensureCharacterTypes } from "./ensureTypes.ts";

export function generatePassword(config: PasswordConfig): string {
    if (config.length <= 0) return "";

    let characters = "";
    if (config.useLetters) characters += CHAR_SET.letters;
    if (config.useNumbers) characters += CHAR_SET.numbers;
    if (config.useSpecial) characters += CHAR_SET.special;

    const password = ensureCharacterTypes(config)

    // fill the rest of the password
    for (let i = password.length; i < config.length; i++) {
        password.push(pickRandom(characters));
    }

    return shuffleArray(password).join("");
}