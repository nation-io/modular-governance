import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@coral-xyz/borsh"

export interface InitializeOrganizationWalletArgsV0Fields {
  name: string
  authority: PublicKey
  proposalConfig: PublicKey
  index: number
}

export interface InitializeOrganizationWalletArgsV0JSON {
  name: string
  authority: string
  proposalConfig: string
  index: number
}

export class InitializeOrganizationWalletArgsV0 {
  readonly name: string
  readonly authority: PublicKey
  readonly proposalConfig: PublicKey
  readonly index: number

  constructor(fields: InitializeOrganizationWalletArgsV0Fields) {
    this.name = fields.name
    this.authority = fields.authority
    this.proposalConfig = fields.proposalConfig
    this.index = fields.index
  }

  static layout(property?: string) {
    return borsh.struct(
      [
        borsh.str("name"),
        borsh.publicKey("authority"),
        borsh.publicKey("proposalConfig"),
        borsh.u16("index"),
      ],
      property
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromDecoded(obj: any) {
    return new InitializeOrganizationWalletArgsV0({
      name: obj.name,
      authority: obj.authority,
      proposalConfig: obj.proposalConfig,
      index: obj.index,
    })
  }

  static toEncodable(fields: InitializeOrganizationWalletArgsV0Fields) {
    return {
      name: fields.name,
      authority: fields.authority,
      proposalConfig: fields.proposalConfig,
      index: fields.index,
    }
  }

  toJSON(): InitializeOrganizationWalletArgsV0JSON {
    return {
      name: this.name,
      authority: this.authority.toString(),
      proposalConfig: this.proposalConfig.toString(),
      index: this.index,
    }
  }

  static fromJSON(
    obj: InitializeOrganizationWalletArgsV0JSON
  ): InitializeOrganizationWalletArgsV0 {
    return new InitializeOrganizationWalletArgsV0({
      name: obj.name,
      authority: new PublicKey(obj.authority),
      proposalConfig: new PublicKey(obj.proposalConfig),
      index: obj.index,
    })
  }

  toEncodable() {
    return InitializeOrganizationWalletArgsV0.toEncodable(this)
  }
}
