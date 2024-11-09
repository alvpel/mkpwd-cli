import { generatePassphrase } from "../src/passphrase/generator.ts";
import { assertEquals } from "jsr:@std/assert";
import { parsePassphraseConfig } from "../src/config/parseArgs.ts";

// Test case to check if generatePassphrase creates a passphrase with the default word count and separator
Deno.test("generatePassphrase creates passphrase with default separator", async () => {
    const passphrase = await generatePassphrase(parsePassphraseConfig([]));
    const words = passphrase.split("-");
    console.log(passphrase);
    assertEquals(words.length, 4); // Check default word count
    words.forEach(word => assertEquals(typeof word, "string")); // Each word should be a string
});

// Test case to check if generatePassphrase creates a passphrase with a custom word count and separator
Deno.test("generatePassphrase creates passphrase with custom word count and separator", async () => {
    const passphrase = await generatePassphrase({ wordCount: 5, separator: "_"});
    const words = passphrase.split("_");
    assertEquals(words.length, 5); // Check custom word count
    words.forEach(word => assertEquals(typeof word, "string")); // Each word should be a string
});
