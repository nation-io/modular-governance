import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface CompiledTransactionFields {
  accounts: Array<PublicKey>
  instructions: Array<types.CompiledInstructionFields>
  /**
   * Additional signer seeds. Should include bump. Useful for things like initializing a mint where
   * you cannot pass a keypair.
   * Note that these seeds will be prefixed with "custom", org_wallet.index
   * and the bump you pass and account should be consistent with this. But to save space
   * in the instruction, they should be ommitted here. See tests for examples
   */
  signerSeeds: Array<Array<Uint8Array>>
}

export interface CompiledTransactionJSON {
  accounts: Array<string>
  instructions: Array<types.CompiledInstructionJSON>
  /**
   * Additional signer seeds. Should include bump. Useful for things like initializing a mint where
   * you cannot pass a keypair.
   * Note that these seeds will be prefixed with "custom", org_wallet.index
   * and the bump you pass and account should be consistent with this. But to save space
   * in the instruction, they should be ommitted here. See tests for examples
   */
  signerSeeds: Array<Array<Array<number>>>
}

export class CompiledTransaction {
  readonly accounts: Array<PublicKey>
  readonly instructions: Array<types.CompiledInstruction>
  /**
   * Additional signer seeds. Should include bump. Useful for things like initializing a mint where
   * you cannot pass a keypair.
   * Note that these seeds will be prefixed with "custom", org_wallet.index
   * and the bump you pass and account should be consistent with this. But to save space
   * in the instruction, they should be ommitted here. See tests for examples
   */
  readonly signerSeeds: Array<Array<Uint8Array>>

  constructor(fields: CompiledTransactionFields) {
    this.accounts = fields.accounts
    this.instructions = fields.instructions.map(
      (item) => new types.CompiledInstruction({ ...item })
    )
    this.signerSeeds = fields.signerSeeds
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.vec(borsh.publicKey(), "accounts"),
        borsh.vec(types.CompiledInstruction.layout(), "instructions"),
        borsh.vec(borsh.vec(borsh.vecU8()), "signerSeeds"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new CompiledTransaction({
      accounts: obj.accounts,
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

  static toEncodable(fields: CompiledTransactionFields) {
    return {
      accounts: fields.accounts,
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

  toJSON(): CompiledTransactionJSON {
    return {
      accounts: this.accounts.map((item) => item.toString()),
      instructions: this.instructions.map((item) => item.toJSON()),
      signerSeeds: this.signerSeeds.map((item) =>
        item.map((item) => Array.from(item.values()))
      ),
    }
  }

  static fromJSON(obj: CompiledTransactionJSON): CompiledTransaction {
    return new CompiledTransaction({
      accounts: obj.accounts.map((item) => new PublicKey(item)),
      instructions: obj.instructions.map((item) =>
        types.CompiledInstruction.fromJSON(item)
      ),
      signerSeeds: obj.signerSeeds.map((item) =>
        item.map((item) => Uint8Array.from(item))
      ),
    })
  }

  toEncodable() {
    return CompiledTransaction.toEncodable(this)
  }
}
