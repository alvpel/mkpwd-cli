import { copyToClipboard } from "../utils/clipboard.ts";
import { parseConfig } from "../config/parseArgs.ts";
import { generatePassword } from "../password/generator.ts";
import { showHelp } from "./help.ts";

async function main() {
    if (Deno.args.includes("--help")) {
        showHelp();
        return;
    }
    try { 
        const config = parseConfig(Deno.args);
        
        const password = generatePassword(config);
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
