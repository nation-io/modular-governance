import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface SetTransactionsArgsV0Fields {
  choiceIndex: BN
  transactionIndex: BN
  /**
   * Accounts will come from remaining accounts, which allows for lookup tables
   * and such to reduce size of txn call here
   */
  instructions: Array<types.CompiledInstructionFields>
  signerSeeds: Array<Array<Uint8Array>>
}

export interface SetTransactionsArgsV0JSON {
  choiceIndex: string
  transactionIndex: string
  /**
   * Accounts will come from remaining accounts, which allows for lookup tables
   * and such to reduce size of txn call here
   */
  instructions: Array<types.CompiledInstructionJSON>
  signerSeeds: Array<Array<Array<number>>>
}

export class SetTransactionsArgsV0 {
  readonly choiceIndex: BN
  readonly transactionIndex: BN
  /**
   * Accounts will come from remaining accounts, which allows for lookup tables
   * and such to reduce size of txn call here
   */
  readonly instructions: Array<types.CompiledInstruction>
  readonly signerSeeds: Array<Array<Uint8Array>>

  constructor(fields: SetTransactionsArgsV0Fields) {
    this.choiceIndex = fields.choiceIndex
    this.transactionIndex = fields.transactionIndex
    this.instructions = fields.instructions.map(
      (item) => new types.CompiledInstruction({ ...item })
    )
    this.signerSeeds = fields.signerSeeds
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u64("choiceIndex"),
        borsh.u64("transactionIndex"),
        borsh.vec(types.CompiledInstruction.layout(), "instructions"),
        borsh.vec(borsh.vec(borsh.vecU8()), "signerSeeds"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new SetTransactionsArgsV0({
      choiceIndex: obj.choiceIndex,
      transactionIndex: obj.transactionIndex,
      instructions: obj.instructions.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.CompiledInstruction.fromDecoded(item)
      ),
      signerSeeds: obj.signerSeeds.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) =>
          item.map(
            (
              item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
            ) => new Uint8Array(item.buffer, item.byteOffset, item.length)
          )
      ),
    })
  }

  static toEncodable(fields: SetTransactionsArgsV0Fields) {
    return {
      choiceIndex: fields.choiceIndex,
      transactionIndex: fields.transactionIndex,
      instructions: fields.instructions.map((item) =>
        types.CompiledInstruction.toEncodable(item)
      ),
      signerSeeds: fields.signerSeeds.map((item) =>
        item.map((item) =>
          Buffer.from(item.buffer, item.byteOffset, item.length)
        )
      ),
    }
  }

  toJSON(): SetTransactionsArgsV0JSON {
    return {
      choiceIndex: this.choiceIndex.toString(),
      transactionIndex: this.transactionIndex.toString(),
      instructions: this.instructions.map((item) => item.toJSON()),
      signerSeeds: this.signerSeeds.map((item) =>
        item.map((item) => Array.from(item.values()))
      ),
    }
  }

  static fromJSON(obj: SetTransactionsArgsV0JSON): SetTransactionsArgsV0 {
    return new SetTransactionsArgsV0({
      choiceIndex: new BN(obj.choiceIndex),
      transactionIndex: new BN(obj.transactionIndex),
      instructions: obj.instructions.map((item) =>
        types.CompiledInstruction.fromJSON(item)
      ),
      signerSeeds: obj.signerSeeds.map((item) =>
        item.map((item) => Uint8Array.from(item))
      ),
    })
  }

  toEncodable() {
    return SetTransactionsArgsV0.toEncodable(this)
  }
}
