export function generatePassword(
    length: number,
    useLetters: boolean,
    useNumbers: boolean,
    useSpecial: boolean,
): string {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "01234567890";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let characters = "";
    if (useLetters) characters += letters + letters.toUpperCase;
    if (useNumbers) characters += numbers;
    if (useSpecial) characters += special;

    // ensure each character type is represented at least once
    const password = [];
    if (useLetters) password.push(pickRandom(letters + letters.toLocaleUpperCase()));
    if (useNumbers) password.push(pickRandom(numbers));
    if (useSpecial) password.push(pickRandom(special));

    // fill the rest of the password
    for (let i = password.length; i < length; i++) {
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
        const j = Math.floor(Math.random() * (i *1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}