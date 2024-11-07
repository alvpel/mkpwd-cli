import { validateLength, validateCharacterTypes } from "../src/config/validations.ts";
import { assertThrows } from "jsr:@std/assert";

Deno.test("validateLength throws error for non-positive lengths", () => {
    assertThrows(() => validateLength(-5), Error, "Invalid length");
    assertThrows(() => validateLength(0), Error, "Invalid length");
});

Deno.test("validateCharacterTypes throws error when all types are disabled", () => {
    assertThrows(() => validateCharacterTypes(false, false, false), Error, "Select at least one character type");
});

Deno.test("validateCharacterTypes does not throw error when at least one type is enabled", () => {
    validateCharacterTypes(true, false, false);
    validateCharacterTypes(false, true, false);
    validateCharacterTypes(false, false, true);
});
