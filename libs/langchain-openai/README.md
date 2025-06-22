# @aijoelangchain/openai

## Unofficial! Use not recommended! Please see the official package at [https://www.npmjs.com/package/@langchain/openai](https://www.npmjs.com/package/@langchain/openai)

I published this in order to take advantage of [cached token and reasoning tokens](https://github.com/langchain-ai/langchainjs/discussions/8405) before they're in the official package.

This package contains the LangChain.js integrations for OpenAI through their SDK.

## Installation

```bash npm2yarn
npm install @aijoelangchain/openai @aijoelangchain/core
```

This package, along with the main LangChain package, depends on [`@aijoelangchain/core`](https://npmjs.com/package/@aijoelangchain/core/).
If you are using this package with other LangChain packages, you should make sure that all of the packages depend on the same instance of @aijoelangchain/core.
You can do so by adding appropriate fields to your project's `package.json` like this:

```json
{
  "name": "your-project",
  "version": "0.0.0",
  "dependencies": {
    "@aijoelangchain/core": "^0.3.0",
    "@aijoelangchain/openai": "^0.0.0"
  },
  "resolutions": {
    "@aijoelangchain/core": "^0.3.0"
  },
  "overrides": {
    "@aijoelangchain/core": "^0.3.0"
  },
  "pnpm": {
    "overrides": {
      "@aijoelangchain/core": "^0.3.0"
    }
  }
}
```

The field you need depends on the package manager you're using, but we recommend adding a field for the common `yarn`, `npm`, and `pnpm` to maximize compatibility.

## Chat Models

This package contains the `ChatOpenAI` class, which is the recommended way to interface with the OpenAI series of models.

To use, install the requirements, and configure your environment.

```bash
export OPENAI_API_KEY=your-api-key
```

Then initialize

```typescript
import { ChatOpenAI } from "@aijoelangchain/openai";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4-1106-preview",
});
const response = await model.invoke(new HumanMessage("Hello world!"));
```

### Streaming

```typescript
import { ChatOpenAI } from "@aijoelangchain/openai";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4-1106-preview",
});
const response = await model.stream(new HumanMessage("Hello world!"));
```

## Embeddings

This package also adds support for OpenAI's embeddings model.

```typescript
import { OpenAIEmbeddings } from "@aijoelangchain/openai";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
});
const res = await embeddings.embedQuery("Hello world");
```

## Development

To develop the OpenAI package, you'll need to follow these instructions:

### Install dependencies

```bash
yarn install
```

### Build the package

```bash
yarn build
```

Or from the repo root:

```bash
yarn build --filter=@aijoelangchain/openai
```

### Run tests

Test files should live within a `tests/` file in the `src/` folder. Unit tests should end in `.test.ts` and integration tests should
end in `.int.test.ts`:

```bash
$ yarn test
$ yarn test:int
```

### Lint & Format

Run the linter & formatter to ensure your code is up to standard:

```bash
yarn lint && yarn format
```

### Adding new entrypoints

If you add a new file to be exported, either import & re-export from `src/index.ts`, or add it to the `entrypoints` field in the `config` variable located inside `langchain.config.js` and run `yarn build` to generate the new entrypoint.
