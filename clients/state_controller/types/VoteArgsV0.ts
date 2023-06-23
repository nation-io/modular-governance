import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface VoteArgsV0Fields {
  choice: number
  weight: BN
  /** This is a remove operation */
  removeVote: boolean
}

export interface VoteArgsV0JSON {
  choice: number
  weight: string
  /** This is a remove operation */
  removeVote: boolean
}

export class VoteArgsV0 {
  readonly choice: number
  readonly weight: BN
  /** This is a remove operation */
  readonly removeVote: boolean

  constructor(fields: VoteArgsV0Fields) {
    this.choice = fields.choice
    this.weight = fields.weight
    this.removeVote = fields.removeVote
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u16("choice"), borsh.u128("weight"), borsh.bool("removeVote")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new VoteArgsV0({
      choice: obj.choice,
      weight: obj.weight,
      removeVote: obj.removeVote,
    })
  }

  static toEncodable(fields: VoteArgsV0Fields) {
    return {
      choice: fields.choice,
      weight: fields.weight,
      removeVote: fields.removeVote,
    }
  }

  toJSON(): VoteArgsV0JSON {
    return {
      choice: this.choice,
      weight: this.weight.toString(),
      removeVote: this.removeVote,
    }
  }

  static fromJSON(obj: VoteArgsV0JSON): VoteArgsV0 {
    return new VoteArgsV0({
      choice: obj.choice,
      weight: new BN(obj.weight),
      removeVote: obj.removeVote,
    })
  }

  toEncodable() {
    return VoteArgsV0.toEncodable(this)
  }
}
