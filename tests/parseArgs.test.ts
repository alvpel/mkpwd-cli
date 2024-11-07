import { parseBoolean } from "../src/utils/parseBoolean.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("parseBoolean correctly returns default value when input is undefined", () => {
    assertEquals(parseBoolean(undefined, true), true);
    assertEquals(parseBoolean(undefined, false), false);
});

Deno.test("parseBoolean correctly parses boolean strings", () => {
    assertEquals(parseBoolean("true", false), true);
    assertEquals(parseBoolean("false", true), false);
});

Deno.test("parseBoolean handles boolean values directly", () => {
    assertEquals(parseBoolean(true, false), true);
    assertEquals(parseBoolean(false, true), false);
});
