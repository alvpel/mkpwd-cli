import { loadListFromFile } from "../utils/loadList.ts";
import { pickRandom } from "../utils/random.ts";
import type { PassphraseConfig } from "../config/types.ts";
import { WORD_LIST_DATA_URL } from "./wordSet.ts";

export async function generatePassphrase(config: PassphraseConfig): Promise<string> {
    const words = await loadListFromFile(WORD_LIST_DATA_URL);
    if (words.length === 0) throw new Error("Word list is empty");

    const passphraseWords = Array.from({ length: config.wordCount }, () => pickRandom(words));
    return passphraseWords.join(config.separator);
}