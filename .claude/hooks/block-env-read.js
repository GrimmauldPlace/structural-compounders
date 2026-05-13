// We collect the JSON payload from stdin in chunks
// because stdin streams data rather than handing it over all at once.
let input = "";
process.stdin.on("data", (chunk) => {
  input += chunk;
});

// Once stdin closes, we have the complete JSON and can act on it.
process.stdin.on("end", () => {
  // Parse the payload Claude Code sent us.
  // It contains the tool name, the tool input and other metadata.
  const payload = JSON.parse(input);

  // Different tools name their file argument differently,
  // so we check the common locations with a fallback.
  // This defensive lookup keeps the hook working
  // even if the tool's input shape evolves.
  const filePath =
    payload.tool_input?.file_path ||
    payload.tool_input?.path ||
    "";

  // The actual decision: does this path point to a .env file?
  if (filePath.includes(".env")) {
    // Write to stderr so the message reaches Claude as feedback.
    // Claude will read this and adjust its plan accordingly.
    console.error(
      "Access to .env files is blocked by the read hook for security reasons."
    );
    // Exit code 2 tells Claude Code to block this tool call.
    process.exit(2);
  }

  // Any other file is fine, so we exit cleanly and let the tool run.
  process.exit(0);
});
