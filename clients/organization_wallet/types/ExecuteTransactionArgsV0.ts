import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ExecuteTransactionArgsV0Fields {
  choice: number
  transaction: number
}

export interface ExecuteTransactionArgsV0JSON {
  choice: number
  transaction: number
}

export class ExecuteTransactionArgsV0 {
  readonly choice: number
  readonly transaction: number

  constructor(fields: ExecuteTransactionArgsV0Fields) {
    this.choice = fields.choice
    this.transaction = fields.transaction
  }

  static layout(property?: string) {
    return borsh.struct(
      [borsh.u16("choice"), borsh.u16("transaction")],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new ExecuteTransactionArgsV0({
      choice: obj.choice,
      transaction: obj.transaction,
    })
  }

  static toEncodable(fields: ExecuteTransactionArgsV0Fields) {
    return {
      choice: fields.choice,
      transaction: fields.transaction,
    }
  }

  toJSON(): ExecuteTransactionArgsV0JSON {
    return {
      choice: this.choice,
      transaction: this.transaction,
    }
  }

  static fromJSON(obj: ExecuteTransactionArgsV0JSON): ExecuteTransactionArgsV0 {
    return new ExecuteTransactionArgsV0({
      choice: obj.choice,
      transaction: obj.transaction,
    })
  }

  toEncodable() {
    return ExecuteTransactionArgsV0.toEncodable(this)
  }
}
