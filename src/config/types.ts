export type Config = PasswordConfig | PassphraseConfig;

export interface PasswordConfig {
    length: number;
    useLetters: boolean;
    useNumbers: boolean;
    useSpecial: boolean;
}

export interface PassphraseConfig {
    wordCount: number;
    separator: string;
}