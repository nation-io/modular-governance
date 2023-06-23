import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CompiledInstructionFields {
  /** Index into the transaction keys array indicating the program account that executes this instruction. */
  programIdIndex: number
  /** Ordered indices into the transaction keys array indicating which accounts to pass to the program. */
  accounts: Uint8Array
  /** The program input data. */
  data: Uint8Array
}

export interface CompiledInstructionJSON {
  /** Index into the transaction keys array indicating the program account that executes this instruction. */
  programIdIndex: number
  /** Ordered indices into the transaction keys array indicating which accounts to pass to the program. */
  accounts: Array<number>
  /** The program input data. */
  data: Array<number>
}

export class CompiledInstruction {
  /** Index into the transaction keys array indicating the program account that executes this instruction. */
  readonly programIdIndex: number
  /** Ordered indices into the transaction keys array indicating which accounts to pass to the program. */
  readonly accounts: Uint8Array
  /** The program input data. */
  readonly data: Uint8Array

  constructor(fields: CompiledInstructionFields) {
    this.programIdIndex = fields.programIdIndex
    this.accounts = fields.accounts
    this.data = fields.data
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u8("programIdIndex"),
        borsh.vecU8("accounts"),
        borsh.vecU8("data"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CompiledInstruction({
      programIdIndex: obj.programIdIndex,
      accounts: new Uint8Array(
        obj.accounts.buffer,
        obj.accounts.byteOffset,
        obj.accounts.length
      ),
      data: new Uint8Array(
        obj.data.buffer,
        obj.data.byteOffset,
        obj.data.length
      ),
    })
  }

  static toEncodable(fields: CompiledInstructionFields) {
    return {
      programIdIndex: fields.programIdIndex,
      accounts: Buffer.from(
        fields.accounts.buffer,
        fields.accounts.byteOffset,
        fields.accounts.length
      ),
      data: Buffer.from(
        fields.data.buffer,
        fields.data.byteOffset,
        fields.data.length
      ),
    }
  }

  toJSON(): CompiledInstructionJSON {
    return {
      programIdIndex: this.programIdIndex,
      accounts: Array.from(this.accounts.values()),
      data: Array.from(this.data.values()),
    }
  }

  static fromJSON(obj: CompiledInstructionJSON): CompiledInstruction {
    return new CompiledInstruction({
      programIdIndex: obj.programIdIndex,
      accounts: Uint8Array.from(obj.accounts),
      data: Uint8Array.from(obj.data),
    })
  }

  toEncodable() {
    return CompiledInstruction.toEncodable(this)
  }
}
