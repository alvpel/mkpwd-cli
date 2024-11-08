import { pickRandom } from "../utils/random.ts";

const WORD_LIST_PATH = './src/passphrase/wordlist.txt';

// loadWordList
async function loadWordList(): Promise<string[]> {
    const text = await Deno.readTextFile(WORD_LIST_PATH);
    return text.split("\n").map(word => word.trim()).filter(Boolean);
}

// generatePassphrase
export async function generatePassphrase(length: number = 4, separator: string = "-"): Promise<string> {
    const words = await loadWordList();
    if (words.length === 0) throw new Error("Word list is empty");

    const passphraseWords = Array.from({ length: length }, () => pickRandom(words));
    return passphraseWords.join(separator);
}