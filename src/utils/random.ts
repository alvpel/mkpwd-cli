export function pickRandom<T>(items: T[] | string): T | string {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

export function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}