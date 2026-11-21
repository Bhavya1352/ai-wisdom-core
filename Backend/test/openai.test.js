const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const backendDir = path.resolve(__dirname, "..");

test("openai dependency uses the v7 generation with the updated API schema", () => {
  const pkg = require(path.join(backendDir, "package.json"));
  const range = pkg.dependencies && pkg.dependencies.openai;

  assert.equal(typeof range, "string", "Backend must declare an openai dependency");

  const major = Number(range.replace(/^[^\d]*/, "").split(".")[0]);
  assert.ok(
    major >= 7,
    `expected openai >=7 for the updated session error codes and response schema, found ${range}`,
  );
});

test("generateEmbedding keeps calling the embeddings endpoint with the expected model", async () => {
  const openaiEntry = require.resolve("openai", { paths: [backendDir] });
  const previousOpenAI = require.cache[openaiEntry];
  const aiUtilsPath = path.join(backendDir, "utils", "aiUtils.js");
  const previousAiUtils = require.cache[aiUtilsPath];
  const calls = [];

  class FakeOpenAI {
    constructor(options) {
      this.options = options;
      this.embeddings = {
        create: async (params) => {
          calls.push(params);
          return { data: [{ embedding: [0.25, 0.5] }] };
        },
      };
    }
  }

  require.cache[openaiEntry] = {
    id: openaiEntry,
    filename: openaiEntry,
    loaded: true,
    exports: FakeOpenAI,
  };
  delete require.cache[aiUtilsPath];

  try {
    const { generateEmbedding } = require(aiUtilsPath);
    const embedding = await generateEmbedding("synthetic text");

    assert.deepEqual(embedding, [0.25, 0.5]);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].model, "text-embedding-3-small");
    assert.equal(calls[0].input, "synthetic text");
  } finally {
    delete require.cache[aiUtilsPath];
    if (previousAiUtils) require.cache[aiUtilsPath] = previousAiUtils;
    if (previousOpenAI) require.cache[openaiEntry] = previousOpenAI;
    else delete require.cache[openaiEntry];
  }
});
