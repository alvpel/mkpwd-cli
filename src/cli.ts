import { copyToClipboard } from "./clipboard.ts";
import { getConfig } from "./config.ts";
import { generatePassword } from "./generator.ts";

async function main() {
    try { 
        const { length, useLetters, useNumbers, useSpecial } = getConfig(Deno.args);
        
        const password = generatePassword(length, useLetters, useNumbers, useSpecial);
        await copyToClipboard(password);

        console.log("Password copied to clipboard");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        } else {
            console.error("An unknown error occurred");
        }
        Deno.exit(1);
    }
}

// Only call main() if the file is run directly, not imported
if (import.meta.main) {
    main();
}
