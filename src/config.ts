import { parseArgs } from "jsr:@std/cli/parse-args";

export function getConfig(args: string[]) {
    const parsedArgs = parseArgs(args);

    // Set default values
    const length = parsedArgs.length ? Number(parsedArgs.length) : 12;
    const useLetters = parsedArgs.letters !== undefined ? parsedArgs.letters !== "false" : true;
    const useNumbers = parsedArgs.numbers !== undefined ? parsedArgs.numbers !== "false" : true;
    const useSpecial = parsedArgs.special !== undefined ? parsedArgs.special !== "false" : false;

    if (isNaN(length) || length <= 0) throw new Error("Invalid length");
    if (!useLetters && !useNumbers && !useSpecial) throw new Error("Select at least one character type");

    return { length, useLetters, useNumbers, useSpecial };
}