import { CallbackManagerForChainRun } from "@aijoelangchain/core/callbacks/manager";
import { BaseMemory } from "@aijoelangchain/core/memory";
import { ChainValues } from "@aijoelangchain/core/utils/types";

abstract class BaseChain {
  memory?: BaseMemory;

  /**
   * Run the core logic of this chain and return the output
   */
  abstract _call(
    values: ChainValues,
    runManager?: CallbackManagerForChainRun
  ): Promise<ChainValues>;

  /**
   * Return the string type key uniquely identifying this class of chain.
   */
  abstract _chainType(): string;

  /**
   * Return the list of input keys this chain expects to receive when called.
   */
  abstract get inputKeys(): string[];

  /**
   * Return the list of output keys this chain will produce when called.
   */
  abstract get outputKeys(): string[];
}
