import { parsePasswordConfig } from "../src/config/parseArgs.ts";
import { assertEquals, assertThrows } from "jsr:@std/assert";

Deno.test("parseConfig applies default values when no arguments are provided", () => {
    const config = parsePasswordConfig([]);
    assertEquals(config.length, 12);
    assertEquals(config.useLetters, true);
    assertEquals(config.useNumbers, true);
    assertEquals(config.useSpecial, false);
});

Deno.test("parseConfig correctly parses length argument", () => {
    const config = parsePasswordConfig(["--length=16"]);
    assertEquals(config.length, 16);
});

Deno.test("parseConfig throws error for invalid length (negative number)", () => {
    assertThrows(() => parsePasswordConfig(["--length=-5"]), Error, "Invalid length");
});

Deno.test("parseConfig correctly parses boolean flags", () => {
    const config = parsePasswordConfig(["--letters=false", "--numbers=false", "--special=true"]);
    assertEquals(config.useLetters, false);
    assertEquals(config.useNumbers, false);
    assertEquals(config.useSpecial, true);
});

Deno.test("parseConfig throws error if no character type is selected", () => {
    assertThrows(() => parsePasswordConfig(["--letters=false", "--numbers=false", "--special=false"]), Error, "Select at least one character type");
});
