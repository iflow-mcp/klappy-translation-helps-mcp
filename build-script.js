#!/usr/bin/env node
/**
 * Build script to compile TypeScript to JavaScript for npm distribution
 */

import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

async function build() {
  console.log("🔨 Building TypeScript to JavaScript...");

  try {
    // Create dist directory
    await fs.mkdir("dist", { recursive: true });

    // Use tsc to compile TypeScript
    console.log("📝 Compiling TypeScript...");
    await execAsync(
      "npx tsc --outDir dist --rootDir src --module esnext --target esnext --moduleResolution node --esModuleInterop true --allowSyntheticDefaultImports true --strict false --skipLibCheck true",
      {
        cwd: process.cwd(),
      },
    );

    // Copy package.json files from src subdirectories
    console.log("📋 Copying package files...");

    // Copy tsconfig to preserve structure
    await fs.copyFile("src/index.ts", "dist/index.ts").catch(() => {});

    console.log("✅ Build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

build();
