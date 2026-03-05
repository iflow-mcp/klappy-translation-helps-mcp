#!/usr/bin/env node
/**
 * MCP Server Entry Point - Wrapper for TypeScript execution
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the tsx executable
const tsxPath = resolve(
  join(__dirname, "node_modules", "tsx", "dist", "cli.mjs"),
);

// Get the TypeScript entry point
const entryPoint = join(__dirname, "src", "index.ts");

// Spawn tsx process
const child = spawn("node", [tsxPath, entryPoint], {
  stdio: "inherit",
  env: process.env,
});

// Handle process exit
child.on("error", (err) => {
  console.error("Failed to start MCP server:", err);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(code || 0);
});
