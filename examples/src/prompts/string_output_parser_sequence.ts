import { ChatOpenAI } from "@aijoelangchain/openai";
import { StringOutputParser } from "@aijoelangchain/core/output_parsers";
import { RunnableSequence } from "@aijoelangchain/core/runnables";

const chain = RunnableSequence.from([
  new ChatOpenAI({ temperature: 0 }),
  new StringOutputParser(),
]);

const stream = await chain.stream("Hello there!");

for await (const chunk of stream) {
  console.log(chunk);
}
