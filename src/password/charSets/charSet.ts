import { loadListFromFile } from "../../utils/loadList.ts";

const CHARACTER_SET_PATHS = {
    letters: './src/password/charSets/letters.txt',
    numbers: './src/password/charSets/numbers.txt',
    special: './src/password/charSets/special.txt'
}

export const CHAR_SET = {
    letters: (await loadListFromFile(CHARACTER_SET_PATHS.letters)).join(""),
    numbers: (await loadListFromFile(CHARACTER_SET_PATHS.numbers)).join(""),
    special: (await loadListFromFile(CHARACTER_SET_PATHS.special)).join("")
}