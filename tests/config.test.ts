import { getConfig } from "../src/config.ts";
import { assertEquals, assertThrows } from "jsr:@std/assert";

Deno.test("getConfig - applies default values when no arguments are provided", () => {
    const config = getConfig([]);
    assertEquals(config.length, 12);
    assertEquals(config.useLetters, true);
    assertEquals(config.useNumbers, true);
    assertEquals(config.useSpecial, false);
});

Deno.test("getConfig - correctly parses length argument", () => {
    const config = getConfig(["--length", "16"]);
    assertEquals(config.length, 16);
});

Deno.test("getConfig - handles invalid length (non-numeric)", () => {
    assertThrows(
        () => getConfig(["--length", "abc"]),
        Error,
        "Invalid length"
    );
});

Deno.test("getConfig - handles invalid length (negative number)", () => {
    assertThrows(
        () => getConfig(["--length=-5"]),
        Error,
        "Invalid length"
    );
});

Deno.test("getConfig - correctly parses boolean flags", () => {
    let config = getConfig(["--letters=false", "--numbers=false", "--special=true"]);
    assertEquals(config.useLetters, false);
    assertEquals(config.useNumbers, false);
    assertEquals(config.useSpecial, true);

    config = getConfig(["--letters=true", "--numbers=true", "--special=false"]);
    assertEquals(config.useLetters, true);
    assertEquals(config.useNumbers, true);
    assertEquals(config.useSpecial, false);
});

Deno.test("getConfig - default boolean values are applied correctly", () => {
    const config = getConfig(["--length", "20"]);
    assertEquals(config.useLetters, true);
    assertEquals(config.useNumbers, true);
    assertEquals(config.useSpecial, false);
});

Deno.test("getConfig - throws error if no character type is selected", () => {
    assertThrows(
        () => getConfig(["--letters=false", "--numbers=false", "--special=false"]),
        Error,
        "Select at least one character type"
    );
});
