import { ToolDefinition } from "@aijoelangchain/core/language_models/base";
import type { StructuredToolInterface } from "@aijoelangchain/core/tools";
import {
  convertToOpenAIFunction,
  convertToOpenAITool,
} from "@aijoelangchain/core/utils/function_calling";
import { isInteropZodSchema } from "@aijoelangchain/core/utils/types";
import { toJsonSchema } from "@aijoelangchain/core/utils/json_schema";

export {
  convertToOpenAIFunction as formatToOpenAIFunction,
  convertToOpenAITool as formatToOpenAITool,
};

export function formatToOpenAIAssistantTool(
  tool: StructuredToolInterface
): ToolDefinition {
  return {
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: isInteropZodSchema(tool.schema)
        ? toJsonSchema(tool.schema)
        : tool.schema,
    },
  };
}
