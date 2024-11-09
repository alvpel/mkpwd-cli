export function showHelp() {
  console.log(`
Usage: mkpwd [options]

Options:
--length <num>      Set the password length (default: 12)
--letters=<bool>    Include letters (both uppercase and lowercase) (default: true)
--numbers=<bool>    Include numbers (default: true)
--special=<bool>    Include special characters (e.g., !@#$%) (default: false)
--passphrase        Generate a passphrase instead of a password
--words <num>       Set the number of words in the passphrase (default: 4) (only with --passphrase)
--separator <str>   Set the separator for words in the passphrase (default: "-") (only with --passphrase)
--help              Display this help message

Examples:
mkpwd
                        Generate a default password (12 characters with letters and numbers)
mkpwd --length=16 --special=true
                        Generate a 16-character password with letters, numbers, and special characters
mkpwd --length=8 --letters=false --numbers=true --special=false
                        Generate an 8-character password with only numbers
mkpwd --length=20 --letters=true --numbers=false --special=false
                        Generate a 20-character password with only letters
mkpwd --passphrase
                        Generate a default passphrase (4 words, separated by dashes)
mkpwd --passphrase --words=6 --separator=_
                        Generate a passphrase with 6 words, separated by underscores
  `);
}
