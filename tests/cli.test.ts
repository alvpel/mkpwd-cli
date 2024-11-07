import { main } from "../src/cli/main.ts";
import { assertEquals } from "jsr:@std/assert";

function captureOutput(fn: () => Promise<void> | void): Promise<string> {
    const originalConsoleLog = console.log;
    let output = "";
    console.log = (msg: string) => { output += msg + "\n"; };
    const result = Promise.resolve(fn()).finally(() => {
        console.log = originalConsoleLog;
    });
    return result.then(() => output);
}

Deno.test("CLI displays help when --help is passed", async () => {
    const output = await captureOutput(() => main(["--help"]));
    assertEquals(output.includes("Usage: mkpwd"), true);
});

Deno.test("CLI runs and copies password to clipboard with defaults", async () => {
    const output = await captureOutput(() => main([]));
    assertEquals(output.includes("Password copied to clipboard"), true);
});

Deno.test("CLI throws error and displays help when invalid length is provided", async () => {
    const output = await captureOutput(() => main(["--length", "-5"]));
    assertEquals(output.includes("Invalid length specified"), true);
});
