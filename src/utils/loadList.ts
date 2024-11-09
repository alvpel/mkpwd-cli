export async function loadListFromFile(filePath: string): Promise<string[]> {
    const text = await Deno.readTextFile(filePath);
    return text.split("\n").map(word => word.trim()).filter(Boolean);
}