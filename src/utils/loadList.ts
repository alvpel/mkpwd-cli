import { join, dirname, fromFileUrl } from "jsr:@std/path"

export async function loadListFromFile(filePath: string): Promise<string[]> {
    const basePath = dirname(fromFileUrl(import.meta.url));
    const absolutePath = join(basePath, filePath);

    const text = await Deno.readTextFile(absolutePath);
    return text.split("\n").map(word => word.trim()).filter(Boolean);
}