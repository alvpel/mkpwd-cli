# Make Password (mkpwd) CLI Tool

A command-line tool built with Deno 2 that generates random passwords based on user-defined criteria. This tool allows customization of password length and character types (letters, numbers, special characters) and can copy the generated password directly to your clipboard.

## Features

- **Customizable Password Length**: Specify the desired length of the password.
- **Passphrase Generation**: Generate easy-to-remember passphrases using random words, with options to customize word count and separator.
- **Character Types**: Choose to include letters, numbers, and/or special characters.
- **Clipboard Support**: Copy the generated password directly to your clipboard (requires system clipboard access).
- **Default Settings**: If no arguments are provided, the tool generates a 12-character password with letters and numbers.

## Getting Started

### Prerequisites

- **Deno 2**: Make sure Deno 2.x is installed. You can download it [here](https://deno.land/).

### Installation

Clone this repository and navigate to the project directory:

```bash
git clone https://github.com/alvpel/mkpwd-cli.git
cd mkpwd-cli
```

### Compile the CLI

Use Deno's `compile` command to create an executable:

```bash
deno compile --allow-env --allow-run --output mkpwd src/cli/main.ts
```

Or, with the configured task in `deno.json`:

```bash
deno task compile
```

#### macOS and Linux

After compiling, move the binary to a directory in your system's `PATH`, such as `/usr/local/bin`:

```bash
sudo mv mkpwd /usr/local/bin/
```

You can now use `mkpwd` as a command from anywhere in your terminal.

#### Windows

On Windows, move the executable to a directory in your `PATH`, such as `C:\Program Files` or another directory listed in your system's `PATH` environment variable.

1. Move the compiled `mkpwd.exe` to a directory in your `PATH`:
    ```powershell
    move mkpwd.exe "C:\Program Files\"
    ```

2. Alternatively, add the directory containing `mkpwd.exe` to your `PATH`:
   - Open **System Properties** > **Environment Variables**.
   - Under **System variables**, find and edit the `Path` variable.
   - Add the path to the directory containing `mkpwd.exe` (e.g., `C:\path\to\your\executable\directory`).
   - Click **OK** to save changes.

You should now be able to use `mkpwd` as a command from any terminal window on Windows.

### Usage

Run the password generator with Deno. Ensure you allow required permissions for clipboard and reading environment variables:

```bash
deno run --allow-env --allow-run src/cli/main.ts [options]
```

You can also use a `deno.json` file to set up custom tasks for easier execution:

```json
{
  "tasks": {
    "run": "deno run --allow-env --allow-run src/cli/main.ts",
    "test": "deno test --allow-read",
    "compile": "deno compile --allow-env --allow-run --output mkpwd src/cli/main.ts",
    "encode": "deno run --allow-read helper/encodeFileToDataUrl.ts ./helper/wordlist.txt"
  }
}
```

Then, you can run the tool with:

```bash
deno task run [options]
```

## Options

| Option             | Default | Description                                      |
|--------------------|---------|--------------------------------------------------|
| `--length <num>`   | 12      | Set the password length.                         |
| `--letters=<bool>` | true    | Include letters (both uppercase and lowercase).  |
| `--numbers=<bool>` | true    | Include numbers.                                 |
| `--special=<bool>` | false   | Include special characters (e.g., `!@#$%`).      |
| `--passphrase`     | false       | Generate a passphrase instead of a password.     |
| `--words <num>`    | 4           | Number of words in passphrase (with `--passphrase`). |
| `--separator <str>`| "-"         | Separator for words in passphrase.               |

**Boolean options** accept `true` or `false`. Example: `--letters=false`.

### Examples

1. **Generate a default password (12 characters with letters and numbers):**
   ```bash
   deno task run
   ```

2. **Generate a 16-character password with letters, numbers, and special characters:**
   ```bash
   deno task run --length=16 --special=true
   ```

3. **Generate an 8-character password with only numbers:**
   ```bash
   deno task run --length=8 --letters=false --numbers=true --special=false
   ```

4. **Generate a 20-character password with only letters:**
   ```bash
   deno task run --length=20 --letters=true --numbers=false --special=false
   ```

5. **Generate a passphrase with default settings (4 words, separated by dashes):**
   ```bash
   deno task run --passphrase
   ```

6. **Generate a passphrase with 6 words, separated by underscores:**
   ```bash
   deno task run --passphrase --words=6 --separator=_
   ```

### Clipboard Support

The tool automatically copies the generated password to the clipboard if clipboard permissions are granted. If your platform supports it, you’ll see a message confirming the password has been copied.

## Development

### Folder Structure

```plaintext
mkpwd/
├── src/
│   ├── cli/
│   │   ├── main.ts              # Main CLI entry point, handles user interactions and errors
│   │   ├── help.ts              # Displays CLI usage and help information
│   ├── config/
│   │   ├── parseArgs.ts         # Argument parsing and configuration setup
│   │   ├── defaults.ts          # Default configuration values
│   │   ├── validations.ts       # Validation functions for arguments (e.g., length validation)
│   ├── password/
│   │   ├── generator.ts         # Password generation logic
│   │   ├── charSets.ts          # Character sets for letters, numbers, and special characters
│   ├── passphrase/
│   │   ├── generator.ts         # Passphrase generation logic
│   │   ├── wordlist.txt         # Word list used for passphrase generation
│   │   └── ensureTypes.ts       # Ensures each character type is represented in the password
│   ├── utils/
│   │   ├── clipboard.ts         # Clipboard functionality
│   │   ├── parseBoolean.ts      # Utility function for parsing boolean arguments
│   │   └── random.ts            # Random functions (e.g., random selection, shuffle)
├── helper/
│   ├── encodeFileToDataUrl.ts   # Word set encoder to data URL 
│   ├── wordlist.txt             # Word set used for passphrases 
├── tests/
│   ├── cli.test.ts              # Tests for CLI behavior and help messages
│   ├── config.test.ts           # Tests for configuration parsing and argument handling
│   ├── generator.test.ts        # Tests for password generation logic
│   ├── parseArgs.test.ts        # Tests for argument parsing functionality
│   └── validations.test.ts      # Tests for validation functions
├── README.md                    # Project documentation
└── deno.json                    # Deno configuration file with tasks
```

### Running Tests

To run the tests, you can use the following command:

```bash
deno test --allow-read
```

Or, with the configured task in `deno.json`:

```bash
deno task test
```

This will execute tests in the `tests/` directory, covering both configuration and password generation.

### Configuration Parsing

The configuration options are parsed in `config.ts` using `parseArgs`. This handles the command-line flags and applies default values when options are omitted.

### Password and Passphrase Generation Logic

The password generation logic is in `generator.ts`, ensuring the correct length and character type combinations based on user-specified flags. Passphrase generation logic in `passphrase/generator.ts` handles word selection and customization of the separator and word count.

## Contributing

Feel free to submit issues or create pull requests. Contributions are welcome!

## License

This project is open-source and available under the [MIT License](LICENSE).