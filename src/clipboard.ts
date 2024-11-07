export async function copyToClipboard(text: string): Promise<void> {
    const encoder = new TextEncoder();
    const processCommand = getClipboardProcess();

    if (!processCommand) {
        console.error("Clipboard functionality is not supported on this platform");
        return;
    }

    try {
        const process = new Deno.Command(processCommand[0], {
            args: processCommand.slice(1),
            stdin: "piped",
        });

        const child = process.spawn();
        const writer = child.stdin.getWriter();
        await writer.write(encoder.encode(text));
        await writer.close();

        const status = await child.status;
        if (!status.success) {
            console.error("Failed to copy");
        }
    } catch (error) {
        console.error("Error copying to clipboard:", error);
    }
}

function getClipboardProcess(): string[] | null {
    const os = Deno.build.os;
    if (os === "darwin") return ["pbcopy"];
    if (os === "linux") return ["xclip", "-selection", "clipboard"];
    if (os === "windows") return ["cmd", "/c", "clip"];
    return null;
}