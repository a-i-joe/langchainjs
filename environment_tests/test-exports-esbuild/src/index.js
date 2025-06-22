import assert from "assert";
import { OpenAI } from "@aijoelangchain/openai";
import { LLMChain } from "langchain/chains";
import { ChatPromptTemplate } from "@aijoelangchain/core/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@aijoelangchain/openai";
import { Document } from "@aijoelangchain/core/documents";
import { CallbackManager } from "@aijoelangchain/core/callbacks/manager";

// Test exports
assert(typeof OpenAI === "function");
assert(typeof LLMChain === "function");
assert(typeof ChatPromptTemplate === "function");
assert(typeof MemoryVectorStore === "function");
assert(typeof OpenAIEmbeddings === "function");
assert(typeof CallbackManager === "function");

const vs = new MemoryVectorStore(
  new OpenAIEmbeddings({ openAIApiKey: "sk-XXXX" })
);

await vs.addVectors(
  [
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    new Document({
      pageContent: "a",
    }),
    new Document({
      pageContent: "b",
    }),
  ]
);

assert((await vs.similaritySearchVectorWithScore([0, 0, 1], 1)).length === 1);
