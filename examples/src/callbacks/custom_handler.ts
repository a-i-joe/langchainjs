import { Serialized } from "@aijoelangchain/core/load/serializable";
import { BaseCallbackHandler } from "@aijoelangchain/core/callbacks/base";
import { AgentAction, AgentFinish } from "@aijoelangchain/core/agents";
import { ChainValues } from "@aijoelangchain/core/utils/types";

export class MyCallbackHandler extends BaseCallbackHandler {
  name = "MyCallbackHandler";

  async handleChainStart(chain: Serialized) {
    console.log(`Entering new ${chain.id} chain...`);
  }

  async handleChainEnd(_output: ChainValues) {
    console.log("Finished chain.");
  }

  async handleAgentAction(action: AgentAction) {
    console.log(action.log);
  }

  async handleToolEnd(output: string) {
    console.log(output);
  }

  async handleText(text: string) {
    console.log(text);
  }

  async handleAgentEnd(action: AgentFinish) {
    console.log(action.log);
  }
}
