import { generatePassword } from "../src/generator.ts";
import { assertEquals, assertMatch } from "jsr:@std/assert";

Deno.test("generatePassword - generates password of correct length", () => {
    const password = generatePassword({ length: 16, useLetters: true, useNumbers: true, useSpecial: false });
    assertEquals(password.length, 16);
});

Deno.test("generatePassword - includes only letters when useLetters is true and others are false", () => {
    const password = generatePassword({ length: 12, useLetters: true, useNumbers: false, useSpecial: false});
    assertMatch(password, /^[a-zA-Z]+$/);  // Regex to ensure only letters
});

Deno.test("generatePassword - includes only numbers when useNumbers is true and others are false", () => {
    const password = generatePassword({ length: 12, useLetters: false, useNumbers: true, useSpecial: false});
    assertMatch(password, /^[0-9]+$/);  // Regex to ensure only numbers
});

Deno.test("generatePassword - includes only special characters when useSpecial is true and others are false", () => {
    const password = generatePassword({ length: 12, useLetters: false, useNumbers: false, useSpecial: true} );
    assertMatch(password, /^[!@#$%^&*()_\+\-=\[\]{}|;:,.<>?]+$/);  // Regex to ensure only special characters
});

Deno.test("generatePassword - includes letters, numbers, and special characters when all options are true", () => {
    const password = generatePassword({ length: 20, useLetters: true, useNumbers: true, useSpecial: true });

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_\+\-=\[\]{}|;:,.<>?]/.test(password);

    assertEquals(hasLetters, true);
    assertEquals(hasNumbers, true);
    assertEquals(hasSpecial, true);
});

Deno.test("generatePassword - handles zero length without error", () => {
    const password = generatePassword({ length: 0, useLetters: true, useNumbers: true, useSpecial: true });
    assertEquals(password, "");  // Should return an empty string for zero length
});

Deno.test("generatePassword - does not produce spaces or unexpected characters", () => {
    const password = generatePassword({ length: 50, useLetters: true, useNumbers: true, useSpecial: true });
    assertMatch(password, /^[a-zA-Z0-9!@#$%^&*()_\+\-=\[\]{}|;:,.<>?]+$/);  // No spaces or unexpected characters
});
