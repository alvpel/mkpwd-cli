import type { ParsedArgs } from "./config.ts";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SPECIAL = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export function generatePassword(args: ParsedArgs): string {
    if (args.length <= 0) return "";

    let characters = "";
    if (args.useLetters) characters += LETTERS + LETTERS.toUpperCase();
    if (args.useNumbers) characters += NUMBERS;
    if (args.useSpecial) characters += SPECIAL;

    // ensure each character type is represented at least once
    const password = [];
    if (args.useLetters) password.push(pickRandom(LETTERS + LETTERS.toLocaleUpperCase()));
    if (args.useNumbers) password.push(pickRandom(NUMBERS));
    if (args.useSpecial) password.push(pickRandom(SPECIAL));

    // fill the rest of the password
    for (let i = password.length; i < args.length; i++) {
        password.push(pickRandom(characters));
    }

    return shuffleArray(password).join("");
}

function pickRandom(characters: string): string {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

function shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}