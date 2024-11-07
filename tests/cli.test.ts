import { main } from "../src/cli/main.ts";
import { assertStringIncludes, assertRejects } from "jsr:@std/assert";

async function captureOutput(fn: () => Promise<void> | void): Promise<string> {
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    let output = "";

    console.log = (msg: string) => { output += msg + "\n"; };
    console.error = (msg: string) => { output += msg + "\n"; };

    await Promise.resolve(fn()).finally(() => {
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    });

    return output.trim();
}

Deno.test("CLI displays help when --help is passed", async () => {
    const output = await captureOutput(() => main(["--help"], false));
    assertStringIncludes(output, "Usage: mkpwd");
});

Deno.test("CLI runs and copies password to clipboard with defaults", async () => {
    const output = await captureOutput(() => main([], false));
    assertStringIncludes(output, "Password copied to clipboard");
});

Deno.test("CLI throws error when invalid length is provided", async () => {
    await assertRejects(
        async () => {
            await main(["--length=-5"], false);
        },
        Error, "Invalid length"
    );
});
