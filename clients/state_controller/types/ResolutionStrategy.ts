import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ResolutionStrategyFields {
  nodes: Array<types.ResolutionNodeKind>
}

export interface ResolutionStrategyJSON {
  nodes: Array<types.ResolutionNodeJSON>
}

/**
 * Reverse polish notation calculator
 * https://en.wikipedia.org/wiki/Reverse_Polish_notation
 * Do this to have a flat structure since rust doesn't like unbounded nesting of types
 */
export class ResolutionStrategy {
  readonly nodes: Array<types.ResolutionNodeKind>

  constructor(fields: ResolutionStrategyFields) {
    this.nodes = fields.nodes
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.vec(types.ResolutionNode.layout(), "nodes")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ResolutionStrategy({
      nodes: obj.nodes.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.ResolutionNode.fromDecoded(item)
      ),
    })
  }

  static toEncodable(fields: ResolutionStrategyFields) {
    return {
      nodes: fields.nodes.map((item) => item.toEncodable()),
    }
  }

  toJSON(): ResolutionStrategyJSON {
    return {
      nodes: this.nodes.map((item) => item.toJSON()),
    }
  }

  static fromJSON(obj: ResolutionStrategyJSON): ResolutionStrategy {
    return new ResolutionStrategy({
      nodes: obj.nodes.map((item) => types.ResolutionNode.fromJSON(item)),
    })
  }

  toEncodable() {
    return ResolutionStrategy.toEncodable(this)
  }
}
