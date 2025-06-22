import { ChatOpenAI } from "@aijoelangchain/openai";
import { PromptTemplate } from "@aijoelangchain/core/prompts";
import { RunnableSequence } from "@aijoelangchain/core/runnables";

const model = new ChatOpenAI({});
const promptTemplate = PromptTemplate.fromTemplate(
  "Tell me a joke about {topic}"
);

// You can also create a chain using an array of runnables
const chain = RunnableSequence.from([promptTemplate, model]);

const result = await chain.invoke({ topic: "bears" });

console.log(result);
/*
  AIMessage {
    content: "Why don't bears wear shoes?\n\nBecause they have bear feet!",
  }
*/
