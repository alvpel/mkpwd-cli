const filePath = Deno.args[0];
if (!filePath) {
    console.error("Please provide a file path");
    Deno.exit(1);
}

const fileData = await Deno.readFile(filePath);
const base64Data = btoa(String.fromCharCode(...new Uint8Array(fileData)));
const dataUrl = `data:text/plain;base64,${base64Data}`;

console.log('Data URL:\n');
console.log(dataUrl);