import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface UpdateStateArgsV0Fields {
  newState: types.ProposalStateKind
}

export interface UpdateStateArgsV0JSON {
  newState: types.ProposalStateJSON
}

export class UpdateStateArgsV0 {
  readonly newState: types.ProposalStateKind

  constructor(fields: UpdateStateArgsV0Fields) {
    this.newState = fields.newState
  }

  static layout(property?: string) {
    return borsh.struct([types.ProposalState.layout("newState")], property)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new UpdateStateArgsV0({
      newState: types.ProposalState.fromDecoded(obj.newState),
    })
  }

  static toEncodable(fields: UpdateStateArgsV0Fields) {
    return {
      newState: fields.newState.toEncodable(),
    }
  }

  toJSON(): UpdateStateArgsV0JSON {
    return {
      newState: this.newState.toJSON(),
    }
  }

  static fromJSON(obj: UpdateStateArgsV0JSON): UpdateStateArgsV0 {
    return new UpdateStateArgsV0({
      newState: types.ProposalState.fromJSON(obj.newState),
    })
  }

  toEncodable() {
    return UpdateStateArgsV0.toEncodable(this)
  }
}
