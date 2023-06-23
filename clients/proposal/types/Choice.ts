import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface ChoiceFields {
  /** Total vote weight behind this choice. u128 to support u64 tokens multiplied by a large multiplier (as in helium) */
  weight: BN
  name: string
  /** Any other data that you may want to put in here */
  uri: string | null
}

export interface ChoiceJSON {
  /** Total vote weight behind this choice. u128 to support u64 tokens multiplied by a large multiplier (as in helium) */
  weight: string
  name: string
  /** Any other data that you may want to put in here */
  uri: string | null
}

export class Choice {
  /** Total vote weight behind this choice. u128 to support u64 tokens multiplied by a large multiplier (as in helium) */
  readonly weight: BN
  readonly name: string
  /** Any other data that you may want to put in here */
  readonly uri: string | null

  constructor(fields: ChoiceFields) {
    this.weight = fields.weight
    this.name = fields.name
    this.uri = fields.uri
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.u128("weight"),
        borsh.str("name"),
        borsh.option(borsh.str(), "uri"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new Choice({
      weight: obj.weight,
      name: obj.name,
      uri: obj.uri,
    })
  }

  static toEncodable(fields: ChoiceFields) {
    return {
      weight: fields.weight,
      name: fields.name,
      uri: fields.uri,
    }
  }

  toJSON(): ChoiceJSON {
    return {
      weight: this.weight.toString(),
      name: this.name,
      uri: this.uri,
    }
  }

  static fromJSON(obj: ChoiceJSON): Choice {
    return new Choice({
      weight: new BN(obj.weight),
      name: obj.name,
      uri: obj.uri,
    })
  }

  toEncodable() {
    return Choice.toEncodable(this)
  }
}
