import { generatePassword } from "../src/password/generator.ts";
import { assertEquals, assertMatch } from "jsr:@std/assert";

Deno.test("generatePassword generates password of correct length", () => {
    const password = generatePassword({ length: 16, useLetters: true, useNumbers: true, useSpecial: false });
    assertEquals(password.length, 16);
});

Deno.test("generatePassword includes only letters when useLetters is true and others are false", () => {
    const password = generatePassword({ length: 12, useLetters: true, useNumbers: false, useSpecial: false });
    assertMatch(password, /^[a-zA-Z]+$/);
});

Deno.test("generatePassword includes only numbers when useNumbers is true and others are false", () => {
    const password = generatePassword({ length: 12, useLetters: false, useNumbers: true, useSpecial: false });
    assertMatch(password, /^[0-9]+$/);
});

Deno.test("generatePassword includes only special characters when useSpecial is true and others are false", () => {
    const password = generatePassword({ length: 12, useLetters: false, useNumbers: false, useSpecial: true });
    assertMatch(password, /^[!@#$%^&*()_\+\-=\[\]{}|;:,.<>?]+$/);
});

Deno.test("generatePassword includes all character types when all options are true", () => {
    const password = generatePassword({ length: 20, useLetters: true, useNumbers: true, useSpecial: true });
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_\+\-=\[\]{}|;:,.<>?]/.test(password);
    assertEquals(hasLetters, true);
    assertEquals(hasNumbers, true);
    assertEquals(hasSpecial, true);
});
