import { ChatOpenAI } from "@aijoelangchain/openai";
import { PromptTemplate } from "@aijoelangchain/core/prompts";
import { RunnableSequence } from "@aijoelangchain/core/runnables";
import { StringOutputParser } from "@aijoelangchain/core/output_parsers";

const model = new ChatOpenAI({});
const promptTemplate = PromptTemplate.fromTemplate(
  "Tell me a joke about {topic}"
);
const outputParser = new StringOutputParser();

const chain = RunnableSequence.from([promptTemplate, model, outputParser]);

const result = await chain.invoke({ topic: "bears" });

console.log(result);

/*
  "Why don't bears wear shoes?\n\nBecause they have bear feet!"
*/
