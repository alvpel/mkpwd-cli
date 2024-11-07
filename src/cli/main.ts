import { copyToClipboard } from "../utils/clipboard.ts";
import { parseConfig } from "../config/parseArgs.ts";
import { generatePassword } from "../password/generator.ts";
import { showHelp } from "./help.ts";

export async function main(args: string[] = Deno.args, shouldExit = true) {
    if (args.includes("--help")) {
        showHelp();
        return;
    }
    try { 
        const config = parseConfig(args);
        
        const password = generatePassword(config);
        await copyToClipboard(password);

        console.log("Password copied to clipboard");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
            if (!shouldExit) throw error;
        } else {
            console.error("An unknown error occurred");
            if (!shouldExit) throw new Error("An unknown error occurred");
        }
        if (shouldExit) Deno.exit(1);
    }
}

// Only call main() if the file is run directly, not imported
if (import.meta.main) {
    main();
}
