import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PATTERN_GLOBAL_PROPS_INTERFACE } from './lib/regex.mjs';

/**
 * Generate Wrangler Types - Project Root.
 *
 * Absolute path to the repository root, resolved one level up from this script's
 * own directory so every other path below anchors to a stable location.
 *
 * @since 2.0.0
 */
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Generate Wrangler Types - Wrangler Config.
 *
 * Absolute path to wrangler.toml, whose presence decides whether types are
 * regenerated or the committed declaration file is reused.
 *
 * @since 2.0.0
 */
const wranglerConfig = resolve(projectRoot, 'wrangler.toml');

/**
 * Generate Wrangler Types - Package Dir.
 *
 * Absolute path to the worker package directory, used as the working directory
 * for the wrangler types invocation.
 *
 * @since 2.0.0
 */
const packageDir = resolve(projectRoot, 'packages', 'branded-short-links');

/**
 * Generate Wrangler Types - Output File.
 *
 * Absolute path to the generated worker-configuration.d.ts declaration file that
 * this script produces and post-processes.
 *
 * @since 2.0.0
 */
const outputFile = resolve(packageDir, 'worker-configuration.d.ts');

/**
 * Generate Wrangler Types - Strip Global Props.
 *
 * Removes the Cloudflare GlobalProps interface from the generated types, whose
 * mainModule property references the build output path and breaks type checks
 * when the build directory is absent on CI.
 *
 * @returns {void}
 *
 * @since 2.0.0
 */
function stripGlobalProps() {
  const content = readFileSync(outputFile, 'utf-8');
  const stripped = content.replace(new RegExp(PATTERN_GLOBAL_PROPS_INTERFACE, 's'), '');

  if (stripped !== content) {
    writeFileSync(outputFile, stripped);

    process.stdout.write('generate-wrangler-types: Stripped GlobalProps interface (references build output).\n');
  }

  return;
}

/**
 * Generate Wrangler Types - Generate Wrangler Types.
 *
 * Generates Cloudflare Workers runtime type definitions from wrangler.toml. If
 * wrangler.toml does not exist (e.g. CI environments), the step is skipped and
 * the committed worker-configuration.d.ts is used instead.
 *
 * @returns {void}
 *
 * @since 2.0.0
 */
function generateWranglerTypes() {
  if (existsSync(wranglerConfig) === false) {
    process.stdout.write('generate-wrangler-types: wrangler.toml not found. Using committed worker-configuration.d.ts.\n');

    if (existsSync(outputFile) === false) {
      process.stderr.write('generate-wrangler-types: worker-configuration.d.ts is also missing. Run this locally first to generate it.\n');

      throw new Error('worker-configuration.d.ts not found');
    }

    return;
  }

  process.stdout.write('generate-wrangler-types: Regenerating worker-configuration.d.ts from wrangler.toml ...\n');

  execSync('npx wrangler types --config ../../wrangler.toml --strict-vars=false ./worker-configuration.d.ts', {
    cwd: packageDir,
    stdio: 'inherit',
  });

  stripGlobalProps();

  process.stdout.write('generate-wrangler-types: Done.\n');

  return;
}

generateWranglerTypes();
