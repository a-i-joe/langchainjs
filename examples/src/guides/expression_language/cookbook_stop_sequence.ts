import { ChatOpenAI } from "@aijoelangchain/openai";
import { PromptTemplate } from "@aijoelangchain/core/prompts";

const prompt = PromptTemplate.fromTemplate(`Tell me a joke about {subject}`);

const model = new ChatOpenAI({});

const chain = prompt.pipe(model.withConfig({ stop: ["\n"] }));

const result = await chain.invoke({ subject: "bears" });

console.log(result);

/*
  AIMessage {
    contents: "Why don't bears use cell phones?"
  }
*/
