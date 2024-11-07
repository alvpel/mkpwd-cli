export function pickRandom(characters: string): string {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

export function shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}