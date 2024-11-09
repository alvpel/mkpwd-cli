import { copyToClipboard } from "../utils/clipboard.ts";
import { isPassphraseConfig, parseConfig } from "../config/parseArgs.ts";
import { generatePassword } from "../password/generator.ts";
import { showHelp } from "./help.ts";
import { generatePassphrase } from "../passphrase/generator.ts";
import type { PassphraseConfig, PasswordConfig } from "../config/types.ts";

export async function main(args: string[] = Deno.args, shouldExit = true) {
    if (args.includes("--help")) {
        showHelp();
        return;
    }

    try { 
        const config = parseConfig(args);
        let pass = "";

        if (isPassphraseConfig(config)) {
            pass = await generatePassphrase(config as PassphraseConfig);
        } else {
            pass = await generatePassword(config as PasswordConfig);
        }

        await copyToClipboard(pass);

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

if (import.meta.main) {
    main();
}
