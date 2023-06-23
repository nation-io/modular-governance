import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface InitializeProposalArgsV0Fields {
  /** Allow a custom seed for indexing */
  seed: Uint8Array
  name: string
  uri: string
  choices: Array<types.ChoiceFields>
  tags: Array<string>
}

export interface InitializeProposalArgsV0JSON {
  /** Allow a custom seed for indexing */
  seed: Array<number>
  name: string
  uri: string
  choices: Array<types.ChoiceJSON>
  tags: Array<string>
}

export class InitializeProposalArgsV0 {
  /** Allow a custom seed for indexing */
  readonly seed: Uint8Array
  readonly name: string
  readonly uri: string
  readonly choices: Array<types.Choice>
  readonly tags: Array<string>

  constructor(fields: InitializeProposalArgsV0Fields) {
    this.seed = fields.seed
    this.name = fields.name
    this.uri = fields.uri
    this.choices = fields.choices.map((item) => new types.Choice({ ...item }))
    this.tags = fields.tags
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.vecU8("seed"),
        borsh.str("name"),
        borsh.str("uri"),
        borsh.vec(types.Choice.layout(), "choices"),
        borsh.vec(borsh.str(), "tags"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new InitializeProposalArgsV0({
      seed: new Uint8Array(
        obj.seed.buffer,
        obj.seed.byteOffset,
        obj.seed.length
      ),
      name: obj.name,
      uri: obj.uri,
      choices: obj.choices.map(
        (
          item: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => types.Choice.fromDecoded(item)
      ),
      tags: obj.tags,
    })
  }

  static toEncodable(fields: InitializeProposalArgsV0Fields) {
    return {
      seed: Buffer.from(
        fields.seed.buffer,
        fields.seed.byteOffset,
        fields.seed.length
      ),
      name: fields.name,
      uri: fields.uri,
      choices: fields.choices.map((item) => types.Choice.toEncodable(item)),
      tags: fields.tags,
    }
  }

  toJSON(): InitializeProposalArgsV0JSON {
    return {
      seed: Array.from(this.seed.values()),
      name: this.name,
      uri: this.uri,
      choices: this.choices.map((item) => item.toJSON()),
      tags: this.tags,
    }
  }

  static fromJSON(obj: InitializeProposalArgsV0JSON): InitializeProposalArgsV0 {
    return new InitializeProposalArgsV0({
      seed: Uint8Array.from(obj.seed),
      name: obj.name,
      uri: obj.uri,
      choices: obj.choices.map((item) => types.Choice.fromJSON(item)),
      tags: obj.tags,
    })
  }

  toEncodable() {
    return InitializeProposalArgsV0.toEncodable(this)
  }
}
