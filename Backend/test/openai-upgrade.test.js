const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const backendDir = path.resolve(__dirname, "..");
const repoRoot = path.resolve(backendDir, "..");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

const parseVersion = (value) => {
  const match = String(value).match(/(\d+)\.(\d+)\.(\d+)/);
  assert.ok(match, `expected a semver version or range, got ${value}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
};

const atLeast = (actual, expected) => {
  for (let i = 0; i < expected.length; i += 1) {
    if (actual[i] > expected[i]) return true;
    if (actual[i] < expected[i]) return false;
  }
  return true;
};

// The vendor spec update removes the Assistants/Conversations/Evals and
// audio-translation surfaces and changes the Assistant tool schemas. This
// repository only calls chat.completions.create and embeddings.create, so the
// call sites themselves stay valid; the direct dependency must move to the
// release that carries the updated schema.
test("openai is pinned to the release carrying the updated API schema", () => {
  const minimum = [7, 65, 0];

  for (const manifest of [
    path.join(repoRoot, "package.json"),
    path.join(backendDir, "package.json"),
  ]) {
    const pkg = readJson(manifest);
    const range = pkg.dependencies && pkg.dependencies.openai;
    assert.equal(typeof range, "string", `${manifest} must declare openai`);
    assert.ok(
      atLeast(parseVersion(range), minimum),
      `${manifest} declares openai ${range}, expected >= 7.65.0`,
    );
  }

  for (const lockfile of [
    path.join(repoRoot, "package-lock.json"),
    path.join(backendDir, "package-lock.json"),
  ]) {
    const lock = readJson(lockfile);
    const entry = lock.packages && lock.packages["node_modules/openai"];
    assert.ok(entry, `${lockfile} must lock openai`);
    assert.ok(
      atLeast(parseVersion(entry.version), minimum),
      `${lockfile} locks openai ${entry.version}, expected >= 7.65.0`,
    );
  }
});
