export async function loadListFromFile(pathOrDataUrl: string): Promise<string[]> {
    if (pathOrDataUrl.startsWith("data:text/plain;base64,")) {
        const base64Data = pathOrDataUrl.split(",")[1];
        const decodedText = atob(base64Data);
        return decodedText.split("\n").map(line => line.trim()).filter(Boolean);
    } else {
        const text = await Deno.readTextFile(pathOrDataUrl);
        return text.split("\n").map(word => word.trim()).filter(Boolean);
    }
}