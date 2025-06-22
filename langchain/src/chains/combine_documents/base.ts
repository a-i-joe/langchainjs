import { Document } from "@aijoelangchain/core/documents";
import {
  BasePromptTemplate,
  PromptTemplate,
} from "@aijoelangchain/core/prompts";
import { RunnableConfig } from "@aijoelangchain/core/runnables";

export const DEFAULT_DOCUMENT_SEPARATOR = "\n\n";

export const DOCUMENTS_KEY = "context";
export const INTERMEDIATE_STEPS_KEY = "intermediate_steps";

export const DEFAULT_DOCUMENT_PROMPT =
  /* #__PURE__ */ PromptTemplate.fromTemplate("{page_content}");

export async function formatDocuments({
  documentPrompt,
  documentSeparator,
  documents,
  config,
}: {
  documentPrompt: BasePromptTemplate;
  documentSeparator: string;
  documents: Document[];
  config?: RunnableConfig;
}) {
  if (documents == null || documents.length === 0) {
    return "";
  }
  const formattedDocs = await Promise.all(
    documents.map((document) =>
      documentPrompt
        .withConfig({ runName: "document_formatter" })
        .invoke(
          { ...document.metadata, page_content: document.pageContent },
          config
        )
    )
  );
  return formattedDocs.join(documentSeparator);
}
