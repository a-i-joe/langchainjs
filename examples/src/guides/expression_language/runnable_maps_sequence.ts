import { CohereEmbeddings } from "@langchain/cohere";
import { PromptTemplate } from "@aijoelangchain/core/prompts";
import { StringOutputParser } from "@aijoelangchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@aijoelangchain/core/runnables";
import { Document } from "@aijoelangchain/core/documents";
import { ChatAnthropic } from "@langchain/anthropic";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const model = new ChatAnthropic();
const vectorstore = await MemoryVectorStore.fromDocuments(
  [{ pageContent: "mitochondria is the powerhouse of the cell", metadata: {} }],
  new CohereEmbeddings({ model: "embed-english-v3.0" })
);
const retriever = vectorstore.asRetriever();
const template = `Answer the question based only on the following context:
{context}

Question: {question}`;

const prompt = PromptTemplate.fromTemplate(template);

const formatDocs = (docs: Document[]) => docs.map((doc) => doc.pageContent);

const retrievalChain = RunnableSequence.from([
  { context: retriever.pipe(formatDocs), question: new RunnablePassthrough() },
  prompt,
  model,
  new StringOutputParser(),
]);

const result = await retrievalChain.invoke(
  "what is the powerhouse of the cell?"
);
console.log(result);

/*
 Based on the given context, the powerhouse of the cell is mitochondria.
*/
