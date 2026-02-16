# Codex Web Local

A lightweight web interface for [Codex](https://github.com/openai/codex) that replicates the desktop UI and runs on top of the Codex `app-server`. It exposes Codex through a web application, allowing you to access your local Codex instance remotely from any browser.

## Prerequisites

- [Codex CLI](https://github.com/openai/codex) installed and available in your `PATH`

## Installation

```bash
# Run directly with npx (no install required)
npx codex-web-local

# Or install globally
npm install -g codex-web-local
```

## Usage

```
Usage: codex-web-local [options]

Web interface for Codex app-server

Options:
  -p, --port <port>    port to listen on (default: "3000")
  --password <pass>    set a specific password
  --no-password        disable password protection
  -h, --help           display help for command
```

## Examples

```bash
# Start with auto-generated password on default port 3000
codex-web-local

# Start on a custom port
codex-web-local --port 8080

# Start with a specific password
codex-web-local --password my-secret

# Start without password protection (use only on trusted networks)
codex-web-local --no-password
```

When started with password protection (default), the server prints the password to the console. Open the URL in your browser, enter the password, and you're in.

## Contributing

Issues and pull requests are welcome! If you have ideas, suggestions, or found a bug, please open an issue on the [GitHub repository](https://github.com/pavel-voronin/codex-web-local/issues).

## License

[MIT](./LICENSE)
